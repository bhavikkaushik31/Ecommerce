import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Welcome to the Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your e-commerce data below:</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Manage Products
          </Link>
          <Link
            to="/categories"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Manage Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
