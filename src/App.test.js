import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders scouting report page with initial card', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /scouting report/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /lincoln riley/i })).toBeInTheDocument();
  expect(screen.getByText('Head Coach')).toBeInTheDocument();
  expect(screen.getByText('USC Trojans')).toBeInTheDocument();
  expect(screen.getByText('The Report')).toBeInTheDocument();
  expect(screen.getByText('CARD 2/4')).toBeInTheDocument();
});

test('navigates to next card when next button is clicked', () => {
  render(<App />);
  const nextButton = screen.getByRole('button', { name: /next card: jayden maiava/i });
  expect(nextButton).toBeInTheDocument();

  fireEvent.click(nextButton);

  expect(screen.getByRole('heading', { level: 2, name: /jayden maiava/i })).toBeInTheDocument();
  expect(screen.getByText('Quarterback')).toBeInTheDocument();
  expect(screen.getByText('CARD 3/4')).toBeInTheDocument();
});

test('navigates to previous card when previous button is clicked', () => {
  render(<App />);
  const prevButton = screen.getByRole('button', { name: /previous card: sammy omosigho/i });
  expect(prevButton).toBeInTheDocument();

  fireEvent.click(prevButton);

  expect(screen.getByRole('heading', { level: 2, name: /sammy omosigho/i })).toBeInTheDocument();
  expect(screen.getByText('Linebacker')).toBeInTheDocument();
  expect(screen.getByText('CARD 1/4')).toBeInTheDocument();
});

test('supports arrow key navigation', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 2, name: /lincoln riley/i })).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByRole('heading', { level: 2, name: /jayden maiava/i })).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(screen.getByRole('heading', { level: 2, name: /lincoln riley/i })).toBeInTheDocument();
});
