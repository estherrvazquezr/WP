import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ProgressBar from './ProgressBar';
import TaskList from './TaskList';
import './Dashboard.css';

function Dashboard() {
  const [weddingDate, setWeddingDate] = useState(null);
  const [tasksByMonth, setTasksByMonth] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [notCompletedTasks, setNotCompletedTasks] = useState([]);

  const fetchTasks = () => {
    if (!weddingDate) return; // No fetch if no wedding date

    fetch(`http://localhost:5500/api/tasks?weddingDate=${weddingDate}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener tareas');
        }
        return response.json();
      })
      .then(data => {
        setTasksByMonth(data.tasksByMonth || []);
        setOverdueTasks(data.overdueTasks || []);
        setCompletedTasks([]);
        setInProgressTasks([]);
        setNotCompletedTasks([]);
      })
      .catch(error => console.error('Error al obtener tareas:', error));
  };

  useEffect(() => {
    fetchTasks();
  }, [weddingDate]);

  const updateTaskStatus = (taskName, newStatus) => {
    if (newStatus === "Completado") {
      setCompletedTasks((prev) => [...prev, taskName]);
      setNotCompletedTasks((prev) => prev.filter((task) => task !== taskName));
    } else if (newStatus === "En progreso") {
      setInProgressTasks((prev) => [...prev, taskName]);
      setNotCompletedTasks((prev) => prev.filter((task) => task !== taskName));
    } else {
      setNotCompletedTasks((prev) => [...prev, taskName]);
      setCompletedTasks((prev) => prev.filter((task) => task !== taskName));
      setInProgressTasks((prev) => prev.filter((task) => task !== taskName));
    }
  };

  return (
    <div className="dashboard">
      <Sidebar 
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
        notCompletedTasks={notCompletedTasks}
        updateTaskStatus={updateTaskStatus}
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

        <ProgressBar 
          totalTasks={tasksByMonth.reduce((total, month) => total + month.tasks.length, 0)}
          completedTasks={completedTasks.length}
        />

        <TaskList 
          tasksByMonth={tasksByMonth}
          updateTaskStatus={updateTaskStatus}
        />
      </div>
    </div>
  );
}

export default Dashboard;
