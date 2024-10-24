'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Create a function to get the environment variable
const getAdminKey = () => {
  if (typeof process !== 'undefined') {
    return process.env.NEXT_PUBLIC_MY_KEY; // Use NEXT_PUBLIC prefix to expose the variable to the browser
  }
  return '';
};

const AdminPage = () => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const router = useRouter();
  const adminKey = getAdminKey(); // Get the admin key from the environment variable

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === adminKey) {
      localStorage.setItem('adminKey', key); // Store the key in localStorage
      router.push('/admin/dashboard'); // Redirect to the dashboard
    } else {
      setError('Invalid key. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">Admin Login</h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="key">
              Enter Key
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                id="key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full text-blue-500 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? '👁️' : '👁️‍🗨️'} {/* Eye icon to show/hide password */}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
