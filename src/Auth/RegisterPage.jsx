import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import { User, Mail, Lock, CheckCircle, ArrowRight } from "lucide-react";
import ThreeBodyLoader from "../components/ThreeBodyLoader.jsx";
import AuthBackground from "./components/AuthBackground.jsx";
import AuthFormContainer from "./components/AuthFormContainer.jsx";
import FancyAppName from "./components/FancyAppName.jsx";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowForm(true);
    }, 1500);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const displayMessage = (msg, duration = 3000) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, password, confirmPassword } = formData;

    // Validate passwords match
    if (password !== confirmPassword) {
      displayMessage("Passwords don't match!");
      setIsLoading(false); // Reset loading state
      return;
    }

    // Validate password requirements
    if (
      password.length < 8 || // Minimum 8 characters
      !/[A-Z]/.test(password) || // At least one uppercase letter
      !/[a-z]/.test(password) || // At least one lowercase letter
      !/\d/.test(password) // At least one number
    ) {
      displayMessage(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number."
      );
      setIsLoading(false); // Reset loading state
      return;
    }

    try {
      const response = await axios.post("/auth/register", formData);
      if (response.status === 201) {
        displayMessage("Registration successful! Redirecting to login...");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });

        // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(response.data.user));

        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      displayMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  if (isLoading) {
    return (
      <AuthBackground>
        <div className="text-center">
          <ThreeBodyLoader size={50} color="#ffffff" speed={0.8} />
          <p className="mt-4 text-white text-lg animate-pulse">
            Creating your account...
          </p>
        </div>
      </AuthBackground>
    );
  }

  return (
    <AuthBackground>
      <AuthFormContainer showForm={showForm}>
        <FancyAppName />

        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Create Account
        </h1>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes("successful")
                ? "bg-green-500/20 text-green-100"
                : "bg-red-500/20 text-red-100"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 h-5 w-5" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/60"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 h-5 w-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
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

          <div className="relative">
            <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 h-5 w-5" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/60"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white/20 hover:bg-white/40 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-8 text-center text-white/80">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-white font-semibold hover:text-white/90 hover:underline transition-colors"
          >
            Sign in
          </button>
        </p>
      </AuthFormContainer>
    </AuthBackground>
  );
};

export default RegisterPage;
