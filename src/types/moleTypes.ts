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
 * Represent all the moles of the game.
 */
export type MolesData = MoleData[];
