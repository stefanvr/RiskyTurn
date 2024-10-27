import { Vector } from "../../lib/vector.ts";

export enum PlayerEventType {
  Passed = "Passed",
  UnitsPlaced = "UnitsPlaced",
  BuildStarted = "BuildStarted",
  BuildFinished = "BuildFinished",
  Income = "Income",
  Attacking = "Attacking",
  BattleResult = "BattleResult",
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

export type BuildStartedEvent = {
  type: PlayerEventType.BuildStarted;
  playerId: number;
  building: {
    target: {
      field: Vector;
      unitsUnderConstruction: number;
    };
    player: {
      money: number;
    };
  };
};

export type BuildFinishedEvent = {
  type: PlayerEventType.BuildFinished;
  build: {
    target: {
      field: Vector;
      units: number;
      unitsUnderConstruction: number;
    };
  };
};

export type IncomeEvent = {
  type: PlayerEventType.Income;
  playerId: number;
  income: number;
};

export type AttackingEvent = {
  type: PlayerEventType.Attacking;
  playerId: number;
  from: {
    numberOfUnits: number;
    targetField: Vector;
  };
  to: {
    targetField: Vector;
  };
};

export type BattleFieldResult = {
  field: Vector;
  numberOfUnits: number;
  playerId: number;
};

export type BattleResultAction = {
  type: PlayerEventType.BattleResult;
  playerId: number;
  fields: BattleFieldResult[];
};

export type PlayerEvent =
  | { type: PlayerEventType.Passed }
  | UnitPlacementEvent
  | BuildStartedEvent
  | BuildFinishedEvent
  | IncomeEvent
  | AttackingEvent
  | BattleResultAction;
