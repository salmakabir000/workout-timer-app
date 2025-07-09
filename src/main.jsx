import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { WorkoutProvider } from './WorkoutContext.jsx'; // 🧠 Context API
import { Provider } from 'react-redux'; // 🧠 Redux
import store from './store.jsx';         // 🧠 Your Redux store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* ✅ Wrap Redux first */}
      <WorkoutProvider>     {/* ✅ Then Context */}
        <App />
      </WorkoutProvider>
    </Provider>
  </StrictMode>
);
