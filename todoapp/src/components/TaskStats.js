import React, { useMemo } from 'react';
import { taskService } from '../services/taskService';
import './TaskStats.css';

const TaskStats = ({ tasks }) => {
  const stats = useMemo(() => taskService.getStats(tasks), [tasks]);

  return (
    <div className="task-stats">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <p className="stat-label">Total Tasks</p>
          <p className="stat-value">{stats.total}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <p className="stat-label">Completed</p>
          <p className="stat-value">{stats.completed}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⏳</div>
        <div className="stat-content">
          <p className="stat-label">Active</p>
          <p className="stat-value">{stats.active}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⚠️</div>
        <div className="stat-content">
          <p className="stat-label">Overdue</p>
          <p className="stat-value">{stats.overdue}</p>
        </div>
      </div>

      <div className="stat-card progress-card">
        <div className="progress-content">
          <p className="stat-label">Progress</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stats.completionPercentage}%` }}
            />
          </div>
          <p className="progress-text">{stats.completionPercentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
