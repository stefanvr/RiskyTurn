import { GamePhase, GameState } from "../game-state.ts";
import { PlayerActionType, TurnActions } from "../interaction/game-actions.ts";
import { validateGameTurnAction } from "../turn/game-turn-action-validator.ts";
import { playGameTurnAction } from "../turn/game-turn-play-action.ts";
import { updatePlayerStats } from "../turn/game-turn-update-player-stats.ts";
import { adminReceiveIncome } from "../turn-logic/game-turn-admin-receive-income.ts";

export function processGameTurn(
  beginState: GameState,
  actions: TurnActions,
): GameState {
  const endState = structuredClone(beginState);

  actions.forEach((action) => {
    validateGameTurnAction(endState, action);
    playGameTurnAction(endState, action);
  });
  resolveBattle(
    endState,
    actions.filter((a) => a.type === PlayerActionType.Attack),
  );
  adminReceiveIncome(endState);
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
