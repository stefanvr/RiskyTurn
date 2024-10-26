import { GameConfig } from "./game-config.ts";
import { GamePhase, GameState } from "./game-state.ts";

export class GameBuilder {
  public createGame(config: GameConfig): GameState {
    return {
      gameStatus: { phase: GamePhase.placing },
    };
  }
}
