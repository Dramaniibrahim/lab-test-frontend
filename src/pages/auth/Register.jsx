import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Lock, Check } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'DOCTOR',
  });
  const [localError, setLocalError] = useState(null); // Local error state for immediate feedback
  const { register, error: authError, loading } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLocalError(null); // Clear previous errors
    try {
      // Basic password validation (per API: min 8 chars, uppercase, lowercase, number, special char)
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
        throw new Error('Password must be at least 8 characters, with uppercase, lowercase, number, and special character.');
      }
      console.log('Submitting registration:', formData); // Debug log
      await register(formData.name, formData.email, formData.password, formData.role);
      console.log('Registration successful, navigating to /patients'); // Debug log
      navigate('/patients');
    } catch (err) {
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setLocalError(errorMessage);
      console.error('Registration error:', err); // Debug log
    }
  };

  return (
    <div className="bg-white w-full h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Panel - Register Form */}
      <div className="p-12 flex flex-col justify-center">
        {/* Logo */}
        <div className="flex items-center mb-12">
          <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center mr-3 transform -skew-x-12">
            <div className="w-3 h-3 bg-white rounded-sm transform skew-x-12"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">LIMS</h1>
        </div>

        {/* Welcome Text */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-500">Please enter your details to register</p>
        </div>

        {/* Error Message */}
        {(authError || localError) && (
          <div className="mb-4 text-red-600">{authError || localError}</div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister}>
          {/* Name Input */}
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-2">Name</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User size={20} />
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
              {formData.name && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
                  <Check size={20} />
                </div>
              )}
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-2">Email</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
              {formData.email && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
                  <Check size={20} />
                </div>
              )}
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-2">Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              {formData.password && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
                  <Check size={20} />
                </div>
              )}
            </div>
          </div>

          {/* Role Input */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="DOCTOR">Doctor</option>
              <option value="NURSE">Nurse</option>
              <option value="LAB_STAFF">Lab Staff</option>
              <option value="SENIOR_LAB_STAFF">Senior Lab Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-6 disabled:bg-blue-300"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>

      {/* Right Panel - 3D Illustration */}
      <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute top-20 right-16 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-12 w-1 h-1 bg-white rounded-full"></div>
        </div>
        <div className="relative">
          <div className="absolute -bottom-8 left-4 w-64 h-8 bg-blue-400 rounded-full blur-sm opacity-30"></div>
          <div className="w-72 h-72 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl shadow-2xl relative transform perspective-1000 rotate-y-15">
            <div className="absolute inset-4 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl">
              <div className="absolute inset-6 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl shadow-inner">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-500 rounded-full shadow-lg relative">
                    <div className="absolute inset-2 bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 rounded-full">
                      <div className="absolute inset-3 bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white rounded-full relative">
                          <div className="absolute top-0 left-1/2 w-px h-2 bg-white transform -translate-x-1/2 -translate-y-1"></div>
                          <div className="absolute bottom-0 left-1/2 w-px h-2 bg-white transform -translate-x-1/2 translate-y-1"></div>
                          <div className="absolute left-0 top-1/2 w-2 h-px bg-white transform -translate-x-1 -translate-y-1/2"></div>
                          <div className="absolute right-0 top-1/2 w-2 h-px bg-white transform translate-x-1 -translate-y-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full shadow-md"></div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-blue-300 to-transparent rounded-r-3xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-blue-700 to-transparent rounded-b-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}