import React from "react";

const FancyAppName = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-6xl font-bold text-white animate-bounce">
        <span
          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          Taskify
        </span>
      </h1>
    </div>
  );
};

export default FancyAppName;
