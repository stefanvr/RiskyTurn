import { GameState } from "../game-state.ts";
import { gameTurnAdminPlacedUnitsByPlayer } from "../turn-logic/game-turn-admin-place-units.ts";
import {
  PlayerEvent,
  PlayerEventType,
} from "../interaction/game-player-events.ts";
import { gameTurnUnitBuildStarted } from "../turn-logic/game-turn-building-unit.ts";

export function playGameTurnEvent(
  state: GameState,
  event: PlayerEvent,
): PlayerEvent | null {
  switch (event.type) {
    case PlayerEventType.UnitsPlaced:
      {
        gameTurnAdminPlacedUnitsByPlayer(state, event);
      }
      break;
    case PlayerEventType.BuildStarted:
      {
        gameTurnUnitBuildStarted(state, event);
      }
      break;
  }
  return null;
}
