export default function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return <p style={{ marginTop: "20px" }}>No tasks found.</p>;
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
          <h3>{task.title}</h3>

          {task.description && (
            <p style={{ color: "#555" }}>{task.description}</p>
          )}

          <p style={{ fontSize: "14px" }}>
            <strong>Priority:</strong> {task.priority}
          </p>

          <p style={{ fontSize: "14px" }}>
            <strong>Due Date:</strong> {task.dueDate || "—"}
          </p>

          <p style={{ fontSize: "14px" }}>
            <strong>Status:</strong>{" "}
            {task.completed ? "Completed" : "Pending"}
          </p>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "10px",
            }}
          >
            <button style={styles.editBtn} onClick={() => onEdit(task)}>
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
