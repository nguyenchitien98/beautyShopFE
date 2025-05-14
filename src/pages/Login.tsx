// src/pages/Login.tsx
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng Nhập</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mật khẩu</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
        >
          Đăng Nhập
        </button>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Quên mật khẩu?
          </Link>
          <Link to="/register" className="text-primary hover:underline">
            Đăng ký
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;