import { render, screen } from '@testing-library/react';
import TimerDisplay from '../TimerDisplay';
import { WorkoutProvider } from '../WorkoutContext';
import { vi } from 'vitest';

const renderWithContext = (contextValue) => {
  return render(
    <WorkoutProvider value={contextValue}>
      <TimerDisplay />
    </WorkoutProvider>
  );
};

describe('TimerDisplay', () => {
  it('displays time left, current set, and completed sessions correctly', () => {
    const mockContext = {
      timeLeft: 45,
      currentSet: 2,
      sets: 5,
      completedSessions: 3,
      isRunning: false,
      setTask: vi.fn(),
      setDuration: vi.fn(),
      setRest: vi.fn(),
      setSets: vi.fn(),
      setEditingId: vi.fn(),
      setIsEditing: vi.fn(),
      handleStart: vi.fn(),
      handleReset: vi.fn(),
      setHistory: vi.fn(),
      task: '',
      duration: 0,
      rest: 0,
      history: [],
    };

    renderWithContext(mockContext);

    expect(screen.getByText(/time left/i)).toBeInTheDocument();
    expect(screen.getByText(/set/i)).toBeInTheDocument();
    expect(screen.getByText(/sessions completed/i)).toBeInTheDocument();
  });
});
