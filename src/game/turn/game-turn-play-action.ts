import { GameState } from "../game-state.ts";
import {
  type PlayerAction,
  PlayerActionType,
} from "../interaction/game-actions.ts";

export function playGameTurnAction(
  beginState: GameState,
  action: PlayerAction,
): GameState {
  const endState = structuredClone(beginState);
  applyAction(endState, action);
  return endState;
}

function applyAction(state: GameState, action: PlayerAction) {
  switch (action.type) {
    case PlayerActionType.Pass: {
      return;
    }
    case PlayerActionType.PlaceUnits: {
      state.playersStatus[action.playerId].placeableUnits -=
        action.unitPlacement.units;
      const f = state.mapStatus
        .fields[action.unitPlacement.targetField.y][
          action.unitPlacement.targetField.x
        ];
      f.units += action.unitPlacement.units;
      return;
    }
  }
}
