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
};

/**
 * A collection of scores from the game.
 */
export type Scores = Score[];

/**
 *  The score of the game that was just finished.
 */
export type CurrentGameScore = Score & { isCurrentGameScore: true };

/**
 * The list of scores with one score marked as the one of the current game.
 */
export type ScoresWithCurrentGameOne = (Score | CurrentGameScore)[];
