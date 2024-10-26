import { GameState } from "../game-state.ts";
import { TurnActions } from "../interaction/game-actions.ts";

export function battle(state: GameState, actions: TurnActions) {
  if (state && actions.length > 0) return true;
}
