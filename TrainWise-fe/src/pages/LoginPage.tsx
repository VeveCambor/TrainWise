import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const profile = useSelector((state: RootState) => state.profile.profile);

  useEffect(() => {
    if (isAuthenticated) {
      if (!profile) {
        navigate('/profile');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, profile, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-trainwise-coral mb-6 text-center">Přihlášení</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Uživatelské jméno
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-trainwise-coral focus:outline-none focus:ring-1 focus:ring-trainwise-coral"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Heslo
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-trainwise-coral focus:outline-none focus:ring-1 focus:ring-trainwise-coral"
          />
        </div>
        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="rounded-md bg-trainwise-coral px-6 py-2 text-white font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Přihlašuji...' : 'Přihlásit se'}
          </button>
        </div>
      </form>
    </div>
  );
} 