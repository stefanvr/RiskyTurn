import { describe, it } from "jsr:@std/testing/bdd";
import { minimalGame } from "../test-game-states.ts";
import { PlayerAction, PlayerActionType } from "../interaction/game-actions.ts";
import { Vector } from "../../lib/vector.ts";
import { validateGameTurnAction } from "./game-turn-action-validator.ts";
import { assertEquals } from "@std/assert/equals";

describe("validateGameTurnAction (Invalid)", () => {
  it("Unknown action", () => {
    const inState = minimalGame;
    // deno-lint-ignore no-explicit-any
    const action: any = {
      type: "PlayerActionType.Invalid",
    };

    const isValid = validateGameTurnAction(inState, action);
    assertEquals(isValid, false);
  });

  describe("PlaceUnits", () => {
    it("More than player placeableUnits, is invalid", () => {
      const inState = minimalGame;
      const action: PlayerAction = {
        type: PlayerActionType.PlaceUnits,
        playerId: 1,
        unitPlacement: {
          targetField: new Vector(2, 0),
          units: 5,
        },
      };

      const isValid = validateGameTurnAction(inState, action);
      assertEquals(isValid, false);
    });

    it("On field not owned, is invalid", () => {
      const inState = minimalGame;
      const action: PlayerAction = {
        type: PlayerActionType.PlaceUnits,
        playerId: 1,
        unitPlacement: {
          targetField: new Vector(1, 0),
          units: 2,
        },
      };

      const isValid = validateGameTurnAction(inState, action);
      assertEquals(isValid, false);
    });
  });

  describe("Build Units", () => {
    it("More than player placeable money, is invalid", () => {
      const inState = structuredClone(minimalGame);
      const action: PlayerAction = {
        type: PlayerActionType.BuildUnit,
        playerId: 1,
        buildInstruction: {
          targetField: new Vector(2, 0),
          numberOfUnits: 5,
        },
      };

      const isValid = validateGameTurnAction(inState, action);
      assertEquals(isValid, false);
    });

    it("On field not owned, is invalid", () => {
      const inState = structuredClone(minimalGame);
      inState.playersStatus[1].money = 100;
      const action: PlayerAction = {
        type: PlayerActionType.PlaceUnits,
        playerId: 1,
        unitPlacement: {
          targetField: new Vector(1, 0),
          units: 2,
        },
      };

      const isValid = validateGameTurnAction(inState, action);
      assertEquals(isValid, false);
    });
  });
});
