import React, { ReactElement } from 'react';
import { COLOR_WHITE } from '../styles/colors';
import { ScoresWithCurrentInfo } from '../types';
import LeaderBoardRow from './LeaderBoardRow';

/** Table displaying the scores */
type LeaderBoardProps = {
  scoresData: ScoresWithCurrentInfo;
  textInputComponent: ReactElement;
  onClickSave: () => void;
};

/**
 * Table displaying the scores.
 */
function LeaderBoard({
  scoresData,
  textInputComponent,
  onClickSave,
}: LeaderBoardProps): React.JSX.Element {
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
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {scoresData.map((scoreData) => (
          <LeaderBoardRow
            key={scoreData.id}
            scoreData={scoreData}
            textInputComponent={textInputComponent}
            onClickSave={onClickSave}
          />
        ))}
      </tbody>
    </table>
  );
}

export default LeaderBoard;
