// src/components/Todos/TodoForm.jsx
import React from "react";
import { FiPlus } from "react-icons/fi";

const TodoForm = ({ newTodo, setNewTodo, handleAddTodo }) => {
  return (
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
  );
};

export default TodoForm;
