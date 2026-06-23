import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskStats from '../components/TaskStats';
import CategoryFilter from '../components/CategoryFilter';
import { setFilter, setCategory, setSearchQuery } from '../store/taskSlice';
import '../styles/HomeScreen.css';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { items, filter, category, searchQuery, categories } = useSelector(
    (state) => state.tasks
  );
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredAndSearchedTasks = useMemo(() => {
    let filtered = items;

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

    // Sort by due date
    return filtered.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }, [items, filter, category, searchQuery]);

  return (
    <div className="home-screen">
      {/* Task Statistics */}
      <TaskStats tasks={items} />

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="search-input"
        />
      </div>

      {/* Filter Controls */}
      <div className="filter-controls">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => dispatch(setFilter('all'))}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => dispatch(setFilter('active'))}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => dispatch(setFilter('completed'))}
          >
            Completed
          </button>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={category}
          onSelectCategory={(cat) => dispatch(setCategory(cat))}
        />
      </div>

      {/* Add Task Button */}
      <div className="action-bar">
        <button
          className="btn btn-primary btn-add-task"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? '✕ Cancel' : '+ Add Task'}
        </button>
      </div>

      {/* Create Task Form */}
      {showCreateForm && (
        <div className="form-container">
          <TaskForm onTaskCreated={() => setShowCreateForm(false)} />
        </div>
      )}

      {/* Task List */}
      <div className="tasks-container">
        {filteredAndSearchedTasks.length > 0 ? (
          <TaskList tasks={filteredAndSearchedTasks} />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p className="empty-title">No tasks found</p>
            <p className="empty-subtitle">
              {items.length === 0
                ? 'Create your first task to get started!'
                : 'Try adjusting your filters or search'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
