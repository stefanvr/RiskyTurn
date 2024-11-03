import { GameState } from "../game-state.ts";
import { AttackingEvent } from "../interaction/game-player-events.ts";

export function battle(state: GameState, actions: unknown[]) {
  console.log("battle");
  if (state && actions.length > 0) {
    console.log("battle go");
    actions.forEach((action) => {
      const a = action as AttackingEvent;
      const from = state.mapStatus
        .fields[a.from.targetField.y][a.from.targetField.x];

      const to = state.mapStatus
        .fields[a.to.targetField.y][a.to.targetField.x];

      if (a.from.numberOfUnits > to.units) {
        to.units = a.from.numberOfUnits - to.units;
        to.playerId = a.playerId;
        from.units = 0;
      }
    });
  }
}
