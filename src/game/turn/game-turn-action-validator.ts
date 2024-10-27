import { GameState } from "../game-state.ts";
import { PlayerAction, PlayerActionType } from "../interaction/game-actions.ts";
import { isValidUnitPlacement } from "../turn-logic/game-turn-admin-place-units.ts";
import { isValidBuildUnit } from "../turn-logic/game-turn-building-unit.ts";

export function validateGameTurnAction(
  state: GameState,
  action: PlayerAction,
): boolean {
  switch (action.type) {
    case PlayerActionType.Pass: {
      return true;
    }
    case PlayerActionType.PlaceUnits: {
      return isValidUnitPlacement(state, action);
    }
    case PlayerActionType.BuildUnit: {
      return isValidBuildUnit(state, action);
    }
  }

  return false;
}
