import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import EditModal from "./EditModal";
import useDebounce from "./useDebounce";
import Login from "./Login";

export default function App() {
  // LOGIN SESSION
  const [loggedIn, setLoggedIn] = useState(false);

  // TASK STATES
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // FILTER + SEARCH
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  // CHECK SESSION
  useEffect(() => {
    const s = sessionStorage.getItem("loggedIn");
    if (s === "true") setLoggedIn(true);
  }, []);

  // ADD TASK
  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  // DELETE TASK
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

  // SAVE EDITED TASK
  const handleSaveEdit = (updatedTask) => {
    setTasks(
      tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      )
    );
    setEditingTask(null);
  };

  // FILTER + SEARCH PIPELINE
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

  // LOGOUT
  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  // EMAIL AUTOMATION (every 20 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      const pending = tasks.filter((t) => !t.completed);

      if (pending.length > 0) {
        console.log("📧 Email Reminder:");
        pending.forEach((t) => {
          console.log(`Reminder: "${t.title}" is still pending.`);
        });
      }
    }, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  // SHOW LOGIN SCREEN IF NOT LOGGED IN
  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: "24px" }}>Task Manager</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* SEARCH */}
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

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
        <button onClick={() => setFilter("High")}>High Priority</button>
      </div>

      {/* CREATE TASK */}
      <TaskForm onAdd={handleAddTask} />

      {/* TASK LIST */}
      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />

      {/* EDIT MODAL */}
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
