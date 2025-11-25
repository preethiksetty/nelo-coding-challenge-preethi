export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return <p style={{ marginTop: "20px" }}>No tasks added yet.</p>;
  }

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "12px",
            background: "#fafafa",
          }}
        >
          <h3 style={{ marginBottom: "6px" }}>{task.title}</h3>

          {task.description && (
            <p style={{ marginBottom: "6px", color: "#555" }}>
              {task.description}
            </p>
          )}

          <div style={{ fontSize: "14px", marginBottom: "4px" }}>
            <strong>Priority:</strong> {task.priority}
          </div>

          <div style={{ fontSize: "14px", marginBottom: "4px" }}>
            <strong>Due:</strong> {task.dueDate || "—"}
          </div>

          <div style={{ fontSize: "14px" }}>
            <strong>Status:</strong>{" "}
            {task.completed ? "Completed" : "Pending"}
          </div>

          {/* BUTTONS */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              style={styles.editBtn}
              onClick={() => onEdit(task)}
            >
              Edit
            </button>

            <button
              style={styles.deleteBtn}
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>

            <button
              style={styles.toggleBtn}
              onClick={() => onToggle(task.id)}
            >
              {task.completed ? "Mark Pending" : "Mark Complete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  editBtn: {
    padding: "6px 10px",
    background: "#facc15",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 10px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  toggleBtn: {
    padding: "6px 10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
