import React from 'react';
import './TaskDetails.css';

function TaskDetails({ selectedTask, taskComments, setTaskComments, onClose }) {
  return (
    <div className="details-panel">
      <h2>Detalles de la Tarea</h2>
      <p><strong>Nombre:</strong> {selectedTask.name}</p>
      <p><strong>Descripción:</strong> {selectedTask.description || "No disponible"}</p>
      <textarea
        value={taskComments[selectedTask.name] || ""}
        onChange={(e) => setTaskComments((prev) => ({
          ...prev,
          [selectedTask.name]: e.target.value,
        }))}
        placeholder="Escribe un comentario aquí..."
      />
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}

export default TaskDetails;
