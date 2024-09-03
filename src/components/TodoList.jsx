import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import TodoItem from './TodoItem';
import Header from './Header';
import Footer from './Footer';
import { getTasks, createTask, updateTask, deleteTask } from '../api/todoApi';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (err) {
      setError('Error fetching tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === '') return;
    setLoading(true);
    setError(null);
    try {
      await createTask({ title: newTask, description: '', completed: false });
      setNewTask('');
      fetchTasks();
    } catch (err) {
      toast.error('Error adding task');
      console.error('Error adding task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id, done) => {
    setLoading(true);
    setError(null);
    try {
      await updateTask(id, { completed: !done });
      fetchTasks();
    } catch (err) {
      toast.error('Error updating task');
      console.error('Error updating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      toast.error('Error deleting task');
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${nightMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Header toggleNightMode={toggleNightMode} nightMode={nightMode} />
      <main className="flex-grow p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={50} color={'#123abc'} loading={loading} />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
                className="p-2 border rounded w-full"
              />
              <button
                onClick={addTask}
                className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Add Task
              </button>
            </div>
            <ul>
              {tasks.map(task => (
                <TodoItem
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onToggle={handleUpdateTask}
                />
              ))}
            </ul>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TodoList;
