import { GameState } from "../game-state.ts";
import { BuildUnitAction } from "../interaction/game-actions.ts";
import {
  BuildStartedEvent,
  PlayerEventType,
} from "../interaction/game-player-events.ts";

export function isValidBuildUnit(
  state: GameState,
  action: BuildUnitAction,
): boolean {
  return state.playersStatus[action.playerId].money >=
    action.buildInstruction.numberOfUnits;
}

export function gameTurnBuildUnit(
  state: GameState,
  action: BuildUnitAction,
): BuildStartedEvent {
  const target = action.buildInstruction.targetField;
  return {
    type: PlayerEventType.BuildStarted,
    playerId: action.playerId,
    building: {
      target: {
        field: action.buildInstruction.targetField,
        unitsUnderConstruction: action.buildInstruction.numberOfUnits +
          state.mapStatus.fields[target.y][target.x].unitsUnderConstruction,
      },
      player: {
        money: state.playersStatus[action.playerId].money -
          action.buildInstruction.numberOfUnits,
      },
    },
  };
}

export function gameTurnUnitBuildStarted(
  state: GameState,
  event: BuildStartedEvent,
) {
  const target = event.building.target;
  state.playersStatus[event.playerId].money = event.building.player.money;
  state.mapStatus.fields[target.field.y][target.field.x]
    .unitsUnderConstruction = target.unitsUnderConstruction;
}
