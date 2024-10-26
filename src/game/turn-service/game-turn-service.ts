import { GameState } from "../game-state.ts";
import { PlayerActionType, TurnActions } from "../interaction/game-actions.ts";
import { validateGameTurnAction } from "../turn/game-turn-action-validator.ts";
import { playGameTurnAction } from "../turn/game-turn-play-action.ts";
import { updatePlayerStats } from "../turn/game-turn-update-player-stats.ts";
import { adminReceiveIncome } from "../turn-logic/game-turn-admin-receive-income.ts";
import { updateGameStats } from "../turn/game-turn-update-game-stats.ts";
import { battle } from "../turn-logic/game-turn-battle.ts";

export function processGameTurn(
  beginState: GameState,
  actions: TurnActions,
): GameState {
  const endState = structuredClone(beginState);

  actions.forEach((action) => {
    validateGameTurnAction(endState, action);
    playGameTurnAction(endState, action); // purchase & move
  });
  battle(endState, actions.filter((a) => a.type === PlayerActionType.Attack));

  updatePlayerStats(endState);
  updateGameStats(endState);

  // Next round
  adminReceiveIncome(endState);
  //adminReceiveUnits

  return endState;
}
