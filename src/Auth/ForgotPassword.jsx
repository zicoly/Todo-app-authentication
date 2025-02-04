import React, { useState } from "react";
import axios from "../api/axios";
import AuthBackground from "./components/AuthBackground";
import AuthFormContainer from "./components/AuthFormContainer";
import { Mail, ArrowRight } from "lucide-react";
import FancyAppName from "./components/FancyAppName";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false); // Track if email has been sent

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/auth/forgotPassword", { email });
      setMessage(response.data.message || "Reset link sent to your email.");
      setError("");
      setIsEmailSent(true); // Set email sent state to true
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send reset email. Please try again later."
      );
      setMessage("");
      setIsEmailSent(false); // Reset email sent state on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/auth/forgotPassword", { email });
      setMessage(response.data.message || "Reset link resent to your email.");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to resend reset email. Please try again later."
      );
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthBackground>
      <AuthFormContainer showForm={true}>
        <FancyAppName />

        {/* Success Message */}
        {isEmailSent && (
          <div className="mb-6 p-6 bg-green-500/20 rounded-lg text-white text-center">
            <div className="mx-auto border-white border h-20 w-20 flex items-center justify-center rounded-full ">
              <Mail className="h-10 w-10" />
            </div>
            <p className="text-2xl font-semibold mt-6">Check your email</p>
            <p className="mt-6">
              Please check the email address{" "}
              <span className="font-bold">{email}</span> for instructions to
              reset your password.
            </p>
            <button
              onClick={handleResendEmail}
              disabled={isLoading}
              className="mt-6 w-full bg-green-500/20 hover:bg-green-500/40 text-white py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed font-bold border border-white/25"
            >
              {isLoading ? "Resending..." : "Resend Email"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 rounded-lg text-red-100">
            {error}
          </div>
        )}

        {/* Form (only show if email has not been sent) */}
        {!isEmailSent && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
              Forgot Password
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/60"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white/20 hover:bg-white/40 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        )}
      </AuthFormContainer>
    </AuthBackground>
  );
};

export default ForgotPassword;
