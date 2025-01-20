import React from 'react';
import { COLOR_GREEN, COLOR_WHITE } from '../styles/colors';
import { CurrentScore, Score, ScoresWithCurrentInfo } from '../types';
import { isCurrentScore } from '../utils/scoreUtils';

function getCellStyles(scoreData: Score | CurrentScore): React.CSSProperties {
  const borderColor = isCurrentScore(scoreData) ? COLOR_GREEN : COLOR_WHITE;

  return {
    padding: '1rem',
    border: `2px solid ${borderColor}`,
  };
}

/** Table displaying the scores */
type LeaderBoardProps = {
  scoresData: ScoresWithCurrentInfo;
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
            <td className="ranking" style={getCellStyles(scoreData)}>
              {index + 1}
            </td>
            <td className="name" style={getCellStyles(scoreData)}>
              {scoreData.playerName}
            </td>
            <td className="score" style={getCellStyles(scoreData)}>
              {scoreData.scoreValue}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaderBoard;
