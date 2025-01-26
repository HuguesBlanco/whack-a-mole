import React from 'react';
import { COLOR_PURPLE, COLOR_RED } from '../../styles/colors';
import { MolesData } from '../../types/moleTypes';
import hammerCursor from '../assets/hammer-cursor-128x100.png';
import HitFeedback from '../elements/HitFeedback';
import MetricPanel from '../elements/MetricPanel';
import MolesGrid from '../elements/MolesGrid';
import PlayingField from '../elements/PlayingField';

type GameTemplateProps = {
  /** The moles data */
  molesData: MolesData;

  /** Whether a mole has been hit and is still in "hit state", triggering visual feedback. */
  isMoleHit: boolean;

  /** Callback triggered when a mole is hit. */
  onHitMole: () => void;

  /** The current score displayed to the player. */
  scoreValue: number;

  /** The remaining time in seconds displayed to the player. */
  timeLeftInSeconds: number;
};

/**
 * Renders the game layout and visuals during gameplay, including score, timer, and moles grid.
 */
function GameTemplate({
  molesData,
  isMoleHit,
  onHitMole,
  scoreValue,
  timeLeftInSeconds,
}: GameTemplateProps): React.JSX.Element {
  return (
    <div>
      <div style={{ cursor: `url(${hammerCursor}) 35 65, pointer` }}>
        <PlayingField>
          <div
            style={{
              width: '20vw',
              height: '20vh',
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MetricPanel
              label="Score"
              value={scoreValue}
              labelColor={COLOR_RED}
            />
          </div>

          <div
            style={{
              width: '20vw',
              height: '20vh',
              position: 'absolute',
              top: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MetricPanel
              label="Time left"
              value={timeLeftInSeconds}
              labelColor={COLOR_PURPLE}
            />
          </div>

          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MolesGrid molesData={molesData} onMoleHit={onHitMole} />
          </div>
        </PlayingField>
      </div>

      {isMoleHit && <HitFeedback />}
    </div>
  );
}

export default GameTemplate;
