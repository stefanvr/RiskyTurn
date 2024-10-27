import { GameState } from "../game-state.ts";
import {
  BuildFinishedEvent,
  PlayerEventType,
} from "../interaction/game-player-events.ts";
import { Vector } from "../../lib/vector.ts";

export function adminUnitsReady(state: GameState): BuildFinishedEvent[] {
  const events: BuildFinishedEvent[] = [];
  state.mapStatus.fields.forEach((row, y) => {
    row.forEach((field, x) => {
      if (field.unitsUnderConstruction > 0) {
        events.push({
          type: PlayerEventType.BuildFinished,
          build: {
            target: {
              field: new Vector(x, y),
              units: field.unitsUnderConstruction,
              unitsUnderConstruction: 0,
            },
          },
        });
      }
    });
  });
  return events;
}

export function adminReceiveConstructedUnits(
  state: GameState,
  unitsConstructed: BuildFinishedEvent[],
) {
  unitsConstructed.forEach((event) => {
    const field = state.mapStatus
      .fields[event.build.target.field.y][event.build.target.field.x];
    field.unitsUnderConstruction = event.build.target.unitsUnderConstruction;
    field.units = event.build.target.units;
  });
}
