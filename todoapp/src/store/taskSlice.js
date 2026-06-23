import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { storageService } from '../services/storageService';

const initialState = {
  items: [],
  filter: 'all', // all, active, completed
  category: 'all',
  searchQuery: '',
  categories: ['Work', 'Personal', 'Shopping', 'Health', 'Other'],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasks: (state) => {
      const savedTasks = storageService.getTasks();
      state.items = savedTasks || [];
    },
    addTask: (state, action) => {
      const newTask = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description || '',
        completed: false,
        priority: action.payload.priority || 'medium',
        dueDate: action.payload.dueDate || null,
        categories: action.payload.categories || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.items.push(newTask);
      storageService.saveTasks(state.items);
    },
    updateTask: (state, action) => {
      const taskIndex = state.items.findIndex((task) => task.id === action.payload.id);
      if (taskIndex !== -1) {
        state.items[taskIndex] = {
          ...state.items[taskIndex],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
        storageService.saveTasks(state.items);
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
      storageService.saveTasks(state.items);
    },
    toggleTaskComplete: (state, action) => {
      const task = state.items.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
        storageService.saveTasks(state.items);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearCompletedTasks: (state) => {
      state.items = state.items.filter((task) => !task.completed);
      storageService.saveTasks(state.items);
    },
    deleteAllTasks: (state) => {
      state.items = [];
      storageService.saveTasks(state.items);
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
  },
});

export const {
  loadTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  setFilter,
  setCategory,
  setSearchQuery,
  clearCompletedTasks,
  deleteAllTasks,
  addCategory,
} = taskSlice.actions;

export default taskSlice.reducer;
