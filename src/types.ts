/**
 * Represent a mole.
 */
export type MoleData = {
  /** A unique ID */
  id: string;
  /** Is the mole visible in the hole ? */
  isUp: boolean;
};

/**
 * Represent a row of moles.
 */
export type MolesRowData = MoleData[];

/**
 * Represent all the moles of the game.
 */
export type MolesGridData = MolesRowData[];

/**
 * Represents the score of a single round.
 */
export type Score = {
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
export type CurrentScore = Score & { isCurrent?: true };

/**
 * The list of scores with one score marked as current.
 */
export type ScoresWithCurrentInfo = (Score | CurrentScore)[];
