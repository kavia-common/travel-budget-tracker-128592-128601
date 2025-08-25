import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Trip Tracker brand', () => {
  render(<App />);
  const el = screen.getByText(/Trip Tracker/i);
  expect(el).toBeInTheDocument();
});
