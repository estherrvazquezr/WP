import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProgressBar from './ProgressBar';
import './Dashboard.css';

function Dashboard() {
  const [weddingDate, setWeddingDate] = useState(null);
  const [tasksByMonth, setTasksByMonth] = useState([]);
  const [taskStates, setTaskStates] = useState({});
  const [overdueTasksSet, setOverdueTasksSet] = useState(new Set());

  const fetchTasks = () => {
    if (!weddingDate) return;

    fetch(`http://localhost:5500/api/tasks?weddingDate=${weddingDate}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener tareas');
        }
        return response.json();
      })
      .then(data => {
        console.log('Tareas obtenidas del servidor:', data);
        setTasksByMonth(data.tasksByMonth || []);

        // Inicializar el estado de las tareas
        const initialTaskStates = {};
        data.tasksByMonth.forEach(month => {
          month.tasks.forEach(task => {
            initialTaskStates[task.name] = 'no-completada'; // Estado por defecto
          });
        });

        // Inicializar el estado de las tareas vencidas
        const initialOverdueTasks = new Set();
        data.overdueTasks.forEach(task => {
          initialTaskStates[task.name] = 'vencida'; // Estado para tareas vencidas
          initialOverdueTasks.add(task.name); // Mantener registro de tareas vencidas
        });

        setTaskStates(initialTaskStates);
        setOverdueTasksSet(initialOverdueTasks);
        console.log('Estado inicial de las tareas:', initialTaskStates); // Log inicial
      })
      .catch(error => console.error('Error al obtener tareas:', error));
  };

  useEffect(() => {
    fetchTasks();
  }, [weddingDate]);

  const updateTaskStatus = (taskName, newStatus) => {
    console.log(`Updating task: ${taskName} to status: ${newStatus}`);

    setTaskStates(prev => {
      const updatedState = {
        ...prev,
        [taskName]: newStatus, // Actualizar solo el estado de la tarea
      };

      // Log del estado después de la actualización
      console.log('Estado actualizado de las tareas:', updatedState);

      // Verificar cuántas tareas vencidas quedan después de la actualización
      const overdueTasksCount = Array.from(overdueTasksSet).filter(task => updatedState[task] === 'vencida').length;
      console.log('Número de tareas vencidas después de la actualización:', overdueTasksCount);

      return updatedState;
    });
  };

  return (
    <div className="dashboard">
      <Sidebar 
        completedTasks={Object.keys(taskStates).filter(task => taskStates[task] === 'completada')}
        inProgressTasks={Object.keys(taskStates).filter(task => taskStates[task] === 'en-progreso')}
        notCompletedTasks={Object.keys(taskStates).filter(task => taskStates[task] === 'no-completada')}
        overdueTasks={Array.from(overdueTasksSet)}
      />
      <div className="main-content">
        <h1>Wedding Planner Dashboard</h1>
        <div className="date-picker">
          <label>Fecha de la boda:</label>
          <input
            type="date"
            onChange={(e) => setWeddingDate(e.target.value)}
          />
        </div>

        <h2>Tareas vencidas:</h2>
        {Object.keys(taskStates).some(task => taskStates[task] === 'vencida') ? (
          <ul>
            {Array.from(overdueTasksSet).map((task, index) => (
              <li key={index} style={{
                textDecoration: taskStates[task] === 'completada' ? 'line-through' : 'none', // Tachado para completadas
                color: taskStates[task] === 'en-progreso' ? 'green' : 'red' // Verde para en progreso, rojo para vencidas
              }}>
                {task}
                <select onChange={(e) => {
                  console.log(`Tarea vencida cambiada: ${task}, nuevo estado: ${e.target.value}`); // Log de cambio
                  updateTaskStatus(task, e.target.value);
                }}>
                  <option value="no-completada">No Completada</option>
                  <option value="en-progreso">En Progreso</option>
                  <option value="completada">Completada</option>
                </select>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay tareas vencidas.</p>
        )}

        <h2>Tareas programadas:</h2>
        {tasksByMonth.length > 0 ? (
          tasksByMonth.map((monthData, monthIndex) => (
            <div key={monthIndex}>
              <h3>{monthData.month} meses antes</h3>
              <ul>
                {monthData.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} style={{
                    textDecoration: taskStates[task.name] === 'completada' ? 'line-through' : 'none', // Cambiar a tachado
                    color: taskStates[task.name] === 'en-progreso' ? 'green' : 'black'
                  }}>
                    {task.name}
                    <select onChange={(e) => {
                      console.log(`Tarea programada cambiada: ${task.name}, nuevo estado: ${e.target.value}`); // Log de cambio
                      updateTaskStatus(task.name, e.target.value);
                    }}>
                      <option value="no-completada">No Completada</option>
                      <option value="en-progreso">En Progreso</option>
                      <option value="completada">Completada</option>
                    </select>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No hay tareas programadas.</p>
        )}

        <ProgressBar 
          totalTasks={tasksByMonth.reduce((total, month) => total + month.tasks.length, 0)}
          completedTasks={Object.keys(taskStates).filter(task => taskStates[task] === 'completada').length}
        />
      </div>
    </div>
  );
}

export default Dashboard;
