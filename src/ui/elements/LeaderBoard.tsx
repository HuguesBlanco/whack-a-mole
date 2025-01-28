import React from 'react';
import { COLOR_GREEN, COLOR_WHITE } from '../../styles/colors';
import { Score, Scores } from '../../types/scoreTypes';

/** Table displaying the scores. */
type LeaderBoardProps = {
  /** The data of the scores displayed in the board. */
  scoresData: Scores;

  /** Is the screen portrait oriented and should a specific version of the component be displayed. Defaults to false ? */
  isPortrait?: boolean;
};

/**
 * Table displaying the scores.
 */
function LeaderBoard({
  scoresData,
  isPortrait = false,
}: LeaderBoardProps): React.JSX.Element {
  const generateCellStyles = (scoreData: Score): React.CSSProperties => {
    const borderColor =
      scoreData.isCurrentGameScore === true ? COLOR_GREEN : COLOR_WHITE;

    return {
      height: '7vh',
      border: `2px solid ${borderColor}`,
      textAlign: 'center',
    };
  };

  return (
    <table
      style={{
        width: '100%',
        fontFamily: 'sans-serif',
        fontSize: isPortrait ? '3vw' : '3vh',
        borderSpacing: isPortrait ? '1vw 2vw' : '1vh 2vh',
        color: COLOR_WHITE,
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
