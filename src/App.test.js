import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CircleCI Demo heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/CircleCI Demo Application/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders success message', () => {
  render(<App />);
  const messageElement = screen.getByText(/Successfully deployed using CircleCI/i);
  expect(messageElement).toBeInTheDocument();
});
