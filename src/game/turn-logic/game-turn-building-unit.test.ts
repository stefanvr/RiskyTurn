import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import {
  BuildUnitAction,
  PlayerActionType,
} from "../interaction/game-actions.ts";
import {
  BuildStartedEvent,
  PlayerEventType,
} from "../interaction/game-player-events.ts";
import { validateGameTurnAction } from "../turn/game-turn-action-validator.ts";
import { playGameTurnAction } from "../turn/game-turn-play-action.ts";
import { playGameTurnEvent } from "../turn/game-turn-play-event.ts";
import { minimalGame } from "../test-game-states.ts";
import { GameState } from "../game-state.ts";
import { Vector } from "../../lib/vector.ts";

describe("BuildUnit", () => {
  let state: GameState;
  let action: BuildUnitAction;
  let event: BuildStartedEvent;

  beforeAll(() => {
    state = structuredClone(minimalGame);
    state.playersStatus[1].money = 100;
    state.mapStatus.fields[0][1].unitsUnderConstruction = 2;

    action = {
      type: PlayerActionType.BuildUnit,
      playerId: 1,
      buildInstruction: {
        targetField: new Vector(1, 0),
        numberOfUnits: 1,
      },
    };

    event = playGameTurnAction(state, action)! as BuildStartedEvent;
  });

  it("Action is valid", () => {
    const isValid = validateGameTurnAction(state, action);
    assertEquals(isValid, true);
  });

  describe("Action result Event", () => {
    it("BuildStarted event is returned", () => {
      assertEquals(event.type, PlayerEventType.BuildStarted);
      assertEquals(event.playerId, action.playerId);
    });

    it("Decrements money with units of action", () => {
      assertEquals(event.building.player.money, 99);
    });

    it("Increments target field with units of action", () => {
      assertEquals(event.building.target, {
        field: action.buildInstruction.targetField,
        unitsUnderConstruction: 2 + 1,
      });
    });
  });

  describe("Event result applied", () => {
    beforeAll(() => {
      playGameTurnEvent(state, event);
    });

    it("Player money, updated", () => {
      assertEquals(state.playersStatus[event.playerId].money, 99);
    });

    it("Target field unitsUnderConstruction, updated", () => {
      assertEquals(state.mapStatus.fields[0][1].unitsUnderConstruction, 3);
    });
  });
});
