import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/taskSlice';
import { taskService } from '../services/taskService';
import './TaskForm.css';

const TaskForm = ({ onTaskCreated }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.tasks.categories);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    categories: [],
  });
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const validation = taskService.validateTask(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Add task
    dispatch(
      addTask({
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate || null,
        categories: formData.categories,
      })
    );

    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      categories: [],
    });
    setErrors([]);

    if (onTaskCreated) {
      onTaskCreated();
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="What do you need to do?"
          maxLength="200"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Add more details about your task..."
          maxLength="1000"
          className="form-textarea"
          rows="4"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Categories</label>
        <div className="category-checkboxes">
          {categories.map((category) => (
            <label key={category} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="checkbox-input"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index} className="error-message">
              ⚠️ {error}
            </p>
          ))}
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Create Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
