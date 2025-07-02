import React from 'react';
import { X } from 'lucide-react';

const AuthModal = ({ type = 'login', onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-md p-6 rounded-xl bg-white/20 dark:bg-gray-900/40 backdrop-blur-md shadow-xl border border-white/30 dark:border-gray-700 text-white">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-300">
          <X />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <form className="space-y-4">
          {type === 'register' && (
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-white/30 dark:bg-gray-800/30 p-2 rounded placeholder:text-white/80 text-white"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/30 dark:bg-gray-800/30 p-2 rounded placeholder:text-white/80 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/30 dark:bg-gray-800/30 p-2 rounded placeholder:text-white/80 text-white"
          />
          <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded text-white font-semibold hover:opacity-90 transition">
            {type === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
