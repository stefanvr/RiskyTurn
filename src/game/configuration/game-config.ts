import { FieldType } from "../game-elements.ts";

export type Player = {
  id: number;
  name: string;
};

export type FieldConfig = {
  fieldType: FieldType;
  playerId?: number;
};

export type MapConfig = {
  fields: FieldConfig[][];
};

export type GameConfig = {
  players: Player[];
  mapConfig: MapConfig;
};

export const defaultPlayerConfig: Player[] = [
  { id: 1, name: "Player 1" },
  { id: 2, name: "Player 2" },
];
