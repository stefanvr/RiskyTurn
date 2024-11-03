import { Modal } from "../driver-display.ts";

export enum GameEventType {
  NextState = "NextTurn",
  StartGame = "StartGame",
  GameFinished = "GameFinished",
  ShowModal = "ShowModal",
}
export type GameEventTypeEventOnly =
  | GameEventType.NextState
  | GameEventType.StartGame
  | GameEventType.GameFinished;

export type GameEvent =
  | {
    type: GameEventTypeEventOnly;
  }
  | {
    type: GameEventType.ShowModal;
    model: Modal;
  };
