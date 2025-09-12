import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import axios from '../services/api/axios';
import { LOGIN_URL, REGISTER_URL, REFRESH_TOKEN_URL, LOGOUT_URL, LOGOUT_ALL_URL, VERIFY_TOKEN_URL } from '../services/api/routes';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    role: localStorage.getItem('role') || null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(LOGIN_URL, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const { data } = response.data;
      const { accessToken, refreshToken, user } = data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('role', user.role);

      setAuth({
        user,
        token: accessToken,
        refreshToken,
        role: user.role,
      });
      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password, role) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(REGISTER_URL, { name, email, password, role }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const { data } = response.data;
      const { accessToken, refreshToken, user } = data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('role', user.role);

      setAuth({
        user,
        token: accessToken,
        refreshToken,
        role: user.role,
      });
      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await axios.post(LOGOUT_URL, {}, {
        headers: { Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      setAuth({ user: null, token: null, refreshToken: null, role: null });
      setLoading(false);
    }
  }, [auth.token]);

  const logoutAll = useCallback(async () => {
    setLoading(true);
    try {
      await axios.post(LOGOUT_ALL_URL, {}, {
        headers: { Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
    } catch (err) {
      console.error('Logout all error:', err);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      setAuth({ user: null, token: null, refreshToken: null, role: null });
      setLoading(false);
    }
  }, [auth.token]);

  const verifyToken = useCallback(async () => {
    try {
      const response = await axios.post(VERIFY_TOKEN_URL, {}, {
        headers: { Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Token verification failed');
      throw err;
    }
  }, [auth.token]);

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post(REFRESH_TOKEN_URL, {}, {
        headers: { Authorization: `Bearer ${auth.refreshToken}` },
        withCredentials: true,
      });
      const { data } = response.data;
      const { accessToken, refreshToken: newRefreshToken } = data;

      localStorage.setItem('accessToken', accessToken);
      if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

      setAuth((prev) => ({
        ...prev,
        token: accessToken,
        refreshToken: newRefreshToken || prev.refreshToken,
      }));
      return accessToken;
    } catch (err) {
      logout();
      throw new Error('Session expired. Please log in again.');
    }
  }, [auth.refreshToken, logout]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const newAccessToken = await refreshToken();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ auth, login, register, logout, logoutAll, verifyToken, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);