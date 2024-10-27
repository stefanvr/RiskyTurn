import { GameState } from "../game-state.ts";
import { UnitPlacementAction } from "../interaction/game-actions.ts";
import {
  PlayerEventType,
  UnitPlacementEvent,
} from "../interaction/game-player-events.ts";

export function gameTurnAdminPlaceUnitsByPlayer(
  state: GameState,
  action: UnitPlacementAction,
): UnitPlacementEvent {
  state.playersStatus[action.playerId].placeableUnits -=
    action.unitPlacement.units;
  const f = state.mapStatus
    .fields[action.unitPlacement.targetField.y][
      action.unitPlacement.targetField.x
    ];
  f.units += action.unitPlacement.units;

  return {
    type: PlayerEventType.UnitsPlaced,
    playerId: action.playerId,
    placementResult: {
      targetField: action.unitPlacement.targetField,
      units: f.units,
    },
  };
}
