export type MoleData = { id: string; isUp: boolean };

export type MolesRowData = MoleData[];

export type MolesGridData = MolesRowData[];

/**
 * Represents the score of a single round.
 */
export type Score = {
  /** The name of the player. */
  playerName: string;
  /** The player's score. */
  score: number;
};

/**
 * A collection of scores from the game.
 */
export type Scores = Score[];
