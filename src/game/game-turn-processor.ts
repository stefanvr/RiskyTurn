import { GamePhase, GameState } from "./game-state.ts";
import { PlayerActionType, TurnActions } from "./game-actions.ts";
import { validateGameTurn } from "./game-turn-action-validator.ts";
import { applyGameMove } from "./game-turn-move.ts";
import { updatePlayerStats } from "./game-turn-update-stats.ts";

export function processGameTurn(
  beginState: GameState,
  actions: TurnActions,
): GameState {
  const endState = structuredClone(beginState);

  actions.forEach((action) => {
    validateGameTurn(endState, action);
    applyGameMove(endState, action);
  });
  resolveBattle(
    endState,
    actions.filter((a) => a.type === PlayerActionType.Attack),
  );
  updatePlayerStats(endState);

  endState.gameStatus.phase = hasPlayerWon(endState)
    ? GamePhase.finished
    : GamePhase.playing;
  return endState;
}

function hasPlayerWon(state: GameState) {
  return Object.values(state.playersStatus).filter((ps) =>
    ps.mapDomination === 100
  ).length > 0;
}

function resolveBattle(state: GameState, actions: TurnActions) {
  if (state && actions.length > 0) return true;
}
