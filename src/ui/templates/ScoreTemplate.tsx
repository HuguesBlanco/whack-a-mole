import React from 'react';
import {
  COLOR_GREEN,
  COLOR_PURPLE,
  COLOR_WHITE,
  COLOR_YELLOW,
} from '../../styles/colors';

import { Score, Scores } from '../../types/scoreTypes';
import { hexToRgba } from '../../utils/colorsUtils';
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

  /** Is the screen portrait oriented and should a specific version of the component be displayed. Defaults to false ? */
  isPortrait?: boolean;
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
  isPortrait = false,
}: ScoreTemplateProps): React.JSX.Element {
  return (
    <PlayingField>
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: hexToRgba(COLOR_PURPLE, 0.9),
        }}
      >
        <div
          style={{
            opacity: 1,
            height: '80vh',
            width: isPortrait ? '80vw' : '60vw',
            margin: isPortrait ? '10vh 10vw' : '10vh 20vw',
          }}
        >
          <div
            style={{
              height: '40vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <LeaderBoard scoresData={displayedScores} isPortrait={isPortrait} />
          </div>

          <div
            style={{
              height: '40vh',
              textAlign: 'center',
            }}
          >
            <div style={{ marginBottom: '3vh' }}>
              <ScoreInput
                currentScore={currentScore}
                scoreRanking={currentScoreRanking}
                setPlayerName={setPlayerName}
                isScoreSaved={isCurrentScoreSaved}
                isPortrait={isPortrait}
              />
            </div>
            <div style={{ height: '17.4vh' }}>
              {!isCurrentScoreSaved && (
                <>
                  <div style={{ marginBottom: '3vh' }}>
                    <Button
                      onClick={onClickSaveCurrentScore}
                      backgroundColor={COLOR_GREEN}
                      isPortrait={isPortrait}
                    >
                      Save score
                    </Button>
                  </div>

                  <div
                    style={{
                      textAlign: 'center',
                      color: COLOR_WHITE,
                      fontFamily: 'DynaPuff, serif',
                      fontSize: '3vh',
                    }}
                  >
                    OR
                  </div>
                </>
              )}
            </div>

            <div>
              <Button
                onClick={onClickPlayAgain}
                backgroundColor={COLOR_YELLOW}
                isPortrait={isPortrait}
              >
                Play again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PlayingField>
  );
}

export default ScoreTemplate;
