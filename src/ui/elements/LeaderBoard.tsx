import React from 'react';
import { COLOR_GREEN, COLOR_WHITE } from '../../styles/colors';
import {
  CurrentGameScore,
  Score,
  ScoresWithCurrentGameOne,
} from '../../types/scoreTypes';
import { isCurrentScore } from '../../utils/scoreUtils';

/**
 * Generate the CSS styles for the table cells (td).
 * @param scoreData The data of the score displayed in the cell.
 * @returns An object containing the CSS styles of the td.
 */
function generateCellStyles(
  scoreData: Score | CurrentGameScore,
): React.CSSProperties {
  const borderColor = isCurrentScore(scoreData) ? COLOR_GREEN : COLOR_WHITE;

  return {
    padding: '1rem',
    border: `2px solid ${borderColor}`,
  };
}

/** Table displaying the scores. */
type LeaderBoardProps = {
  /** The data of the scores displayed in the board. */
  scoresData: ScoresWithCurrentGameOne;
};

/**
 * Table displaying the scores.
 */
function LeaderBoard({ scoresData }: LeaderBoardProps): React.JSX.Element {
  return (
    <table
      style={{
        width: '100%',
        fontFamily: 'sans-serif',
        fontSize: '2rem',
        color: COLOR_WHITE,
        borderSpacing: '1rem',
      }}
    >
      <thead>
        <tr>
          <th style={{ width: '25%', fontFamily: 'DynaPuff, serif' }}>
            Ranking
          </th>
          <th style={{ width: '50%', fontFamily: 'DynaPuff, serif' }}>Name</th>
          <th style={{ width: '25%', fontFamily: 'DynaPuff, serif' }}>Score</th>
        </tr>
      </thead>
      <tbody>
        {scoresData.map((scoreData, index) => (
          <tr key={scoreData.id}>
            <td className="ranking" style={generateCellStyles(scoreData)}>
              {index + 1}
            </td>
            <td className="name" style={generateCellStyles(scoreData)}>
              {scoreData.playerName}
            </td>
            <td className="score" style={generateCellStyles(scoreData)}>
              {scoreData.scoreValue}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaderBoard;
