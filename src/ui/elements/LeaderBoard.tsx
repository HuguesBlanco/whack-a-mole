import React from 'react';
import {
  COLOR_GREEN,
  COLOR_PURPLE,
  COLOR_WHITE,
  COLOR_YELLOW,
} from '../../styles/colors';
import { Score, Scores } from '../../types/scoreTypes';
import { getOrdinalSuffix } from '../../utils/scoreUtils';

/** Table displaying the scores. */
type LeaderBoardProps = {
  /** The data of the scores displayed in the board. */
  scoresData: Scores;

  /** Indicates whether the current score has already been saved. Defaults to false. */
  isCurrentScoreSaved?: boolean;
};

/**
 * Table displaying the scores.
 */
function LeaderBoard({
  scoresData,
  isCurrentScoreSaved = false,
}: LeaderBoardProps): React.JSX.Element {
  const getRowBackgroundColor = (scoreData: Score): string => {
    if (scoreData.isCurrentGameScore === true) {
      return isCurrentScoreSaved ? COLOR_YELLOW : COLOR_GREEN;
    }

    return COLOR_WHITE;
  };

  return (
    <div>
      {scoresData.map((scoreDatum, index) => {
        const rank = index + 1;
        const isLastElement = index + 1 === scoresData.length;

        return (
          <div
            key={scoreDatum.id}
            style={{
              marginBottom: isLastElement ? 0 : '0.5vh',
            }}
          >
            <div
              style={{
                fontFamily: 'sans-serif',
                fontSize: '1.5vh',
                color: COLOR_PURPLE,
                backgroundColor: getRowBackgroundColor(scoreDatum),
                padding: '1.4vh 0 1.2vh 0',
                borderRadius: '1vh',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr',
                textAlign: 'center',
              }}
            >
              <div>
                <span style={{ fontWeight: 'bold' }}>{rank}</span>
                <sup
                  style={{ fontFamily: 'DynaPuff, serif', fontSize: '0.8vh' }}
                >
                  {' '}
                  {getOrdinalSuffix(rank)}
                </sup>
              </div>

              <div>{scoreDatum.playerName}</div>

              <div>
                <span style={{ fontWeight: 'bold' }}>
                  {scoreDatum.scoreValue}
                </span>{' '}
                <span
                  style={{ fontFamily: 'DynaPuff, serif', fontSize: '0.8vh' }}
                >
                  pts
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LeaderBoard;
