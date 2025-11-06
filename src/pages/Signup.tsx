import React, { useState, ChangeEvent } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const SignupPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");

  // Optional handlers (just for UI typing)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white shadow-md rounded-2xl p-8 w-[90%] max-w-md">
        {/* Welcome Text */}
        <h1 className="text-3xl font-bold text-center text-blue-600">Welcome</h1>
        <p className="text-center text-gray-500 mb-6">
          Create your account to get started
        </p>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 font-medium rounded-lg transition-all ${
              activeTab === "signup"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 font-medium rounded-lg transition-all ${
              activeTab === "login"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Login
          </button>
        </div>

        {/* Form Fields */}
        {activeTab === "signup" ? (
          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-gray-600 block mb-1">Email</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <AiOutlineMail className="text-gray-400 text-xl mr-2" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-600 block mb-1">Create Password</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <AiOutlineLock className="text-gray-400 text-xl mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-gray-600 block mb-1">Confirm Password</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <AiOutlineLock className="text-gray-400 text-xl mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
            >
              Sign Up
            </button>
          </form>
        ) : (
          // Login Form
          <form className="space-y-4">
            <div>
              <label className="text-gray-600 block mb-1">Email</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <AiOutlineMail className="text-gray-400 text-xl mr-2" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Password</label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <AiOutlineLock className="text-gray-400 text-xl mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
            >
              Login
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-50 transition">
          <FcGoogle className="text-2xl mr-2" />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
