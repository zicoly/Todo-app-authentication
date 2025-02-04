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
import SettingsModal from "../components/Todos/SettingsModal";
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
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [user, setUser] = useState({
    name: "User",
    email: "user@example.com",
    profileIcon:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({
        name: response.data.name,
        email: response.data.email,
        profileIcon: response.data.profileIcon || "default1",
      });
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  };

  const fetchTodos = async () => {
    if (!token) {
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    fetchTodos();
    if (token) fetchUserDetails();
  }, [token]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }
    if (!newTodo.trim()) return;

    try {
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
    }
  };

  const handleToggleTodo = async (todo) => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
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
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await axios.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete task. Please try again.");
      console.error("Delete error:", err);
    }
  };

  const handleEditTodo = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
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
    }
  };

const handleUpdateProfile = async (updatedUser) => {
  try {
    const response = await fetch("/api/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        userId: updatedUser.id,
        name: updatedUser.name,
        profileIcon: updatedUser.profileIcon,
      }),
    });

    const data = await response.json();
    if (data.success) {
      // Optionally, you can show a success message or update the UI
    }
  } catch (error) {
    console.error("Error updating profile:", error);
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
        setShowSettingsModal={setShowSettingsModal}
        navigate={navigate}
      />

      {showSettingsModal && (
        <SettingsModal
          user={user}
          setUser={setUser}
          handleUpdateProfile={handleUpdateProfile}
          setShowSettingsModal={setShowSettingsModal}
        />
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="bg-white bg-opacity-20 rounded-lg shadow-lg p-6 backdrop-blur-md">
          <div className="flex space-x-2 mb-6">
            {["all", "pending", "completed"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-md capitalize transition-colors ${
                  filter === filterType
                    ? "bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>

          <form onSubmit={handleAddTodo} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Add a new task..."
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-colors flex items-center gap-2"
              >
                <FiPlus /> Add
              </button>
            </div>
          </form>

          <TodoList
            filteredTodos={filteredTodos}
            handleToggleTodo={handleToggleTodo}
            handleDeleteTodo={handleDeleteTodo}
            setEditingTodo={setEditingTodo}
            setEditText={setEditText}
          />
        </div>
      </div>

      {editingTodo && (
        <EditTodoModal
          editText={editText}
          setEditText={setEditText}
          handleEditTodo={handleEditTodo}
          setEditingTodo={setEditingTodo}
        />
      )}

      <ErrorMessage error={error} />
    </div>
  );
};

export default Todos;
