import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // ADD
  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  // TOGGLE COMPLETE
  const handleToggle = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // EDIT — later we will implement update form
  const handleEdit = (task) => {
    alert("Edit feature coming in next step!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
        Task Manager
      </h1>

      <TaskForm onAdd={handleAddTask} />

      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
}
