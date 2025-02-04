// App.js
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import useFirstVisit from "./hooks/useFirstVisit";
import RegisterPage from "./Auth/RegisterPage";
import LoginPage from "./Auth/LoginPage";
import Todos from "./pages/Todos";
import OnboardingModal from "./pages/OnboardingModal";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import NotFoundPage from "./NotFoundPage";

const AppContent = () => {
  const isFirstVisit = useFirstVisit();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isFirstVisit && location.pathname === "/") {
      // Show the modal after 3 seconds
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);

      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit, location.pathname]);

  // Only show onboarding on the default route
  const shouldShowOnboarding = location.pathname === "/" && showOnboarding;

  return (
    <>
      {shouldShowOnboarding && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}
      <Routes>
        <Route
          path="/"
          element={<Todos showAbout={() => setShowOnboarding(true)} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
