// pages/OnboardingModal.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OnboardingModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const groupInfo = {
    group: "Group A",
    members: [
      "Omojola Zion Olalekan",
      "Adeyemi Ayomide Jesuloba",
      "Madike Olisaemeka Valerian",
      "Abdulaziz Usama",
      "Daniel Ameh Ochoga",
      "Okanlawon Mariam Oyebola",
      "Aleilo Muhsin Olamide",
    ],
    courseCode: "CSC 401",
    projectTitle: "Task Management System",
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl lg:max-w-[650px] lg:h-[600px] h-screen w-full lg:mt-16 mt-0 lg:px-14 p-8 relative border-gray-500 border shadow-xl shadow-gray-700"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
        >
          {/* Skip Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black hover:bg-gray-300 font-medium border border-gray-300 lg:px-4 px-2 lg:py-2 py-1 rounded-lg duration-300 transition-all text-sm lg:text-base"
          >
            Skip
          </button>

          {/* Content */}
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="md:text-3xl text-xl font-bold text-center text-indigo-600 mb-8 font-mono">
                  Welcome <br />
                  <span className="whitespace-nowrap">
                    {groupInfo.group} Todo User Application
                  </span>
                </h2>
                <div className="space-y-4 text-center">
                  <p className="lg:text-xl text-base font-medium">
                    {groupInfo.projectTitle}
                  </p>
                  <p className="text-gray-600 font-[inter]">
                    Course Code: {groupInfo.courseCode}
                  </p>
                  <div className="mt-8">
                    <h4 className="font-medium lg:text-xl text-base mb-4">
                      Team Members:
                    </h4>
                    <ul className="lg:space-y-2 space-y-4">
                      {groupInfo.members.map((member, index) => (
                        <li
                          key={index}
                          className="text-gray-600 font-[inter] lg:text-base text-sm"
                        >
                          {member}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h2 className="lg:text-3xl text-xl font-bold text-center text-indigo-600 mb-8 font-mono">
                  How It Works
                </h2>
                <div className="space-y-6">
                  <div className="p-4 border-l-4 border-indigo-600 bg-indigo-50">
                    <h3 className="font-semibold lg:text-lg text-base">
                      Efficient Task Management
                    </h3>
                    <p className="text-gray-600 font-[inter] text-sm lg:text-base">
                      Create, update, and track your tasks seamlessly in one
                      place.
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-green-600 bg-green-50">
                    <h3 className="font-semibold lg:text-lg text-base">
                      Stay Organized
                    </h3>
                    <p className="text-gray-600 font-[inter] text-sm lg:text-base">
                      Filter tasks by status and maintain clear overview of your
                      progress.
                    </p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-600 bg-purple-50">
                    <h3 className="font-semibold lg:text-lg text-base">
                      Secure & Personal
                    </h3>
                    <p className="text-gray-600 font-[inter] lg:text-base text-sm">
                      Your tasks are private and protected with secure
                      authentication.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute top-64 left-4 right-4 flex justify-between items-center">
            <button
              onClick={() => setStep(1)}
              className={`p-2 rounded-full ${
                step === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-indigo-600 hover:bg-indigo-50"
              }`}
              disabled={step === 1}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => (step === 1 ? setStep(2) : onClose())}
              className={`p-2 rounded-full ${
                step === 2
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-indigo-600 hover:bg-indigo-50"
              }`}
              disabled={step === 2}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Progress bars */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-row gap-4">
            <div className="lg:h-2 h-1 bg-gray-200 rounded w-full">
              <div
                className="h-full bg-indigo-600 rounded transition-all duration-300"
                style={{ width: step === 1 ? "100%" : "0%" }}
              />
            </div>
            <div className="lg:h-2 h-1 bg-gray-200 rounded w-full">
              <div
                className="h-full bg-indigo-600 rounded transition-all duration-300"
                style={{ width: step === 2 ? "100%" : "0%" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingModal;
