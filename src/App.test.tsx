import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search box', () => {
  render(<App />);
  const searchBoxPlaceHolderText = screen.getByPlaceholderText(/Search by products name.../i);
  expect(searchBoxPlaceHolderText).toBeInTheDocument();
});
