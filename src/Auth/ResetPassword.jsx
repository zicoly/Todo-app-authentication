import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthBackground from "./components/AuthBackground.jsx";
import AuthFormContainer from "./components/AuthFormContainer.jsx";
import FancyAppName from "./components/FancyAppName.jsx";
import { Lock, CheckCircle } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Track success state
  const [isTokenValid, setIsTokenValid] = useState(true); // Track token validity
  const navigate = useNavigate();

  // Check token validity on component mount
  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get(`/auth/checkToken/${token}`);
        if (!response.data.isValid) {
          setIsTokenValid(false);
          setError("The reset link has expired. Please request a new one.");
        }
      } catch (err) {
        setIsTokenValid(false);
        setError(
          "The reset link is invalid or has expired. Please request a new one."
        );
      }
    };

    checkTokenValidity();
  }, [token]);

  const displayMessage = (msg, duration = 3000) => {
    setMessage(msg);
    setError(msg);
    setTimeout(() => setMessage(""), duration);
    setTimeout(() => setError(""), duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      displayMessage("Passwords do not match.");
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
      return;
    }

    try {
      const response = await axios.patch(`/auth/resetPassword/${token}`, {
        password,
      });
      setMessage(response.data.message);
      setError("");
      setIsSuccess(true); // Set success state to true

      // Navigate to login screen after 3 seconds
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
      setMessage("");
      setIsSuccess(false); // Reset success state on error
    }
  };

  return (
    <AuthBackground>
      <AuthFormContainer showForm={true}>
        <FancyAppName />

        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Reset Password
        </h1>

        {/* Success Message with Animated Checkmark */}
        {isSuccess && (
          <div className="mb-6 p-6 bg-green-500/20 rounded-lg text-green-100 text-center">
            <div className="flex justify-center">
              <svg
                className="w-16 h-16 text-green-500 animate-checkmark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="mt-4 text-lg font-semibold">
              Password Reset Successful!
            </p>
            <p className="mt-2">
              You will be redirected to the login page shortly.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 rounded-lg text-red-100">
            {error}
          </div>
        )}

        {/* Form (only show if token is valid and not successful) */}
        {isTokenValid && !isSuccess && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 h-5 w-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.toString())} // Ensure input is treated as a string
                required
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/60"
                placeholder="Enter new password"
              />
            </div>

            <div className="relative">
              <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 h-5 w-5" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value.toString())} // Ensure input is treated as a string
                required
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/60"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/40 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Reset Password
            </button>
          </form>
        )}

        {/* Display message if token is invalid */}
        {!isTokenValid && (
          <div className="text-center text-white">
            <p>The reset link has expired. Please request a new one.</p>
            <button
              onClick={() => navigate("/forgot-password")}
              className="mt-4 bg-white/20 hover:bg-white/40 text-white py-2 px-4 rounded-lg transition-all duration-200"
            >
              Resend Reset Email
            </button>
          </div>
        )}
      </AuthFormContainer>
    </AuthBackground>
  );
};

export default ResetPassword;
