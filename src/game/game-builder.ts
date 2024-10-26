import { GameConfig, MapConfig, Player } from "./game-config.ts";
import {
  FieldStatus,
  GamePhase,
  GameState,
  MapStatus,
  type PlayersStatus,
} from "./game-state.ts";

export class GameBuilder {
  public createGame(config: GameConfig): GameState {
    return {
      gameStatus: { phase: GamePhase.placing },
      playersStatus: this.createPlayerState(config.players),
      mapStatus: this.createMapStatus(config.mapConfig),
    };
  }

  createPlayerState(players: Player[]): PlayersStatus {
    const ps: PlayersStatus = {};
    players.forEach((player) => {
      ps[player.id] = { playerId: player.id };
    });

    return ps;
  }

  createMapStatus(config: MapConfig): MapStatus {
    const fields: FieldStatus[][] = [];

    for (const cc of config.fields) {
      const column: FieldStatus[] = [];
      for (const field of cc) {
        column.push({
          fieldType: field.fieldType,
          playerId: field.playerId || null,
          units: 0,
        });
      }
      fields.push(column);
    }

    return { fields };
  }
}
