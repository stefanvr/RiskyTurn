import { GameState } from "../game-state.ts";
import {
  type PlayerAction,
  PlayerActionType,
} from "../interaction/game-actions.ts";
import { gameTurnAdminPlaceUnitsByPlayer } from "../turn-logic/game-turn-admin-place-units.ts";
import { PlayerEvent } from "../interaction/game-player-events.ts";

export function playGameTurnAction(
  state: GameState,
  action: PlayerAction,
): PlayerEvent | null {
  switch (action.type) {
    case PlayerActionType.Pass: {
      return null;
    }
    case PlayerActionType.PlaceUnits: {
      return gameTurnAdminPlaceUnitsByPlayer(state, action);
    }
  }
  return null;
}