import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ErrorMessage = ({ error }) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg z-50"
        >
          {error}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;