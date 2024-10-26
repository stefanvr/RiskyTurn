import { GamePhase, GameState } from "./game-state.ts";
import {
  type PlayerAction,
  PlayerActionType,
  TurnActions,
} from "./game-actions.ts";

export function processGameTurn(
  beginState: GameState,
  actions: TurnActions,
): GameState {
  const endState = structuredClone(beginState);

  actions.forEach((action) => {
    applyAction(endState, action);
  });

  endState.gameStatus.phase = GamePhase.playing;
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
