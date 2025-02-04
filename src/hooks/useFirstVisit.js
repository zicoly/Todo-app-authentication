// hooks/useFirstVisit.js
import { useEffect, useState } from "react";

const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if the user has visited before
    const hasVisited = localStorage.getItem("hasVisited");
    // Check if a token is stored
    const token = localStorage.getItem("token");

    if (!hasVisited && !token) {
      setIsFirstVisit(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  return isFirstVisit;
};

export default useFirstVisit;
