import { GamePhase, GameState } from "../game-state.ts";

export function updateGameStats(state: GameState) {
  state.gameStatus.phase = hasPlayerWon(state)
    ? GamePhase.Finished
    : GamePhase.Playing;
}

function hasPlayerWon(state: GameState) {
  return Object.values(state.playersStatus).filter((ps) =>
    ps.mapDomination === 100
  ).length > 0;
}
