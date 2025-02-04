import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Edit, Trash2, Inbox } from "lucide-react";

const TodoList = ({
  filteredTodos,
  handleToggleTodo,
  handleDeleteTodo,
  setEditingTodo,
  setEditText,
  filter,
}) => {
  if (filteredTodos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 text-gray-500"
      >
        <Inbox className="w-12 h-12 mb-4 text-white opacity-50 stroke-1" />
        <p className="text-lg font-medium text-white/60">No tasks found</p>
        <p className="text-sm opacity-75 text-white/60">
          {filter === "completed"
            ? "You have no completed tasks"
            : filter === "pending"
            ? "You have no pending tasks"
            : "Start by adding a new task"}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.ul className="space-y-3 max-h-[60vh] overflow-y-auto">
      <AnimatePresence>
        {filteredTodos.map((todo) => (
          <motion.li
            key={todo._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100/90 bg-opacity-55 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggleTodo(todo)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300 hover:border-indigo-500"
                }`}
              >
                {todo.completed && <Check className="w-4 h-4 text-white" />}
              </button>
              <span
                className={`${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingTodo(todo);
                  setEditText(todo.title);
                }}
                className="text-gray-400 hover:text-indigo-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Edit className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={() => handleDeleteTodo(todo._id)}
                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-[18px] h-[18px]" />
              </button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default TodoList;
