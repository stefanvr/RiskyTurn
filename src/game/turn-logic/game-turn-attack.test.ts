import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { AttackAction, PlayerActionType } from "../interaction/game-actions.ts";
import {
  AttackingEvent,
  PlayerEventType,
} from "../interaction/game-player-events.ts";
import { validateGameTurnAction } from "../turn/game-turn-action-validator.ts";
import { playGameTurnAction } from "../turn/game-turn-play-action.ts";
import { playGameTurnEvent } from "../turn/game-turn-play-event.ts";
import { minimalGame } from "../test-game-states.ts";
import { GameState } from "../game-state.ts";
import { Vector } from "../../lib/vector.ts";

describe("Pass", () => {
  let state: GameState;
  let action: AttackAction;
  let event: AttackingEvent;

  beforeAll(() => {
    state = structuredClone(minimalGame);
    state.mapStatus.fields[0][2].units = 5;

    action = {
      type: PlayerActionType.Attack,
      playerId: 1,
      from: {
        numberOfUnits: 3,
        targetField: new Vector(2, 0),
      },
      to: {
        targetField: new Vector(1, 0),
      },
    };

    event = playGameTurnAction(state, action)! as AttackingEvent;
  });

  it("Action is valid", () => {
    const isValid = validateGameTurnAction(state, action);
    assertEquals(isValid, true);
  });

  describe("Action result Event", () => {
    it("Player event is returned", () => {
      assertEquals(event, {
        type: PlayerEventType.Attacking,
        playerId: 1,
        from: {
          numberOfUnits: 3,
          targetField: new Vector(2, 0),
        },
        to: {
          targetField: new Vector(1, 0),
        },
      });
    });
  });

  describe("Event result applied", () => {
    beforeAll(() => {
      playGameTurnEvent(state, event);
    });

    it("State, updated", () => {
      assertEquals(state.turnBattles.size, 1);
    });
  });
});
