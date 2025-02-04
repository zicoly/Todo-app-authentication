// Todos.jsx
import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiCheck,
  FiEdit,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import ThreeBodyLoader from "../components/ThreeBodyLoader";
import Navbar from "../components/Todos/Navbar";
import EditTodoModal from "../components/Todos/EditTodoModal";
import ErrorMessage from "../components/Todos/ErrorMessage";
import TodoList from "../components/Todos/TodoList";

const Todos = ({ showAbout }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState({
    name: "User",
    email: "user@example.com",
    profileIcon: "default-profile-icon-url",
  });

  const navigate = useNavigate();

  // Check authentication and navigate if needed
  const checkAuthAndNavigate = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return false;
    }
    return true;
  };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get("/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({
        name: response.data.name,
        email: response.data.email,
        profileIcon: response.data.profileIcon || "default-profile-icon-url",
      });
    } catch (err) {
      console.error("Failed to fetch user details:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  };

  const fetchTodos = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data.todos);
      setError("");
    } catch (err) {
      setError("Failed to fetch todos. Please try again.");
      console.error("Fetch error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter change handler with auth check
  const handleFilterChange = (filterType) => {
    if (!checkAuthAndNavigate()) return;
    setFilter(filterType);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    fetchUserDetails();
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!checkAuthAndNavigate()) return;
    if (!newTodo.trim()) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/todos",
        { title: newTodo.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([response.data.todo, ...todos]);
      setNewTodo("");
      setError("");
    } catch (err) {
      setError("Failed to add task. Please try again.");
      console.error("Add error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  };

  const handleToggleTodo = async (todo) => {
    if (!checkAuthAndNavigate()) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `/todos/${todo._id}`,
        { completed: !todo.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map((t) => (t._id === todo._id ? response.data.todo : t)));
      setError("");
    } catch (err) {
      setError("Failed to update task. Please try again.");
      console.error("Update error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!checkAuthAndNavigate()) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete task. Please try again.");
      console.error("Delete error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  };

  const handleEditTodo = async () => {
    if (!checkAuthAndNavigate()) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `/todos/${editingTodo._id}`,
        { title: editText.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(
        todos.map((t) => (t._id === editingTodo._id ? response.data.todo : t))
      );
      setEditingTodo(null);
      setEditText("");
      setError("");
    } catch (err) {
      setError("Failed to update task. Please try again.");
      console.error("Edit error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  };

  const handleUpdateProfile = async (updatedUser) => {
    if (!checkAuthAndNavigate()) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "/auth/update-profile",
        {
          name: updatedUser.name,
          profileIcon: updatedUser.profileIcon,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setUser((prev) => ({
          ...prev,
          name: updatedUser.name,
          profileIcon: updatedUser.profileIcon,
        }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xl text-indigo-600 font-medium"
        >
          <div className="text-center">
            <ThreeBodyLoader size={50} color="#ffffff" speed={0.8} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

      <Navbar
        showAbout={showAbout}
        user={user}
        showProfileDropdown={showProfileDropdown}
        setShowProfileDropdown={setShowProfileDropdown}
        navigate={navigate}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
        <div className="bg-white bg-opacity-20 rounded-lg shadow-lg p-4 sm:p-6 backdrop-blur-md">
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {["all", "pending", "completed"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => handleFilterChange(filterType)}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md capitalize transition-colors text-sm sm:text-base ${
                  filter === filterType
                    ? "bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>

          <form onSubmit={handleAddTodo} className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Add a new task..."
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" /> Add
              </button>
            </div>
          </form>

          <div className="space-y-2 sm:space-y-3">
            <TodoList
              filteredTodos={filteredTodos}
              handleToggleTodo={handleToggleTodo}
              handleDeleteTodo={handleDeleteTodo}
              setEditingTodo={setEditingTodo}
              setEditText={setEditText}
              filter={filter}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {editingTodo && (
          <EditTodoModal
            editText={editText}
            setEditText={setEditText}
            handleEditTodo={handleEditTodo}
            setEditingTodo={setEditingTodo}
          />
        )}
      </AnimatePresence>

      <ErrorMessage error={error} />
    </div>
  );
};

export default Todos;
