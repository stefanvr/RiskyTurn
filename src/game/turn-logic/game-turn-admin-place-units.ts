import { GameState } from "../game-state.ts";
import { UnitPlacementAction } from "../interaction/game-actions.ts";
import {
  PlayerEventType,
  UnitPlacementEvent,
} from "../interaction/game-player-events.ts";

export function isValidUnitPlacement(
  state: GameState,
  action: UnitPlacementAction,
): boolean {
  const f = state.mapStatus
    .fields[action.unitPlacement.targetField.y][
      action.unitPlacement.targetField.x
    ];

  return f.playerId === action.playerId &&
    f.units >= action.unitPlacement.units;
}

export function gameTurnAdminPlaceUnitsByPlayer(
  state: GameState,
  action: UnitPlacementAction,
): UnitPlacementEvent {
  const player = state.playersStatus[action.playerId];
  const field = state.mapStatus
    .fields[action.unitPlacement.targetField.y][
      action.unitPlacement.targetField.x
    ];

  const e = {
    type: PlayerEventType.UnitsPlaced,
    playerId: action.playerId,
    placementResult: {
      player: {
        placeableUnits: player.placeableUnits - action.unitPlacement.units,
      },
      target: {
        field: action.unitPlacement.targetField,
        units: field.units + action.unitPlacement.units,
      },
    },
  };
  gameTurnAdminPlacedUnitsByPlayer(state, e);
  return e;
}

export function gameTurnAdminPlacedUnitsByPlayer(
  state: GameState,
  placement: UnitPlacementEvent,
) {
  state.playersStatus[placement.playerId].placeableUnits =
    placement.placementResult.player.placeableUnits;

  const f = state.mapStatus
    .fields[placement.placementResult.target.field.y][
      placement.placementResult.target.field.x
    ];
  f.units = placement.placementResult.target.units;
}
