import React from 'react';
import './Sidebar.css';

function Sidebar({ completedTasks = [], inProgressTasks = [], notCompletedTasks = [], updateTaskStatus }) {
  return (
    <aside className="sidebar">
      <h2>Resumen de Tareas</h2>
      <div className="task-category">
        <h3>Completadas</h3>
        {completedTasks.length > 0 ? (
          completedTasks.map((task, index) => (
            <div key={index} className="task-item">
              <span>✔ {task.name}</span>
            </div>
          ))
        ) : (
          <div>No hay tareas completadas.</div>
        )}
      </div>
      <div className="task-category">
        <h3>En Progreso</h3>
        {inProgressTasks.length > 0 ? (
          inProgressTasks.map((task, index) => (
            <div key={index} className="task-item">
              <span>🟢 {task.name}</span>
            </div>
          ))
        ) : (
          <div>No hay tareas en progreso.</div>
        )}
      </div>
      <div className="task-category">
        <h3>No Completadas</h3>
        {notCompletedTasks.length > 0 ? (
          notCompletedTasks.map((task, index) => (
            <div key={index} className="task-item">
              <span>❌ {task.name}</span>
            </div>
          ))
        ) : (
          <div>No hay tareas no completadas.</div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
