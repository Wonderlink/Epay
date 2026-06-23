import { formatDistanceToNow, isToday, isTomorrow, isPast, isBefore } from 'date-fns';

// Task Service
// Utility functions for task operations and filtering

const taskService = {
  // Filter and search tasks
  filterTasks: (tasks, filter, searchQuery = '', category = 'all') => {
    let filtered = tasks;

    // Filter by completion status
    if (filter === 'active') {
      filtered = filtered.filter((task) => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter((task) => task.completed);
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter((task) => task.categories?.includes(category));
    }

    // Search by title and description
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  // Sort tasks
  sortTasks: (tasks, sortBy = 'dueDate') => {
    const sorted = [...tasks];

    switch (sortBy) {
      case 'dueDate':
        return sorted.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });

      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return sorted.sort(
          (a, b) =>
            priorityOrder[a.priority || 'medium'] -
            priorityOrder[b.priority || 'medium']
        );

      case 'createdAt':
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));

      default:
        return sorted;
    }
  },

  // Get formatted due date
  getFormattedDueDate: (date) => {
    if (!date) return null;

    const dueDate = new Date(date);

    if (isToday(dueDate)) return 'Today';
    if (isTomorrow(dueDate)) return 'Tomorrow';

    return formatDistanceToNow(dueDate, { addSuffix: true });
  },

  // Check if task is overdue
  isOverdue: (dueDate) => {
    if (!dueDate) return false;
    return isPast(new Date(dueDate)) && !isToday(new Date(dueDate));
  },

  // Get task statistics
  getStats: (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const active = total - completed;
    const overdue = tasks.filter(
      (task) => !task.completed && taskService.isOverdue(task.dueDate)
    ).length;

    const byPriority = {
      high: tasks.filter((task) => task.priority === 'high').length,
      medium: tasks.filter((task) => task.priority === 'medium').length,
      low: tasks.filter((task) => task.priority === 'low').length,
    };

    return {
      total,
      completed,
      active,
      overdue,
      completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      byPriority,
    };
  },

  // Get priority color
  getPriorityColor: (priority) => {
    switch (priority) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
      default:
        return '#007AFF';
    }
  },

  // Get priority label
  getPriorityLabel: (priority) => {
    switch (priority) {
      case 'high':
        return '🔴 High';
      case 'medium':
        return '🟡 Medium';
      case 'low':
        return '🟢 Low';
      default:
        return 'Unknown';
    }
  },

  // Validate task
  validateTask: (task) => {
    const errors = [];

    if (!task.title || task.title.trim() === '') {
      errors.push('Task title is required');
    }

    if (task.title && task.title.length > 200) {
      errors.push('Task title must be less than 200 characters');
    }

    if (task.description && task.description.length > 1000) {
      errors.push('Task description must be less than 1000 characters');
    }

    if (task.dueDate && new Date(task.dueDate) < new Date()) {
      // Allow past dates but warn
      console.warn('Due date is in the past');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

export { taskService };
