import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { COLOR_GREEN } from '../../styles/colors';
import { Scores } from '../../types/scoreTypes';
import LeaderBoard from './LeaderBoard';

describe('LeaderBoard component', () => {
  afterEach(() => {
    cleanup();
  });

  const mockScoresData: Scores = [
    {
      id: '1',
      playerName: 'Player 1',
      scoreValue: 100,
      isCurrentGameScore: false,
    },
    {
      id: '2',
      playerName: 'Player 2',
      scoreValue: 200,
      isCurrentGameScore: true,
    },
    {
      id: '3',
      playerName: 'Player 3',
      scoreValue: 150,
      isCurrentGameScore: false,
    },
  ];

  it('should render the leaderboard table', () => {
    render(<LeaderBoard scoresData={mockScoresData} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('should display the correct table headers', () => {
    render(<LeaderBoard scoresData={mockScoresData} />);

    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveTextContent('Ranking');
    expect(headers[1]).toHaveTextContent('Name');
    expect(headers[2]).toHaveTextContent('Score');
  });

  it('should render the correct number of rows based on the scoresData', () => {
    render(<LeaderBoard scoresData={mockScoresData} />);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockScoresData.length + 1); // Includes the header row
  });

  it('should display the correct data for each row', () => {
    render(<LeaderBoard scoresData={mockScoresData} />);

    mockScoresData.forEach((scoreData, index) => {
      const rankingCell = screen.getByText((index + 1).toString());
      const nameCell = screen.getByText(scoreData.playerName);
      const scoreCell = screen.getByText(scoreData.scoreValue.toString());

      expect(rankingCell).toBeInTheDocument();
      expect(nameCell).toBeInTheDocument();
      expect(scoreCell).toBeInTheDocument();
    });
  });

  it('should apply a different border color for the current game score', () => {
    render(<LeaderBoard scoresData={mockScoresData} />);

    const currentGameRow = screen.getByText('Player 2'); // Player 2 is the player with `isCurrentGameScore: true` in mockScoresData
    expect(currentGameRow).toBeInTheDocument();

    const parentCell = currentGameRow.closest('td');
    expect(parentCell).toHaveStyle(`border: 2px solid ${COLOR_GREEN}`);
  });
});
