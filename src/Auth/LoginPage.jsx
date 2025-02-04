import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import { Mail, Lock, ArrowRight } from "lucide-react";
import ThreeBodyLoader from "../components/ThreeBodyLoader.jsx";
import AuthBackground from "./components/AuthBackground.jsx";
import AuthFormContainer from "./components/AuthFormContainer.jsx";
import FancyAppName from "./components/FancyAppName.jsx";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message) {
      setMessage("");
      setIsError(false);
    }
  };

    const displayMessage = (msg, duration = 3000) => {
      setMessage(msg);
      setTimeout(() => setMessage(""), duration);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/auth/login", formData);
      if (response.data.success) {
        const { token, data } = response.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(data));
        
        displayMessage("Login successful!");
        setIsError(false);
        setTimeout(() => navigate("/"), 500);
      } else {
        displayMessage("Login failed. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsError(true);
      if (error.response) {
        displayMessage(error.response.data.message || "Invalid credentials!");
      } else if (error.request) {
        displayMessage("No response from server. Please try again later.");
      } else {
        displayMessage("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthBackground>
      <AuthFormContainer showForm={true}>

        <FancyAppName />

        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Welcome Back
        </h1>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              isError
                ? "bg-red-500/20 text-red-100"
                : "bg-green-500/20 text-green-100"
            }`}
          > 
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 h-5 w-5" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/60"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 h-5 w-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/60"
              required
            />
          </div>

          <div className="flex justify-between text-sm">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-white/80 hover:text-white hover:underline transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white/20 hover:bg-white/40 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <ThreeBodyLoader size={24} color="#ffffff" speed={0.8} />
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-white/80">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-white font-semibold hover:text-white/90 hover:underline transition-colors"
          >
            Sign up
          </button>
        </p>
      </AuthFormContainer>
    </AuthBackground>
  );
};

export default LoginPage;
