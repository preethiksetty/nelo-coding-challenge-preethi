import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import EditModal from "./EditModal";
import useDebounce from "./useDebounce";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  // ADD
  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
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

  // OPEN EDIT MODAL
  const handleEdit = (task) => {
    setEditingTask(task);
  };

  // SAVE UPDATED TASK
  const handleSaveEdit = (updatedTask) => {
    setTasks(
      tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setEditingTask(null);
  };

  // FILTER + SEARCH
  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "All") return true;
      if (filter === "Completed") return t.completed;
      if (filter === "Pending") return !t.completed;
      if (filter === "High") return t.priority === "High";
      return true;
    })
    .filter((t) =>
      t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
        Task Manager
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginTop: "10px",
          marginBottom: "10px",
          width: "250px",
        }}
      />

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
        <button onClick={() => setFilter("High")}>High Priority</button>
      </div>

      <TaskForm onAdd={handleAddTask} />

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />

      {editingTask && (
        <EditModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
