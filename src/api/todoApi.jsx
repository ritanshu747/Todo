import axios from 'axios';

const API_URL = 'http://localhost:4000/tasks'; // URL of the backend server

// Get all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching tasks: ${error.response?.data?.message || error.message}`);
  }
};

// Create a new task
export const createTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating task: ${error.response?.data?.message || error.message}`);
  }
};

// Update a task
export const updateTask = async (id, task) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating task: ${error.response?.data?.message || error.message}`);
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error(`Error deleting task: ${error.response?.data?.message || error.message}`);
  }
};
