import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './workoutSlice';
import themeReducer from './themeSlice'; // 💡 Add this

const store = configureStore({
  reducer: {
    workout: workoutReducer,
    theme: themeReducer, // 💡 Register theme slice
  },
});

export default store;
