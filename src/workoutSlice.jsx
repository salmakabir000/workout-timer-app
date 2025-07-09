// src/workoutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  task: '',
  duration: 0,
  rest: 0,
  sets: 0,
  currentSet: 0,
  phase: 'focus',
  timeLeft: 0,
  isRunning: false,
  history: [],
  count: 0
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setTask: (state, action) => { state.task = action.payload; },
    setDuration: (state, action) => { state.duration = action.payload; },
    setRest: (state, action) => { state.rest = action.payload; },
    setSets: (state, action) => { state.sets = action.payload; },
    setTimeLeft: (state, action) => { state.timeLeft = action.payload; },
    setIsRunning: (state, action) => { state.isRunning = action.payload; },
    setPhase: (state, action) => { state.phase = action.payload; },
    setCurrentSet: (state, action) => { state.currentSet = action.payload; },
    incrementSet: (state) => { state.currentSet += 1; },
    incrementCount: (state) => { state.count += 1; },
    resetSession: (state) => {
      state.isRunning = false;
      state.phase = 'focus';
      state.currentSet = 1;
    },
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  }
});

export const {
  setTask, setDuration, setRest, setSets,
  setTimeLeft, setIsRunning, setPhase, setCurrentSet,
  incrementSet, incrementCount, resetSession,
  addToHistory, setHistory
} = workoutSlice.actions;

export default workoutSlice.reducer;
