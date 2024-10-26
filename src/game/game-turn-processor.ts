import { GamePhase, GameState } from "./game-state.ts";
import { TurnActions } from "./game-actions.ts";

export function processGameTurn(
  beginState: GameState,
  actions: TurnActions,
): GameState {
  let endState = beginState;
  if (actions) {
    endState = structuredClone(beginState);
    endState.gameStatus.phase = GamePhase.playing;
  }
  return endState;
}
