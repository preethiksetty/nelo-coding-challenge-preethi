export default function EditModal({ task, onClose, onSave }) {
  if (!task) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={{ marginBottom: "10px" }}>Edit Task</h3>

        <input
          id="edit-title"
          defaultValue={task.title}
          style={styles.input}
        />

        <textarea
          id="edit-description"
          defaultValue={task.description}
          style={styles.textarea}
        />

        <select id="edit-priority" defaultValue={task.priority} style={styles.select}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          id="edit-date"
          defaultValue={task.dueDate}
          style={styles.input}
        />

        <div style={styles.btnRow}>
          <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>

          <button
            onClick={() => {
              const updatedTask = {
                ...task,
                title: document.getElementById("edit-title").value,
                description: document.getElementById("edit-description").value,
                priority: document.getElementById("edit-priority").value,
                dueDate: document.getElementById("edit-date").value,
              };
              onSave(updatedTask);
            }}
            style={styles.saveBtn}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    right: 0, bottom: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "8px",
    minHeight: "60px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  btnRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "10px",
  },
  cancelBtn: {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "1px solid #aaa",
    background: "#f1f1f1",
    cursor: "pointer",
  },
  saveBtn: {
    padding: "8px 12px",
    borderRadius: "4px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
