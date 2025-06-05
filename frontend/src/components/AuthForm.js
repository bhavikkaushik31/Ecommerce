import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthForm = ({ mode = 'signup' }) => {
  const navigate = useNavigate();
  const isSignup = mode === 'signup';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/signin';
      const { data } = await axios.post(endpoint, formData);
      if (!isSignup) {
        localStorage.setItem('token', data.token);
      }
      setSuccess(isSignup ? 'Account created successfully!' : 'Logged in successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.response?.data?.error || err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {isSignup ? 'Create an Account' : 'Sign In to Your Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <div className="text-green-600 text-sm text-center">
              <p>{success}</p>
              {!isSignup && (
                <div className="mt-3 text-blue-600 text-sm">
                  <a href="/products" className="underline mr-4">Manage Products</a>
                  <a href="/categories" className="underline">Manage Categories</a>
                </div>
              )}
            </div>
          )}
          <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <a href={isSignup ? '/signin' : '/signup'} className="text-blue-600 hover:underline">
            {isSignup ? 'Sign in' : 'Sign up'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
