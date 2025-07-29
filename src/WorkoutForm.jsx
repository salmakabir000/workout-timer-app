//WorkoutForm
import { useRef, useEffect } from 'react';
import { useWorkoutContext } from './WorkoutContext';

const WorkoutForm = () => {
  // Destructuring state and handlers from Workout Context
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

  // Refs for focusing inputs and form container
  const inputRef = useRef(null);
  const formRef = useRef(null);

  // Auto-focus on the task input field on first render
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Handle updating an existing workout
  const handleUpdate = async () => {
    if (!task || duration <= 0 || sets <= 0 || rest < 0) {
      return alert("Please fill all fields correctly!");
    }

    const updatedWorkout = { task, duration, rest, sets };

    try {
      const res = await fetch(`http://localhost:3000/workouts/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWorkout)
      });

      const data = await res.json();

      // Update the history state with the new workout data
      const updatedHistory = history.map(item =>
        item.id === editingId ? data : item
      );
      setHistory(updatedHistory);

      // Reset form to defaults
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

  // Cancel edit mode and reset the form
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
        {/* Workout task input */}
        <label htmlFor="task">Workout Name</label>
        <input
          id="task"
          ref={inputRef}
          type="text"
          placeholder="Enter workout name (e.g., Plank)"
          value={task}
          onChange={e => setTask(e.target.value)}
          disabled={isRunning}
        />
        <br /><br />

        {/* Duration input with associated label */}
        <label htmlFor="duration">⏱ Duration per Set (seconds):</label>
        <input
          id="duration"
          type="number"
          value={duration === 0 ? '' : duration}
          placeholder='0'
          onChange={e => {
            const value = e.target.value;
            setDuration(value === '' ? 0 : Math.max(1, Number(value)));
            }}
          disabled={isRunning}
        />
        <br /><br />

        {/* Rest input with associated label */}
        <label htmlFor="rest">💤 Rest between Sets (seconds):</label>
        <input
          id="rest"
          type="number"
          value={rest === 0 ? '' : rest}
          placeholder='0'
          onChange={e => {
            const value = e.target.value;
            setRest(value === '' ? 0 : Math.max(1, Number(e.target.value)))
          }}
          disabled={isRunning}
        />
        <br /><br />

        {/* Sets input with associated label */}
        <label htmlFor="sets">🔁 Number of Sets:</label>
        <input
          id="sets"
          type="number"
          value={sets === 0 ? '' : sets}
          placeholder='0'
          onChange={e => {
            const value = e.target.value;
            setSets(value === '' ? 0 : Math.max(1, Number(e.target.value)))
          }}
          disabled={isRunning}
        />

        {/* Action Buttons */}
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
