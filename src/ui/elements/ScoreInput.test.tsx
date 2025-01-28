import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Score } from '../../types/scoreTypes';
import ScoreInput from './ScoreInput';

describe('ScoreInput component', () => {
  afterEach(() => {
    cleanup();
  });

  const mockCurrentScore: Score = {
    id: '1',
    playerName: 'John Doe',
    scoreValue: 150,
    isCurrentGameScore: true,
  };

  const ranking = 5;

  const mockSetPlayerName = vi.fn();

  it('should render the score, ranking, and player name input when the score is not saved', () => {
    render(
      <ScoreInput
        currentScore={mockCurrentScore}
        scoreRanking={ranking}
        setPlayerName={mockSetPlayerName}
        isScoreSaved={false}
      />,
    );

    const rankingCell = screen.getByText(ranking);
    expect(rankingCell).toBeInTheDocument();

    const scoreCell = screen.getByText(mockCurrentScore.scoreValue.toString());
    expect(scoreCell).toBeInTheDocument();

    const inputField = screen.getByDisplayValue(mockCurrentScore.playerName);
    expect(inputField).toBeInTheDocument();
  });

  it('should call setPlayerName for each keystroke when the input value changes', () => {
    render(
      <ScoreInput
        currentScore={mockCurrentScore}
        scoreRanking={ranking}
        setPlayerName={mockSetPlayerName}
        isScoreSaved={false}
      />,
    );

    const inputField = screen.getByRole('textbox');

    fireEvent.input(inputField, { target: { value: 'N' } });
    expect(mockSetPlayerName).toHaveBeenCalledWith('N');

    fireEvent.input(inputField, { target: { value: 'Ne' } });
    expect(mockSetPlayerName).toHaveBeenCalledWith('Ne');

    fireEvent.input(inputField, { target: { value: 'New' } });
    expect(mockSetPlayerName).toHaveBeenCalledWith('New');
  });

  it('should call setPlayerName when text is pasted into the input', () => {
    render(
      <ScoreInput
        currentScore={mockCurrentScore}
        scoreRanking={ranking}
        setPlayerName={mockSetPlayerName}
        isScoreSaved={false}
      />,
    );

    const inputField = screen.getByRole('textbox');

    fireEvent.input(inputField, { target: { value: 'Pasted Text' } });

    expect(mockSetPlayerName).toHaveBeenCalledWith('Pasted Text');
  });

  it('should render the player name as text when the score is saved', () => {
    render(
      <ScoreInput
        currentScore={mockCurrentScore}
        scoreRanking={1}
        setPlayerName={mockSetPlayerName}
        isScoreSaved={true}
      />,
    );

    const playerNameText = screen.getByText(mockCurrentScore.playerName);
    expect(playerNameText).toBeInTheDocument();

    const inputField = screen.queryByDisplayValue(mockCurrentScore.playerName);
    expect(inputField).not.toBeInTheDocument();
  });

  it('should render the table with the correct structure', () => {
    render(
      <ScoreInput
        currentScore={mockCurrentScore}
        scoreRanking={ranking}
        setPlayerName={mockSetPlayerName}
        isScoreSaved={true}
      />,
    );

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1);

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(3);
  });

  it('should autofocus the input when mounted', () => {
    render(
      <ScoreInput
        currentScore={mockCurrentScore}
        scoreRanking={ranking}
        setPlayerName={mockSetPlayerName}
        isScoreSaved={false}
      />,
    );

    const inputField = screen.getByRole('textbox');
    expect(inputField).toHaveFocus();
  });
});
