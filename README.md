🏋️‍♀️ Workout Timer App

A simple, interactive Workout Timer built with React, demonstrating hooks, context, state management, and asynchronous operations. Perfect for timing exercises with multiple sets, rest periods, and keeping a history of workouts.

🚀 Features

Start/Reset Workout – Track focus and rest periods for each set.

Workout History – View all completed workouts, edit, or delete them.

Custom Timer – Set duration per set, rest time, and number of sets.

Theme Toggle – Switch between light and dark modes.

Audio Alerts – Ding sound when a timer finishes a set or session.

React Best Practices –

Hooks: useState, useEffect, useRef

Context API: Global state management

Custom Hook: useCounter for tracking completed sessions

Async/Await: Fetch and update workout history with a backend (JSON server)

🛠️ Technologies Used

React (Functional Components & Hooks)

React Context API for state management

Redux Toolkit for theme management

CSS for styling (with dark mode support)

JSON Server for backend API simulation

🖥️ Screenshots

(Optional: Add a few screenshots of the app in light/dark mode or running a workout session)

📦 Installation

Clone the repo

git clone https://github.com/yourusername/workout-timer.git
cd workout-timer


Install dependencies

npm install


Start JSON server (for workouts backend)

npx json-server --watch workout-db.json --port 3000


Start React app

npm start


Open http://localhost:3000 in your browser.

📝 Usage

Enter your Workout Name, Duration per Set, Rest Time, and Number of Sets.

Click Start to begin the timer.

The app will switch between focus and rest phases automatically.

After completing all sets, the workout is saved in the Workout History.

Edit or delete any workout from the history.

🧩 Folder Structure
src/
├── App.jsx             # Main app component
├── WorkoutForm.jsx     # Form for adding/editing workouts
├── TimerDisplay.jsx    # Displays timer and session info
├── HistoryList.jsx     # Displays workout history with edit/delete
├── WorkoutContext.jsx  # Context API for global state
├── useCounter.js       # Custom hook for counting completed sessions
├── themeSlice.js       # Redux slice for dark/light mode
├── style.css           # Styling

⚡ How It Works

Workout Timer

Uses setTimeout in a useEffect to countdown focus/rest phases.

Plays a ding sound at the end of each phase.

Workout History

Fetches workouts from a JSON backend on app load.

Supports edit and delete operations with PUT and DELETE requests.

Theme Management

Uses Redux Toolkit to toggle between light and dark modes.

💡 Future Enhancements

Add multiple timers for different workouts.

Mobile-friendly design.

User authentication to save history online.

Option to customize sounds for focus/rest.
