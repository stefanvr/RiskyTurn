export type Player = {
  id: number;
  name: string;
};

export type GameConfig = {
  players: Player[];
};

export const defaultPlayerConfig: Player[] = [
  { id: 1, name: "Player 1" },
  { id: 2, name: "Player 2" },
];
