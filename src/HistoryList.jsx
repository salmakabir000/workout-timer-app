// HistoryList.js
import { useWorkoutContext } from './WorkoutContext';

const HistoryList = () => {
  const {
    history,
    setHistory,
    setTask,
    setDuration,
    setRest,
    setSets,
    setEditingId,
    setIsEditing,
    isRunning
  } = useWorkoutContext();

  const handleEdit = (item) => {
    // Pre-fill form with selected workout values
    setTask(item.task);
    setDuration(item.duration);
    setRest(item.rest);
    setSets(item.sets);
    setEditingId(item.id);
    setIsEditing(true);

      // 👇 scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
  };

  const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this workout?");
  if (!confirm) return;

  try {
    await fetch(`http://localhost:3001/workouts/${id}`, {
      method: 'DELETE'
    });

    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
  } catch (err) {
    console.error("❌ Failed to delete workout:", err);
  }
};


  return (
    <>
      <h2>📜 Workout History</h2>
      <ul>
        {history.map(item => (
          <li key={item.id} className="history-item">
            <span className="history-text">
            {item.task} — {item.sets} sets of {item.duration}s with {item.rest}s rest
            </span>
            {!isRunning && (
              <div className="history-actions">
                <button onClick={() => handleEdit(item)} className="edit-btn">✏️</button>
                <button onClick={() => handleDelete(item.id)} className="delete-btn">🗑️</button>
                </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default HistoryList;
