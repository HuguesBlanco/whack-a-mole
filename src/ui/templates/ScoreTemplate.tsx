import React from 'react';
import {
  COLOR_GREEN,
  COLOR_PURPLE,
  COLOR_WHITE,
  COLOR_YELLOW,
} from '../../styles/colors';

import { Score, Scores } from '../../types/scoreTypes';
import Button from '../elements/Button';
import LeaderBoard from '../elements/LeaderBoard';
import PlayingField from '../elements/PlayingField';
import ScoreInput from '../elements/ScoreInput';

type ScoreTemplateProps = {
  /** List of scores to display on the leaderboard. */
  displayedScores: Scores;

  /** The current player's score. */
  currentScore: Score;

  /** The rank of the current score among all scores. */
  currentScoreRanking: number;

  /** Updates the current player's name. */
  setPlayerName: (playerName: string) => void;

  /** Indicates whether the current score has already been saved. */
  isCurrentScoreSaved: boolean;

  /** Callback executed when clicking on save button. */
  onClickSaveCurrentScore: () => void;

  /** Callback triggered when clicking on "play again" button. */
  onClickPlayAgain: () => void;
};

/**
 * Displays the layout for the score screen, with the leaderboard, the player input for the current score, and action buttons.
 */
function ScoreTemplate({
  displayedScores,
  currentScore,
  currentScoreRanking,
  setPlayerName,
  isCurrentScoreSaved,
  onClickSaveCurrentScore,
  onClickPlayAgain,
}: ScoreTemplateProps): React.JSX.Element {
  return (
    <PlayingField>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: COLOR_PURPLE,
          opacity: 0.8,
        }}
      >
        <div
          style={{
            opacity: 1,
            width: '50%',
            margin: '15vh auto 0 auto',
          }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <LeaderBoard scoresData={displayedScores} />
          </div>

          <div>
            <ScoreInput
              currentScore={currentScore}
              scoreRanking={currentScoreRanking}
              setPlayerName={setPlayerName}
              isScoreSaved={isCurrentScoreSaved}
            />
          </div>

          <div
            style={{ marginTop: '1rem', height: '12vh', textAlign: 'center' }}
          >
            {!isCurrentScoreSaved && (
              <div>
                <Button
                  onClick={onClickSaveCurrentScore}
                  backgroundColor={COLOR_GREEN}
                >
                  Save score
                </Button>
                <div
                  style={{
                    marginTop: '1rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    color: COLOR_WHITE,
                    fontFamily: 'DynaPuff, serif',
                  }}
                >
                  OR
                </div>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button onClick={onClickPlayAgain} backgroundColor={COLOR_YELLOW}>
              Play again
            </Button>
          </div>
        </div>
      </div>
    </PlayingField>
  );
}

export default ScoreTemplate;
