import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(email, password);
      dispatch(login(data.user));
      navigate({ to: '/dashboard' });
      setLoading(false);
      console.log('signin success');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="bg-white/90 backdrop-blur shadow-xl rounded-2xl px-8 py-8 mb-6 border border-slate-100">
        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Login
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Welcome back! Sign in to manage your short links.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            <span className="mt-[2px] text-base">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
            id="password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <div className="flex items-center justify-between">
          <button
            className={`w-full inline-flex justify-center items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition 
              hover:bg-blue-700 hover:shadow-blue-500/40 
              focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1
              ${loading ? 'opacity-60 cursor-not-allowed hover:bg-blue-600 hover:shadow-blue-500/30' : ''}`}
            type="button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        {/* Switch to register */}
        <div className="text-center mt-5 text-sm">
          <p className="text-slate-500">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => state(false)}
              className="font-semibold text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;


