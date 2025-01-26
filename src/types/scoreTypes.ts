/**
 * Represents the score of a single round.
 */
export type Score = {
  /** The unique ID of the score. */
  id: string;

  /** The name of the player. */
  playerName: string;

  /** The player's score. */
  scoreValue: number;

  /** Is the score the score of the current game ? */
  isCurrentGameScore?: boolean;
};

/**
 * A collection of scores from the game.
 */
export type Scores = Score[];
