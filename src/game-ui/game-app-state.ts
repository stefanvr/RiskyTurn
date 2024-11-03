import { GamePhase, GameState } from "../game/game-state.ts";
import { ButtonCallback } from "../display/ui-elements/button.ts";
import { playGameTurnAction } from "../game/turn/game-turn-play-action.ts";
import { PlayerAction } from "../game/interaction/game-actions.ts";
import { processGameTurn } from "../game/turn-service/game-turn-service.ts";

export enum GameAppStatePhases {
  startGame = "Start Game",
  StartPlayer1 = "Player 1 get ready",
  AdminPhasePlayer1 = "Admin Phase (1)",
  EnterActionPlayer1 = "Ready (1)",
  StartPlayer2 = "Player 2 get ready",
  AdminPhasePlayer2 = "Admin Phase (2)",
  EnterActionPlayer2 = "Ready (2)",
  ExecuteActions = "Execute Actions",
  showResults = "Game over",
  endGame = "End Game",
}

export class GameAppState {
  status: GameAppStatePhases = GameAppStatePhases.startGame;
  gamestate: GameState;
  publishNextState: () => void;
  playerId: number = 0;
  actions: PlayerAction[] = [];

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
          console.log(this.gamestate.mapStatus.fields);
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
          this.gamestate = processGameTurn(this.gamestate, this.actions);
          this.actions = [];
          console.log(this.gamestate);
          this.status = this.gamestate.gameStatus.phase === GamePhase.Finished
            ? GameAppStatePhases.showResults
            : GameAppStatePhases.StartPlayer1;
        }
        break;
      case GameAppStatePhases.showResults:
        {
          this.status = GameAppStatePhases.endGame;
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

  public enterPLayerAction(action: PlayerAction) {
    this.actions.push(action);
    playGameTurnAction(this.gamestate, action);
  }
}
