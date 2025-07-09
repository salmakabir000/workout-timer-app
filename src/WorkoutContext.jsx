// WorkoutContext
import { createContext, useContext, useState, useRef, useEffect } from 'react';
import useCounter from './useCounter';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [task, setTask] = useState('');
  const [duration, setDuration] = useState(0);
  const [rest, setRest] = useState(0);
  const [sets, setSets] = useState(0);
  const [currentSet, setCurrentSet] = useState(1); // ✅ Start from 1
  const [phase, setPhase] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { count, increment } = useCounter(0);

  const dingAudio = useRef(new Audio('/ding.wav'));

  // ✅ Fetch history when app loads
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('http://localhost:3001/workouts');
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error('❌ Failed to fetch history:', err);
      }
    };
    fetchHistory();
  }, []);

  // ✅ Timer logic
  useEffect(() => {
    let timer;

    const handleTimer = async () => {
      if (isRunning && timeLeft > 0) {
        timer = setTimeout(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      } else if (isRunning && timeLeft === 0) {
        dingAudio.current.play();

        if (phase === 'focus') {
          setPhase('rest');
          setTimeLeft(rest);
        } else {
          if (currentSet < sets) {
            setCurrentSet(prev => prev + 1);
            setPhase('focus');
            setTimeLeft(duration);
          } else {
            // ✅ Workout complete
            const completedSession = { task, sets, duration, rest };

            try {
              const res = await fetch('http://localhost:3001/workouts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(completedSession)
              });

              const savedWorkout = await res.json();
              setHistory(prev => [...prev, savedWorkout]);

              alert(`✅ Workout Complete for "${task}"!`);

              increment();
              resetSession();
            } catch (err) {
              console.error('❌ Failed to save workout session:', err);
            }
          }
        }
      }
    };

    handleTimer();
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, phase]);

  // ✅ When phase changes, restart timer
  useEffect(() => {
    if (!isRunning) return;
    setTimeLeft(phase === 'focus' ? duration : rest);
  }, [phase, duration, rest, isRunning]);

  const resetSession = () => {
    setIsRunning(false);
    setPhase('focus');
    setCurrentSet(1);
  };

  const handleStart = () => {
    if (!task || duration <= 0 || sets <= 0 || rest < 0) {
      alert("Please fill all fields correctly!");
      return;
    }

    setTimeLeft(duration);
    setCurrentSet(1);
    setIsRunning(true);
  };

  const handleReset = () => {
    setTask('');
    setDuration(0);
    setRest(0);
    setSets(0);
    resetSession();
  };

  return (
    <WorkoutContext.Provider value={{
      task, setTask,
      duration, setDuration,
      rest, setRest,
      sets, setSets,
      currentSet,
      phase,
      timeLeft,
      isRunning,
      history, setHistory,
      count,
      isEditing, setIsEditing,
      editingId, setEditingId,
      handleStart,
      handleReset
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => useContext(WorkoutContext);
