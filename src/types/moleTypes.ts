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
