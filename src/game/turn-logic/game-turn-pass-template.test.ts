import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { PlayerAction, PlayerActionType } from "../interaction/game-actions.ts";
import {
  PlayerEvent,
  PlayerEventType,
} from "../interaction/game-player-events.ts";
import { validateGameTurnAction } from "../turn/game-turn-action-validator.ts";
import { playGameTurnAction } from "../turn/game-turn-play-action.ts";
import { playGameTurnEvent } from "../turn/game-turn-play-event.ts";
import { minimalGame } from "../test-game-states.ts";
import { GameState } from "../game-state.ts";

describe("Pass", () => {
  let state: GameState;
  let action: PlayerAction;
  let event: PlayerEvent;

  beforeAll(() => {
    state = structuredClone(minimalGame);

    action = {
      type: PlayerActionType.Pass,
    };

    event = playGameTurnAction(state, action)!;
  });

  it("Action is valid", () => {
    const isValid = validateGameTurnAction(state, action);
    assertEquals(isValid, true);
  });

  describe("Action result Event", () => {
    it("Player event is returned", () => {
      assertEquals(event.type, PlayerEventType.Passed);
    });
  });

  describe("Event result applied", () => {
    beforeAll(() => {
      playGameTurnEvent(state, event);
    });

    it("State, updated", () => {
    });
  });
});
