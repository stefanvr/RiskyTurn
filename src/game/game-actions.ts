import { Vector } from "../lib/vector.ts";

export enum PlayerAction {
  PlaceUnits,
}

export type UnitPlacement = {
  targetField: Vector;
  units: number;
};

export type PlayerActions = {
  type: PlayerAction.PlaceUnits;
  playerId: number;
  unitPlacement: UnitPlacement;
};

export type TurnActions = PlayerActions[];
