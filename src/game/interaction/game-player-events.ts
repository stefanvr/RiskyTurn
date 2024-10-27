import { Vector } from "../../lib/vector.ts";

export enum PlayerEventType {
  Passed = "Passed",
  UnitsPlaced = "UnitsPlaced",
  Income = "Income",
}

export type UnitPlacementResult = {
  target: {
    field: Vector;
    units: number;
  };
  player: {
    placeableUnits: number;
  };
};

export type UnitPlacementEvent = {
  type: PlayerEventType.UnitsPlaced;
  playerId: number;
  placementResult: UnitPlacementResult;
};

export type IncomeEvent = {
  type: PlayerEventType.Income;
  playerId: number;
  income: number;
};

export type PlayerEvent =
  | { type: PlayerEventType.Passed }
  | UnitPlacementEvent
  | IncomeEvent;
