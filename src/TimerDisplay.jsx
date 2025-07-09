// TimerDisplay
import { useWorkoutContext } from './WorkoutContext';

const TimerDisplay = () => {
  const {
    timeLeft,
    currentSet,
    sets,
    phase,
    count
  } = useWorkoutContext();

  return (
    <>
      <h2>{phase === 'focus' ? '🏃‍♀️ Focus Time' : '🛌 Rest Time'}</h2>
      <p>⏳ Time Left: {timeLeft} seconds</p>
      <p>✅ Set: {currentSet} / {sets}</p>
      <p>📈 Sessions Completed: {count}</p>
    </>
  );
};

export default TimerDisplay;