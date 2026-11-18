import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import ScoutingReportPage from './components/scouting/ScoutingReportPage';

const fixtureData = {
  headerTitle: 'Scouting Report Test',
  reportLabel: 'The Test Report',
  backButtonLabel: 'Back Test',
  cardCounterFormat: 'CARD {current}/{total}',
  cards: [
    {
      id: 'player-alpha',
      name: 'Alpha Player',
      role: 'Starter',
      teamName: 'Alpha Team',
      portraitImage: 'lincoln-riley.png',
      portraitAlt: 'Alpha portrait',
      portraitBackgroundColor: '#d14c2d',
      stats: [
        { label: 'CLASS', value: 'FR' },
        { label: 'HOMETOWN', value: 'Los Angeles, CA' }
      ],
      report: ['Alpha report paragraph one.', 'Alpha report paragraph two.']
    },
    {
      id: 'player-beta',
      name: 'Beta Player',
      role: 'Reserve',
      teamName: 'Beta Team',
      portraitImage: 'lincoln-riley.png',
      portraitAlt: 'Beta portrait',
      portraitBackgroundColor: '#005587',
      stats: [
        { label: 'ROLE', value: 'Specialist' }
      ],
      report: ['Beta report paragraph.']
    }
  ]
};

test('renders App smoke test with default data without crashing', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});

test('renders initial card from fixture data', () => {
  render(<ScoutingReportPage data={fixtureData} />);
  expect(screen.getByRole('heading', { level: 1, name: /scouting report test/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /alpha player/i })).toBeInTheDocument();
  expect(screen.getByText('Starter')).toBeInTheDocument();
  expect(screen.getByText('Alpha Team')).toBeInTheDocument();
  expect(screen.getByText('The Test Report')).toBeInTheDocument();
  expect(screen.getByText('CARD 1/2')).toBeInTheDocument();
  expect(screen.getByText('Alpha report paragraph one.')).toBeInTheDocument();
  expect(screen.getByText('Los Angeles, CA')).toBeInTheDocument();
});

test('navigates to next card using fixture data', () => {
  render(<ScoutingReportPage data={fixtureData} />);
  const nextButton = screen.getByRole('button', { name: /next card: beta player/i });
  expect(nextButton).toBeInTheDocument();

  fireEvent.click(nextButton);

  expect(screen.getByRole('heading', { level: 2, name: /beta player/i })).toBeInTheDocument();
  expect(screen.getByText('Reserve')).toBeInTheDocument();
  expect(screen.getByText('CARD 2/2')).toBeInTheDocument();
});

test('navigates to previous card (wraps around) using fixture data', () => {
  render(<ScoutingReportPage data={fixtureData} />);
  const prevButton = screen.getByRole('button', { name: /previous card: beta player/i });
  expect(prevButton).toBeInTheDocument();

  fireEvent.click(prevButton);

  expect(screen.getByRole('heading', { level: 2, name: /beta player/i })).toBeInTheDocument();
  expect(screen.getByText('CARD 2/2')).toBeInTheDocument();
});

test('supports arrow key navigation on fixture data', () => {
  render(<ScoutingReportPage data={fixtureData} />);
  expect(screen.getByRole('heading', { level: 2, name: /alpha player/i })).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(screen.getByRole('heading', { level: 2, name: /beta player/i })).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(screen.getByRole('heading', { level: 2, name: /alpha player/i })).toBeInTheDocument();
});

test('handles empty report gracefully without rendering filler text', () => {
  const noReportData = {
    ...fixtureData,
    cards: [{ ...fixtureData.cards[0], report: [] }]
  };
  render(<ScoutingReportPage data={noReportData} />);
  expect(screen.queryByText(/the test report/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/lorem/i)).not.toBeInTheDocument();
});
