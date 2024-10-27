import { GameState } from "../game-state.ts";
import { gameTurnAdminPlacedUnitsByPlayer } from "../turn-logic/game-turn-admin-place-units.ts";
import {
  PlayerEvent,
  PlayerEventType,
} from "../interaction/game-player-events.ts";

export function playGameTurnEvent(
  state: GameState,
  event: PlayerEvent,
): PlayerEvent | null {
  switch (event.type) {
    case PlayerEventType.UnitsPlaced: {
      gameTurnAdminPlacedUnitsByPlayer(state, event);
    }
  }
  return null;
}
