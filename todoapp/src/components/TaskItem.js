import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTaskComplete, deleteTask, updateTask } from '../store/taskSlice';
import { taskService } from '../services/taskService';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const isOverdue = taskService.isOverdue(task.dueDate);
  const formattedDueDate = taskService.getFormattedDueDate(task.dueDate);

  const handleToggleComplete = () => {
    dispatch(toggleTaskComplete(task.id));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      dispatch(
        updateTask({
          id: task.id,
          title: editedTitle,
          description: editedDescription,
        })
      );
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="task-checkbox"
        />

        {!isEditing ? (
          <div className="task-info">
            <h3 className="task-title">{task.title}</h3>
            {task.description && <p className="task-description">{task.description}</p>}
            <div className="task-meta">
              <span
                className="task-priority"
                style={{ color: taskService.getPriorityColor(task.priority) }}
              >
                {taskService.getPriorityLabel(task.priority)}
              </span>
              {task.categories?.length > 0 && (
                <div className="task-categories">
                  {task.categories.map((cat) => (
                    <span key={cat} className="category-badge">
                      {cat}
                    </span>
                  ))}
                </div>
              )}
              {task.dueDate && (
                <span className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
                  📅 {formattedDueDate}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="task-edit">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="edit-input"
              autoFocus
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="edit-textarea"
              rows="2"
            />
          </div>
        )}
      </div>

      <div className="task-actions">
        {!isEditing ? (
          <>
            <button
              className="task-btn edit-btn"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              ✎
            </button>
            <button
              className="task-btn delete-btn"
              onClick={handleDelete}
              title="Delete task"
            >
              🗑️
            </button>
          </>
        ) : (
          <>
            <button
              className="task-btn save-btn"
              onClick={handleSaveEdit}
              title="Save"
            >
              ✓
            </button>
            <button
              className="task-btn cancel-btn"
              onClick={handleCancel}
              title="Cancel"
            >
              ✕
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
