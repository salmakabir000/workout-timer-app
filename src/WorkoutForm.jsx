import { useRef, useEffect } from 'react';
import { useWorkoutContext } from './WorkoutContext';

const WorkoutForm = () => {
  const {
    task, setTask,
    duration, setDuration,
    rest, setRest,
    sets, setSets,
    isRunning,
    isEditing, setIsEditing,
    editingId, setEditingId,
    handleStart,
    handleReset,
    history, setHistory
  } = useWorkoutContext();

  const inputRef = useRef(null);
  const formRef = useRef(null);


  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // ✅ Update an existing workout
  const handleUpdate = async () => {
    if (!task || duration <= 0 || sets <= 0 || rest < 0) {
      return alert("Please fill all fields correctly!");
    }

    const updatedWorkout = { task, duration, rest, sets };

    try {
      const res = await fetch(`http://localhost:3001/workouts/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWorkout)
      });

      const data = await res.json();

      // Update local history state
      const updatedHistory = history.map(item =>
        item.id === editingId ? data : item
      );
      setHistory(updatedHistory);

      // Reset form
      setTask('');
      setDuration(0);
      setRest(0);
      setSets(0);
      setEditingId(null);
      setIsEditing(false);
      alert("✅ Workout updated successfully!");
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  // Cancel editing and reset form
  const handleCancelEdit = () => {
    setTask('');
    setDuration(0);
    setRest(0);
    setSets(0);
    setEditingId(null);
    setIsEditing(false);
  };

  return (
    <>
    <div ref={formRef}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter workout name (e.g., Plank)"
        value={task}
        onChange={e => setTask(e.target.value)}
        disabled={isRunning}
      />
      <br /><br />

      <label>⏱ Duration per Set (seconds):</label>
      <input
        type="number"
        value={duration}
        onChange={e => setDuration(Number(e.target.value))}
        disabled={isRunning}
      />
      <br /><br />

      <label>💤 Rest between Sets (seconds):</label>
      <input
        type="number"
        value={rest}
        onChange={e => setRest(Number(e.target.value))}
        disabled={isRunning}
      />
      <br /><br />

      <label>🔁 Number of Sets:</label>
      <input
        type="number"
        value={sets}
        onChange={e => setSets(Number(e.target.value))}
        disabled={isRunning}
      />

      <div style={{ margin: '1rem 0' }}>
        {isEditing ? (
          <>
            <button onClick={handleUpdate}>Update Workout</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleStart} disabled={isRunning}>Start</button>
            <button onClick={handleReset}>Reset</button>
          </>
        )}
      </div>
      </div>
    </>
  );
};

export default WorkoutForm;
