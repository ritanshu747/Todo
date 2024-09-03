import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const TodoItem = ({ task, onDelete, onToggle }) => (
  <li className="flex items-center mb-2 p-2 border rounded">
    <input
      type="checkbox"
      checked={task.done}
      onChange={() => onToggle(task._id, task.done)}
      className="mr-2"
    />
    <span className={`flex-grow ${task.done ? 'line-through' : ''}`}>{task.text}</span>
    <button
      onClick={() => onDelete(task._id)}
      className="ml-2 text-red-500 hover:text-red-700 transition"
    >
      <FaTrash />
    </button>
    <button
      onClick={() => onToggle(task._id, task.done)}
      className="ml-2 text-blue-500 hover:text-blue-700 transition"
    >
      <FaEdit />
    </button>
  </li>
);

export default TodoItem;
