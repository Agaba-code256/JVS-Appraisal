import React from "react";
import logo from "../images/Logo.png"; // Make sure this path is correct

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto max-w-sm p-6 bg-white shadow-md rounded-lg">
        <div className="space-y-1 text-center">
          <img src={logo} alt="Logo" className="mx-auto h-12 w-24" />
          <p className="text-sm text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="m@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-48 h-48 bg-green-200 rounded-full opacity-20 transform translate-x-20 translate-y-20"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-300 rounded-full opacity-20 transform translate-x-24 translate-y-24"></div>
      <div className="absolute top-20 left-20 w-40 h-40 bg-green-100 rounded-full opacity-20 transform translate-x-28 translate-y-28"></div>

      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-200 rounded-full opacity-20 transform -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-300 rounded-full opacity-20 transform -translate-x-24 -translate-y-24"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-100 rounded-full opacity-20 transform -translate-x-28 -translate-y-28"></div>
    </div>
  );
}
