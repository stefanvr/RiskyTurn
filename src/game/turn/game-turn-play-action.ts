import { GameState } from "../game-state.ts";
import {
  type PlayerAction,
  PlayerActionType,
} from "../interaction/game-actions.ts";
import { gameTurnAdminPlaceUnitsByPlayer } from "../turn-logic/game-turn-admin-place-units.ts";
import {
  PlayerEvent,
  PlayerEventType,
} from "../interaction/game-player-events.ts";
import { gameTurnBuildUnit } from "../turn-logic/game-turn-building-unit.ts";
import { attack } from "../turn-logic/game-turn-attack.ts";

export function playGameTurnAction(
  state: GameState,
  action: PlayerAction,
): PlayerEvent | null {
  switch (action.type) {
    case PlayerActionType.Pass: {
      return { type: PlayerEventType.Passed };
    }
    case PlayerActionType.PlaceUnits: {
      return gameTurnAdminPlaceUnitsByPlayer(state, action);
    }
    case PlayerActionType.BuildUnit: {
      return gameTurnBuildUnit(state, action);
    }
    case PlayerActionType.Attack: {
      return attack(state, action);
    }
  }
  return null;
}
