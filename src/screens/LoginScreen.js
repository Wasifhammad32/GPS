import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Replace with the URL of your backend login endpoint
      const apiUrl = "http://192.168.10.6:4000/login"; // Change the URL accordingly

      const response = await axios.post(apiUrl, {
        email,
        password,
      });

      if (response.status >= 200 && response.status < 300) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        console.log("Navigating to /google");
        navigate("/google");
      } else {
        // Handle login failure
        console.error(
          "Login failed:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-3">
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Welcome Back to Interview Buddy
          </h2>
          <p className="mt-2 text-center text-2xl font-medium text-gray-900">
            Sign in here
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler} method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-full relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-full relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className=" px-4">
            <div className="text-sm">
              <a href="/">
                <h1 className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot Password?
                </h1>
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center px-5 py-3 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className=" mt-2 ">
            <div className="flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>

          {/* <div className="mt-6">
            <button
              type="button"
              className="w-full flex justify-center items-center gap-x-2 px-5 py-3 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Login with Google</span>
              <p className="text-red-500">Login with Google</p>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
