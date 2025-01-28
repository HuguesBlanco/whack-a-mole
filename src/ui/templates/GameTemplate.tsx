import React from 'react';
import hammerCursor from '../../assets/hammer-cursor-128x100.png';
import { COLOR_PURPLE, COLOR_RED } from '../../styles/colors';
import { MolesData } from '../../types/moleTypes';
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

  /** Is the screen portrait oriented and should a specific version of the component be displayed. Defaults to false ? */
  isPortrait?: boolean;
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
  isPortrait = false,
}: GameTemplateProps): React.JSX.Element {
  return (
    <div style={{ userSelect: 'none' }}>
      <div style={{ cursor: `url(${hammerCursor}) 35 65, pointer` }}>
        <PlayingField>
          <div style={{ height: '80vh', width: '80vw', margin: '10vh 10vw' }}>
            <div
              style={{
                height: '15vh',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <MetricPanel
                  label="Score"
                  value={scoreValue}
                  isPortrait={isPortrait}
                  labelColor={COLOR_RED}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <MetricPanel
                  label="Time left"
                  value={timeLeftInSeconds}
                  isPortrait={isPortrait}
                  labelColor={COLOR_PURPLE}
                />
              </div>
            </div>

            <div
              style={{
                height: isPortrait ? '60vh' : '55vh',
                padding: isPortrait ? '0 0 5vh 0' : '5vh 15vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MolesGrid
                molesData={molesData}
                onMoleHit={onHitMole}
                isPortrait={isPortrait}
              />
            </div>
          </div>
        </PlayingField>
      </div>

      {isMoleHit && <HitFeedback />}
    </div>
  );
}

export default GameTemplate;
