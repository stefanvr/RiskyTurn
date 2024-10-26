import { GameState } from "./game-state.ts";
import { PlayerAction, PlayerActionType } from "./game-actions.ts";

export function validateGameTurn(
  beginState: GameState,
  action: PlayerAction,
): boolean {
  switch (action.type) {
    case PlayerActionType.Pass: {
      return true;
    }
    case PlayerActionType.PlaceUnits: {
      const f = beginState.mapStatus
        .fields[action.unitPlacement.targetField.y][
          action.unitPlacement.targetField.x
        ];
      return f.playerId === action.playerId;
    }
  }

  return false;
}
