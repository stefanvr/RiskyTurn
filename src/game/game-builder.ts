import { GameConfig, Player } from "./game-config.ts";
import { GamePhase, GameState, type PlayersStatus } from "./game-state.ts";

export class GameBuilder {
  public createGame(config: GameConfig): GameState {
    return {
      gameStatus: { phase: GamePhase.placing },
      playersStatus: this.createPlayerState(config.players),
    };
  }

  createPlayerState(players: Player[]): PlayersStatus {
    const ps: PlayersStatus = {};
    players.forEach((player) => {
      ps[player.id] = { playerId: player.id };
    });

    return ps;
  }
}
