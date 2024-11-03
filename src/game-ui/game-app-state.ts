import { GamePhase, GameState } from "../game/game-state.ts";
import { ButtonCallback } from "../display/ui-elements/button.ts";

export enum GameAppStatePhases {
  startGame = "Start Game",
  StartPlayer1 = "Player 1 get ready",
  AdminPhasePlayer1 = "Admin Phase (1)",
  EnterActionPlayer1 = "Ready (1)",
  StartPlayer2 = "Player 2 get ready",
  AdminPhasePlayer2 = "Admin Phase (2)",
  EnterActionPlayer2 = "Ready (2)",
  ExecuteActions = "Execute Actions",
  endGame = "End Game",
}

export class GameAppState {
  status: GameAppStatePhases = GameAppStatePhases.startGame;
  gamestate: GameState;
  publishNextState: () => void;
  playerId: number = 0;

  constructor(gamestate: GameState, nextState: () => void) {
    this.gamestate = gamestate;
    this.publishNextState = nextState;
  }

  public getAction(): ButtonCallback {
    return {
      text: () => this.status.toString(),
      action: () => this.nextPhase(),
      enabled: () => {
        return true;
      },
    };
  }

  demoRound = 0;
  public nextPhase() {
    console.log("nextPhase", this.status);
    switch (this.status) {
      case GameAppStatePhases.startGame:
        {
          this.status = GameAppStatePhases.StartPlayer1;
        }
        break;
      case GameAppStatePhases.StartPlayer1:
        {
          this.status = GameAppStatePhases.AdminPhasePlayer1;
          this.playerId = 1;
        }
        break;
      case GameAppStatePhases.AdminPhasePlayer1:
        {
          this.status = GameAppStatePhases.EnterActionPlayer1;
        }
        break;
      case GameAppStatePhases.EnterActionPlayer1:
        {
          this.status = GameAppStatePhases.StartPlayer2;
          this.playerId = 2;
        }
        break;
      case GameAppStatePhases.StartPlayer2:
        {
          this.status = GameAppStatePhases.AdminPhasePlayer2;
        }
        break;
      case GameAppStatePhases.AdminPhasePlayer2:
        {
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
          if (this.demoRound === 1) {
            this.gamestate.gameStatus.phase = GamePhase.Finished;
            this.status = GameAppStatePhases.endGame;
          } else {
            this.demoRound++;
            this.status = GameAppStatePhases.StartPlayer1;
          }
        }
        break;
      case GameAppStatePhases.endGame:
        {
          this.status = GameAppStatePhases.StartPlayer1;
        }
        break;
    }
    this.publishNextState();
  }
}
