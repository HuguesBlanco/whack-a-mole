import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { COLOR_GREEN, COLOR_WHITE, COLOR_YELLOW } from '../../styles/colors';
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

  it('should render the leaderboard with the correct number of players', () => {
    render(<LeaderBoard scoresData={mockScoresData} />);

    const playerElements = screen.getAllByText(/Player \d/);
    expect(playerElements).toHaveLength(mockScoresData.length);
  });

  it('should display the correct ranking for each player', () => {
    render(<LeaderBoard scoresData={mockScoresData} />);

    mockScoresData.forEach((_, index) => {
      const rankingText = (index + 1).toString();
      expect(screen.getByText(rankingText)).toBeInTheDocument();
    });
  });

  it('should display the correct player names and scores', () => {
    render(<LeaderBoard scoresData={mockScoresData} />);

    mockScoresData.forEach((scoreData) => {
      expect(screen.getByText(scoreData.playerName)).toBeInTheDocument();
      expect(
        screen.getByText(scoreData.scoreValue.toString()),
      ).toBeInTheDocument();
    });
  });

  it('should apply a green background to the current game score when not saved', () => {
    render(
      <LeaderBoard scoresData={mockScoresData} isCurrentScoreSaved={false} />,
    );

    const currentGameElement = screen.getByText('Player 2').parentElement;
    expect(currentGameElement).toHaveStyle(`background-color: ${COLOR_GREEN}`);
  });

  it('should apply a yellow background to the current game score when saved', () => {
    render(
      <LeaderBoard scoresData={mockScoresData} isCurrentScoreSaved={true} />,
    );

    const currentGameElement = screen.getByText('Player 2').parentElement;
    expect(currentGameElement).toHaveStyle(`background-color: ${COLOR_YELLOW}`);
  });

  it('should apply a white background to non-current game scores', () => {
    render(<LeaderBoard scoresData={mockScoresData} />);

    mockScoresData.forEach((scoreData) => {
      if (scoreData.isCurrentGameScore !== true) {
        const playerElement = screen.getByText(
          scoreData.playerName,
        ).parentElement;
        expect(playerElement).toHaveStyle(`background-color: ${COLOR_WHITE}`);
      }
    });
  });
});
