import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { PlayerAction, PlayerActionType } from "../interaction/game-actions.ts";
import { Vector } from "../../lib/vector.ts";
import { minimalGame } from "../test-game-states.ts";
import { playGameTurnAction } from "../turn/game-turn-play-action.ts";
import { PlayerEventType } from "../interaction/game-player-events.ts";
import { FieldType } from "../game-elements.ts";
import { playGameTurnEvent } from "../turn/game-turn-play-event.ts";
import { validateGameTurnAction } from "../turn/game-turn-action-validator.ts";

describe("PlaceUnit", () => {
  const state = structuredClone(minimalGame);
  state.mapStatus.fields = [[
    { fieldType: FieldType.Dirt, playerId: null, units: 0 },
    { fieldType: FieldType.Dirt, playerId: 1, units: 1 },
  ]];

  const action: PlayerAction = {
    type: PlayerActionType.PlaceUnits,
    playerId: 1,
    unitPlacement: {
      targetField: new Vector(1, 0),
      units: 2,
    },
  };
  const event = playGameTurnAction(state, action)!;

  describe("Action is valid", () => {
    const isValid = validateGameTurnAction(state, action);
    assertEquals(isValid, true);
  });

  describe("Action result Event", () => {
    it("Player event is returned", () => {
      assertEquals(event.type, PlayerEventType.UnitsPlaced);
      assertEquals(event.playerId, action.playerId);
    });

    it("Decrements placement units with units of action", () => {
      assertEquals(event.placementResult.player, {
        placeableUnits: 0,
      });
    });

    it("Increments target field with units of action", () => {
      assertEquals(event.placementResult.target, {
        field: action.unitPlacement.targetField,
        units: 1 + 2,
      });
    });
  });

  describe("Event result applied", () => {
    playGameTurnEvent(state, event);

    it("PLayer placement units, updated", () => {
      assertEquals(state.playersStatus[event.playerId].placeableUnits, 0);
    });

    it("Target field units, updated", () => {
      assertEquals(state.mapStatus.fields[0][1].units, 3);
    });
  });
});
