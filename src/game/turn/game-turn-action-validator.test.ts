import { describe, it } from "jsr:@std/testing/bdd";
import { minimalGame } from "../test-game-states.ts";
import { PlayerAction, PlayerActionType } from "../interaction/game-actions.ts";
import { Vector } from "../../lib/vector.ts";
import { validateGameTurnAction } from "./game-turn-action-validator.ts";
import { assertEquals } from "@std/assert/equals";

describe("validateGameTurnAction", () => {
  describe("Action pass", () => {
    it("In game phase placing, is valid", () => {
      const inState = minimalGame;
      const action: PlayerAction = {
        type: PlayerActionType.Pass,
      };

      const isValid = validateGameTurnAction(inState, action);
      assertEquals(isValid, true);
    });
  });

  describe("PlaceUnits", () => {
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

    it("On field owned, is valid", () => {
      const inState = minimalGame;
      const action: PlayerAction = {
        type: PlayerActionType.PlaceUnits,
        playerId: 1,
        unitPlacement: {
          targetField: new Vector(0, 0),
          units: 2,
        },
      };

      const isValid = validateGameTurnAction(inState, action);
      assertEquals(isValid, true);
    });
  });
});
