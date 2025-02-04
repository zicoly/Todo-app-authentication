import React from "react";

const AuthFormContainer = ({ children, showForm }) => {
  return (
    <div
      className={`w-full max-w-md z-10 transition-all duration-1000 ${
        showForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="backdrop-blur-xl bg-white/30 p-8 rounded-2xl shadow-2xl border border-white/20">
        {children}
      </div>
    </div>
  );
};

export default AuthFormContainer;
