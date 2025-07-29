// Importing render, screen, and fireEvent utilities from React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';

// Importing the main App component to test
import App from '../App';

// Importing Redux Provider to wrap the App so Redux works correctly during tests
import { Provider } from 'react-redux';

// Importing the Redux store
import store from '../store';

// Importing WorkoutProvider to provide context during tests
import { WorkoutProvider } from '../WorkoutContext';

// A helper function to wrap the App with both Redux and Context providers for every test
const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      <WorkoutProvider>{ui}</WorkoutProvider>
    </Provider>
  );
};

// Grouping all tests under 'Workout Timer App'
describe('Workout Timer App', () => {

  // Test 1: Checks if the Start button appears when app loads
  it('renders Start button', () => {
    renderWithProviders(<App />); // Render App wrapped with providers
    expect(screen.getByText(/start/i)).toBeInTheDocument(); // Look for the Start button and confirm it's present
  });

  // Test 2: Inputs should be disabled after clicking Start
  it('disables inputs after clicking Start', () => {
    renderWithProviders(<App />);

    // Simulate typing into the input fields
    fireEvent.change(screen.getByPlaceholderText(/enter workout name/i), { target: { value: 'Plank' } });
    fireEvent.change(screen.getByLabelText(/duration per set/i), { target: { value: 30 } });
    fireEvent.change(screen.getByLabelText(/rest between sets/i), { target: { value: 10 } });
    fireEvent.change(screen.getByLabelText(/number of sets/i), { target: { value: 3 } });

    // Click the Start button
    const startButton = screen.getByText(/start/i);
    fireEvent.click(startButton);

    // Assert that the inputs are disabled after clicking Start
    expect(screen.getByPlaceholderText(/enter workout name/i)).toBeDisabled();
    expect(screen.getByLabelText(/duration per set/i)).toBeDisabled();
    expect(screen.getByLabelText(/rest between sets/i)).toBeDisabled();
    expect(screen.getByLabelText(/number of sets/i)).toBeDisabled();
  });

  // Test 3: Fields should reset when Reset button is clicked
  it('clears input fields on Reset', () => {
    renderWithProviders(<App />);

    // Simulate filling out the form
    fireEvent.change(screen.getByPlaceholderText(/enter workout name/i), { target: { value: 'Push Up' } });
    fireEvent.change(screen.getByLabelText(/duration per set/i), { target: { value: 20 } });
    fireEvent.change(screen.getByLabelText(/rest between sets/i), { target: { value: 15 } });
    fireEvent.change(screen.getByLabelText(/number of sets/i), { target: { value: 4 } });

    // Click Reset button
    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);

    // Assert that all fields are cleared (reset to empty string or zero)
    expect(screen.getByPlaceholderText(/enter workout name/i).value).toBe('');
    expect(screen.getByLabelText(/duration per set/i).value).toBe('0');
    expect(screen.getByLabelText(/rest between sets/i).value).toBe('0');
    expect(screen.getByLabelText(/number of sets/i).value).toBe('0');
  });

  // Optional: Placeholder for Update Workout logic test
  it('shows Update Workout button in editing mode (if applicable)', () => {
    renderWithProviders(<App />);

    // This is a placeholder test because simulating "edit mode" requires mocking context.
    // For now, we confirm the Update Workout button does NOT show unless in edit mode.
    expect(screen.queryByText(/update workout/i)).not.toBeInTheDocument();
  });
});
