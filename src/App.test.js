import { render, screen, act } from '@testing-library/react';
import App from './App';

// jsdom doesn't implement scrolling.
beforeAll(() => {
  window.scrollTo = jest.fn();
});

const renderAt = (hash) => {
  window.location.hash = hash;
  return render(<App />);
};

test.each(['', '#/', '#/players/not-a-player'])('hash %p renders the draft board', (hash) => {
  renderAt(hash);
  expect(screen.getByText(/rivalry draft/i)).toBeInTheDocument();
  expect(screen.queryByText(/back to draft/i)).not.toBeInTheDocument();
});

test('press start goes to Bob Chesney', () => {
  renderAt('#/');
  expect(screen.getByText(/press start/i).closest('a')).toHaveAttribute('href', '#/players/bob-chesney');
});

test('every draft card is a single link to its report', () => {
  renderAt('#/');
  const card = screen.getByRole('link', { name: /open scouting report: luke wafle/i });
  expect(card).toHaveAttribute('href', '#/players/luke-wafle');
  expect(card).toContainElement(screen.getByText('Luke Wafle'));
  expect(screen.getAllByRole('link', { name: /open scouting report/i })).toHaveLength(10);
});

test.each([
  ['#/players/luke-wafle', 'Card 10/10', '#/players/trent-mosley', '#/players/bob-chesney'],
  ['#/players/bob-chesney', 'Card 1/10', '#/players/luke-wafle', '#/players/ty-dieffenbach'],
])('%s pager wraps around', (hash, count, prevHref, nextHref) => {
  renderAt(hash);
  expect(screen.getByText(count)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /previous report/i })).toHaveAttribute('href', prevHref);
  expect(screen.getByRole('link', { name: /next report/i })).toHaveAttribute('href', nextHref);
  expect(screen.getByText(/back to draft/i).closest('a')).toHaveAttribute('href', '#/');
});

test('hash changes switch pages without reloading', () => {
  renderAt('#/');
  act(() => {
    window.location.hash = '#/players/king-miller';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
  expect(screen.getByRole('heading', { level: 1, name: 'King Miller' })).toBeInTheDocument();
});
