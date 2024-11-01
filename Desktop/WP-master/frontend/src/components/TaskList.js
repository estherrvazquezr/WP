import React from 'react';
import './TaskList.css';

function TaskList({ tasksByMonth, updateTaskStatus }) {
  if (!tasksByMonth || tasksByMonth.length === 0) {
    return <div>No hay tareas disponibles.</div>; // Manejo de caso sin tareas
  }

  return (
    <div className="dashboard-grid">
      {tasksByMonth.map((monthData, idx) => (
        <div key={idx} className="month-box">
          <h2>{monthData.month} meses antes</h2>
          {monthData.tasks.map((task, tIdx) => (
            <div key={tIdx} className="task">
              <span>{task.name}</span>
              <select
                onChange={(e) => updateTaskStatus(task.name, e.target.value)}
                value={task.status || "No completado"}
              >
                <option value="No completado">No completado</option>
                <option value="En progreso">En progreso</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
