import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthForm = ({ mode = 'signup' }) => {
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState(mode); // local toggle
  const isSignup = currentMode === 'signup';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/signin';
      const { data } = await axios.post(endpoint, formData);
      if (!isSignup) localStorage.setItem('token', data.token);
      setSuccess(isSignup ? 'Account created successfully!' : 'Logged in successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-500 px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login Form</h2>

        {/* Tabs */}
        <div className="flex justify-between mb-6 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setCurrentMode('signin')}
            className={`w-1/2 py-2 rounded-full transition ${
              !isSignup ? 'bg-blue-600 text-white font-semibold' : 'text-gray-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setCurrentMode('signup')}
            className={`w-1/2 py-2 rounded-full transition ${
              isSignup ? 'bg-blue-600 text-white font-semibold' : 'text-gray-600'
            }`}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

      

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-full font-semibold hover:from-blue-700 hover:to-blue-600 transition"
          >
            {loading ? 'Please wait...' : isSignup ? 'Signup' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {isSignup ? 'Already a member?' : 'Not a member?'}{' '}
          <button
            onClick={() => setCurrentMode(isSignup ? 'signin' : 'signup')}
            className="text-blue-500 hover:underline font-medium"
          >
            {isSignup ? 'Login now' : 'Signup now'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
