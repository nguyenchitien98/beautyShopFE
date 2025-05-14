// src/pages/Register.tsx
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng Ký</h2>
        <div className="mb-4">
          <label className="block mb-1">Họ tên</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block mb-1">Địa chỉ</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Số điện thoại</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
        >
          Đăng Ký
        </button>
        <p className="text-center text-sm mt-4">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
