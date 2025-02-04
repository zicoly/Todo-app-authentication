import React from "react";
import {
  ClipboardList,
  ListTodo,
  Calendar,
  Clock,
  CheckSquare,
  AlertCircle,
  Bell,
  BookOpen,
  Check,
  Edit,
  File,
  Filter,
  Flag,
  Folder,
  Heart,
  Home,
  Info,
  Layout,
  List,
  MessageCircle,
  Moon,
  Plus,
  Search,
  Settings,
  Star,
  Sun,
  Tag,
  Target,
  Timer,
} from "lucide-react";

// Floating Background Item Component
const FloatingItem = ({ icon: Icon, className, style }) => {
  const delay = Math.random() * 5; // Random delay between 0-5s
  const duration = 6 + Math.random() * 4; // Random duration between 6-10s
  const size = 30 + Math.floor(Math.random() * 20); // Random size between 30-50px

  return (
    <div
      className={`absolute opacity-20 text-white ${className}`}
      style={{
        ...style,
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      <Icon size={size} />
    </div>
  );
};

// Array of icons to use in the background
const backgroundIcons = [
  ClipboardList,
  ListTodo,
  Calendar,
  Clock,
  CheckSquare,
  AlertCircle,
  Bell,
  BookOpen,
  Check,
  Edit,
  File,
  Filter,
  Flag,
  Folder,
  Heart,
  Home,
  Info,
  Layout,
  List,
  MessageCircle,
  Moon,
  Plus,
  Search,
  Settings,
  Star,
  Sun,
  Tag,
  Target,
  Timer,
];

// Function to generate positions for icons
const generateIconPositions = () => {
  const positions = [];
  // Create a 5x6 grid for even distribution
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 6; j++) {
      // Add some randomness to the position within each grid cell
      const left = `${j * 20 + Math.random() * 10}%`;
      const top = `${i * 25 + Math.random() * 15}%`;
      positions.push({ left, top });
    }
  }
  return positions;
};

// AuthBackground Component
const AuthBackground = ({ children }) => {
  const iconPositions = generateIconPositions();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 relative overflow-hidden p-4">
      {/* Background Icons */}
      {iconPositions.map((position, index) => (
        <FloatingItem
          key={index}
          icon={backgroundIcons[index % backgroundIcons.length]}
          className="transform"
          style={{
            left: position.left,
            top: position.top,
          }}
        />
      ))}

      {/* Children (e.g., Register Form) */}
      {children}
    </div>
  );
};

export default AuthBackground;
