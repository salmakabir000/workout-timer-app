//React Hooks: UseState, UseEffect, UseRef, Custom Hook
//Asynchronous react: JSON, Form Data, Promises, Async/Await
//React State Management: Context API & Redux toolkit

import WorkoutForm from './WorkoutForm';
import TimerDisplay from './TimerDisplay';
import HistoryList from './HistoryList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toggleTheme } from './themeSlice';
import './style.css';

const App = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);

  useEffect(() => {
  document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);


  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <div className="left-column">
        <button onClick={() => dispatch(toggleTheme())}>
          {darkMode ? '🌞 Light Mode' : '🌚 Dark Mode'}
        </button>

        <h1>🏋️‍♀️ Workout Timer</h1>
        <WorkoutForm />
      </div>

      <div className="right-column">
        <TimerDisplay />
        <HistoryList />
      </div>
    </div>
  );

};

export default App;
