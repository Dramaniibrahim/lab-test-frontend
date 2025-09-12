import { createContext, useState, useCallback, useEffect, useContext } from 'react';
import axios from '../services/api/axios';
import { LOGIN_URL, REGISTER_URL, LOGOUT_URL, VERIFY_TOKEN_URL } from '../services/api/routes';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    refreshToken: null,
    role: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Calling API:', LOGIN_URL, { email, password });
      const response = await axios.post(LOGIN_URL, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log('Login API response:', response.data);

      // Handle API response with nested tokens
      const { data } = response;
      let accessToken, refreshToken, user;
      if (data.data && data.data.tokens) {
        // Structure: { success: true, data: { tokens: { accessToken, refreshToken }, user } }
        ({ accessToken, refreshToken } = data.data.tokens);
        ({ user } = data.data);
      } else if (data.tokens) {
        // Structure: { success: true, tokens: { accessToken, refreshToken }, user }
        ({ accessToken, refreshToken } = data.tokens);
        ({ user } = data);
      } else {
        throw new Error('Invalid API response structure');
      }

      if (!accessToken || !user) {
        throw new Error('Invalid API response: missing accessToken or user');
      }

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken || '');
      localStorage.setItem('role', user.role || '');

      const newAuthState = {
        user,
        token: accessToken,
        refreshToken: refreshToken || null,
        role: user.role || null,
      };
      setAuth(newAuthState);
      console.log('Updated auth state:', newAuthState);
      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      console.error('Login API error:', err.response || err);
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
      console.log('Calling API:', REGISTER_URL, { name, email, password, role });
      const response = await axios.post(REGISTER_URL, { name, email, password, role }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log('Register API response:', response.data);

      // Handle API response with nested tokens
      const { data } = response;
      let accessToken, refreshToken, user;
      if (data.data && data.data.tokens) {
        ({ accessToken, refreshToken } = data.data.tokens);
        ({ user } = data.data);
      } else if (data.tokens) {
        ({ accessToken, refreshToken } = data.tokens);
        ({ user } = data);
      } else {
        throw new Error('Invalid API response structure');
      }

      if (!accessToken || !user) {
        throw new Error('Invalid API response: missing accessToken or user');
      }

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken || '');
      localStorage.setItem('role', user.role || '');

      const newAuthState = {
        user,
        token: accessToken,
        refreshToken: refreshToken || null,
        role: user.role || null,
      };
      setAuth(newAuthState);
      console.log('Updated auth state:', newAuthState);
      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      console.error('Register API error:', err.response || err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Calling API:', LOGOUT_URL);
      await axios.post(LOGOUT_URL, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      console.log('Logout successful');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      setAuth({ user: null, token: null, refreshToken: null, role: null });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Logout failed';
      console.error('Logout API error:', err.response || err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [auth.token]);

  const verifyToken = useCallback(async () => {
    try {
      console.log('Calling API:', VERIFY_TOKEN_URL);
      const response = await axios.get(VERIFY_TOKEN_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        withCredentials: true,
      });
      console.log('Verify token response:', response.data);
      const { user } = response.data.data || response.data;
      setAuth((prev) => ({
        ...prev,
        user,
        token: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        role: user.role,
      }));
    } catch (err) {
      console.error('Verify token error:', err.response || err);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      setAuth({ user: null, token: null, refreshToken: null, role: null });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      verifyToken();
    }
  }, [verifyToken]);

  return (
    <AuthContext.Provider value={{ auth, login, register, logout, verifyToken, error, loading, setError, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};