import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Score, Scores } from '../../types/scoreTypes';
import ScoreTemplate from './ScoreTemplate';

describe('ScoreTemplate component', () => {
  afterEach(() => {
    cleanup();
  });

  const mockPreviousScores: Scores = [
    {
      id: '1',
      playerName: 'Alice',
      scoreValue: 300,
      isCurrentGameScore: false,
    },
    { id: '2', playerName: 'Bob', scoreValue: 250, isCurrentGameScore: false },
  ];

  const mockCurrentScore: Score = {
    id: '3',
    playerName: '',
    scoreValue: 200,
    isCurrentGameScore: true,
  };

  const mockSetPlayerName = vi.fn();
  const mockOnClickSaveCurrentScore = vi.fn();
  const mockOnClickPlayAgain = vi.fn();

  it('should display correct score data from previous games', () => {
    render(
      <ScoreTemplate
        displayedScores={mockPreviousScores}
        currentScore={mockCurrentScore}
        currentScoreRanking={3}
        setPlayerName={mockSetPlayerName}
        isCurrentScoreSaved={false}
        onClickSaveCurrentScore={mockOnClickSaveCurrentScore}
        onClickPlayAgain={mockOnClickPlayAgain}
      />,
    );

    // Pick random data from the leaderboard to be sure the good data are displayed.
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('300')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();
  });

  it('should display the current game info correctly', () => {
    const currentScoreRanking = 3;

    render(
      <ScoreTemplate
        displayedScores={mockPreviousScores}
        currentScore={mockCurrentScore}
        currentScoreRanking={currentScoreRanking}
        setPlayerName={mockSetPlayerName}
        isCurrentScoreSaved={false}
        onClickSaveCurrentScore={mockOnClickSaveCurrentScore}
        onClickPlayAgain={mockOnClickPlayAgain}
      />,
    );

    expect(screen.getByText(mockCurrentScore.scoreValue)).toBeInTheDocument();
    expect(
      screen.getByText(currentScoreRanking.toString()),
    ).toBeInTheDocument();
  });

  it('should call onClickSaveCurrentScore when the "Save score" button is clicked', () => {
    render(
      <ScoreTemplate
        displayedScores={mockPreviousScores}
        currentScore={mockCurrentScore}
        currentScoreRanking={3}
        setPlayerName={mockSetPlayerName}
        isCurrentScoreSaved={false}
        onClickSaveCurrentScore={mockOnClickSaveCurrentScore}
        onClickPlayAgain={mockOnClickPlayAgain}
      />,
    );

    const saveScoreButton = screen.getByRole('button', { name: 'Save score' });
    fireEvent.click(saveScoreButton);

    expect(mockOnClickSaveCurrentScore).toHaveBeenCalledTimes(1);
  });

  it('should display the "Save score" button, and "OR" text, only when the score is not saved', () => {
    const { rerender } = render(
      <ScoreTemplate
        displayedScores={mockPreviousScores}
        currentScore={mockCurrentScore}
        currentScoreRanking={3}
        setPlayerName={mockSetPlayerName}
        isCurrentScoreSaved={false}
        onClickSaveCurrentScore={mockOnClickSaveCurrentScore}
        onClickPlayAgain={mockOnClickPlayAgain}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Save score' }),
    ).toBeInTheDocument();
    expect(screen.getByText('OR')).toBeInTheDocument();

    rerender(
      <ScoreTemplate
        displayedScores={mockPreviousScores}
        currentScore={mockCurrentScore}
        currentScoreRanking={3}
        setPlayerName={mockSetPlayerName}
        isCurrentScoreSaved={true}
        onClickSaveCurrentScore={mockOnClickSaveCurrentScore}
        onClickPlayAgain={mockOnClickPlayAgain}
      />,
    );

    expect(
      screen.queryByRole('button', { name: 'Save score' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('OR')).not.toBeInTheDocument();
  });

  it('should call onClickPlayAgain when the "Play again" button is clicked', () => {
    render(
      <ScoreTemplate
        displayedScores={mockPreviousScores}
        currentScore={mockCurrentScore}
        currentScoreRanking={3}
        setPlayerName={mockSetPlayerName}
        isCurrentScoreSaved={false}
        onClickSaveCurrentScore={mockOnClickSaveCurrentScore}
        onClickPlayAgain={mockOnClickPlayAgain}
      />,
    );

    const playAgainButton = screen.getByRole('button', { name: 'Play again' });
    fireEvent.click(playAgainButton);

    expect(mockOnClickPlayAgain).toHaveBeenCalledTimes(1);
  });
});
