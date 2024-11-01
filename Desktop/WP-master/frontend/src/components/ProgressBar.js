import React from 'react';
import './ProgressBar.css';

function ProgressBar({ totalTasks, completedTasks }) {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <span>{Math.round(progress)}% Completado</span>
    </div>
  );
}

export default ProgressBar;
