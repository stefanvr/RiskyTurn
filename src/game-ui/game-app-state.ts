import { GamePhase, GameState } from "../game/game-state.ts";

export enum GameAppStatePhases {
  startGame = "Start Game",
  EnterActionPlayer1 = "Enter Action Player 1",
  EnterActionPlayer2 = "Enter Action Player 2",
  ExecuteActions = "Execute Actions",
  AdminPhase = "Admin Phase",
  endGame = "End Game",
}

export class GameAppState {
  status: GameAppStatePhases = GameAppStatePhases.startGame;
  gamestate: GameState;

  constructor(gamestate: GameState) {
    this.gamestate = gamestate;
  }

  public nextPhase() {
    console.log("nextPhase", this.status);
    switch (this.status) {
      case GameAppStatePhases.startGame:
        {
          this.status = GameAppStatePhases.EnterActionPlayer1;
        }
        break;
      case GameAppStatePhases.EnterActionPlayer1:
        {
          this.gamestate.mapStatus.fields[0][0].units = 2;
          this.gamestate.playersStatus[1].placeableUnits = 0;
          this.status = GameAppStatePhases.EnterActionPlayer2;
        }
        break;
      case GameAppStatePhases.EnterActionPlayer2:
        {
          this.status = GameAppStatePhases.ExecuteActions;
        }
        break;
      case GameAppStatePhases.ExecuteActions:
        {
          if (this.gamestate.gameStatus.phase === GamePhase.Placing) {
            this.gamestate.gameStatus.phase = GamePhase.Playing;
            this.status = GameAppStatePhases.EnterActionPlayer1;
            return;
          }
          this.gamestate.mapStatus.fields[0][0].units = 0;
          this.gamestate.mapStatus.fields[0][1].units = 1;
          this.gamestate.mapStatus.fields[0][1].playerId = 1;
          this.gamestate.playersStatus[1].mapDomination = 100;
          this.gamestate.gameStatus.phase = GamePhase.Finished;
          this.status = GameAppStatePhases.AdminPhase;
        }
        break;
      case GameAppStatePhases.AdminPhase:
        {
          this.status = GameAppStatePhases.endGame;
        }
        break;
    }
  }
}
