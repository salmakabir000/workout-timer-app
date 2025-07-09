// usecounter.js custom hook
import { useState } from 'react';

export default function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount(prev => prev + 1);
  const reset = () => setCount(initial);

  return { count, increment, reset };
}
