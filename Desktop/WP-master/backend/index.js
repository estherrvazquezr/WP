const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const path = require('path');
const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'Wedding_Planner_Tasks.xlsx');

const getTasksByMonth = (weddingDate) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const tasksData = xlsx.utils.sheet_to_json(sheet);

  const weddingDateObj = new Date(weddingDate);
  const currentDate = new Date();
  const monthsUntilWedding = Math.max(1, Math.ceil((weddingDateObj - currentDate) / (1000 * 60 * 60 * 24 * 30)));

  const tasksByMonth = [];
  const overdueTasks = []; // Tareas que deberían haberse completado antes del primer mes disponible

  tasksData.forEach((task) => {
    let monthsBefore = task["Mes Antes de la Boda"];
    if (monthsBefore > monthsUntilWedding) {
      overdueTasks.push({ name: task["Tarea"], description: task["Descripción"], status: "No completado" });
    } else {
      const taskDate = new Date(weddingDateObj);
      taskDate.setMonth(taskDate.getMonth() - monthsBefore);
      const formattedDate = taskDate.toISOString().split('T')[0];

      const monthData = tasksByMonth.find((item) => item.month === monthsBefore);
      if (monthData) {
        monthData.tasks.push({ name: task["Tarea"], description: task["Descripción"], date: formattedDate, status: "No completado" });
      } else {
        tasksByMonth.push({ month: monthsBefore, tasks: [{ name: task["Tarea"], description: task["Descripción"], date: formattedDate, status: "No completado" }] });
      }
    }
  });

  tasksByMonth.sort((a, b) => b.month - a.month);

  return { tasksByMonth, overdueTasks };
};

app.get('/api/tasks', (req, res) => {
  const { weddingDate } = req.query;
  if (!weddingDate) {
    return res.status(400).json({ error: "Fecha de boda no proporcionada" });
  }
  const { tasksByMonth, overdueTasks } = getTasksByMonth(weddingDate);
  res.json({ tasksByMonth, overdueTasks });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
