// Local Storage Service
// Handles all local storage operations for tasks

const STORAGE_KEYS = {
  TASKS: 'todos_list',
  SETTINGS: 'todos_settings',
  CATEGORIES: 'todos_categories',
};

const storageService = {
  // Task Operations
  getTasks: () => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error retrieving tasks from storage:', error);
      return [];
    }
  },

  saveTasks: (tasks) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      return true;
    } catch (error) {
      console.error('Error saving tasks to storage:', error);
      return false;
    }
  },

  getTask: (taskId) => {
    try {
      const tasks = storageService.getTasks();
      return tasks.find((task) => task.id === taskId) || null;
    } catch (error) {
      console.error('Error retrieving task from storage:', error);
      return null;
    }
  },

  deleteTask: (taskId) => {
    try {
      const tasks = storageService.getTasks();
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      storageService.saveTasks(updatedTasks);
      return true;
    } catch (error) {
      console.error('Error deleting task from storage:', error);
      return false;
    }
  },

  // Settings Operations
  getSettings: () => {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings
        ? JSON.parse(settings)
        : {
            theme: 'light',
            sortBy: 'createdAt',
            defaultPriority: 'medium',
          };
    } catch (error) {
      console.error('Error retrieving settings from storage:', error);
      return {};
    }
  },

  saveSettings: (settings) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings to storage:', error);
      return false;
    }
  },

  // Category Operations
  getCategories: () => {
    try {
      const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return categories
        ? JSON.parse(categories)
        : ['Work', 'Personal', 'Shopping', 'Health', 'Other'];
    } catch (error) {
      console.error('Error retrieving categories from storage:', error);
      return ['Work', 'Personal', 'Shopping', 'Health', 'Other'];
    }
  },

  saveCategories: (categories) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      return true;
    } catch (error) {
      console.error('Error saving categories to storage:', error);
      return false;
    }
  },

  addCategory: (category) => {
    try {
      const categories = storageService.getCategories();
      if (!categories.includes(category)) {
        categories.push(category);
        storageService.saveCategories(categories);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding category to storage:', error);
      return false;
    }
  },

  // Clear All Data
  clearAllData: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TASKS);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  },

  // Export Data
  exportData: () => {
    try {
      const tasks = storageService.getTasks();
      const settings = storageService.getSettings();
      const categories = storageService.getCategories();

      return {
        tasks,
        settings,
        categories,
        exportDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  },

  // Import Data
  importData: (data) => {
    try {
      if (data.tasks) storageService.saveTasks(data.tasks);
      if (data.settings) storageService.saveSettings(data.settings);
      if (data.categories) storageService.saveCategories(data.categories);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  },
};

export { storageService };
