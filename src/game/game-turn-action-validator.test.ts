import { minimalGame } from "./test-game-states.ts";
import { PlayerAction, PlayerActionType } from "./game-actions.ts";
import { Vector } from "../lib/vector.ts";
import { validateGameTurn } from "./game-turn-action-validator.ts";
import { assertEquals } from "@std/assert/equals";

Deno.test("validateGameTurn: Pass, in placing phase, is valid", () => {
  const inState = minimalGame;
  const action: PlayerAction = {
    type: PlayerActionType.Pass,
  };

  const isValid = validateGameTurn(inState, action);
  assertEquals(isValid, true);
});

Deno.test("validateGameTurn: PlaceUnits, on field not owned, is invalid", () => {
  const inState = minimalGame;
  const action: PlayerAction = {
    type: PlayerActionType.PlaceUnits,
    playerId: 1,
    unitPlacement: {
      targetField: new Vector(1, 0),
      units: 2,
    },
  };

  const isValid = validateGameTurn(inState, action);
  assertEquals(isValid, false);
});

Deno.test("validateGameTurn: PlaceUnits, on field owned, is valid", () => {
  const inState = minimalGame;
  const action: PlayerAction = {
    type: PlayerActionType.PlaceUnits,
    playerId: 1,
    unitPlacement: {
      targetField: new Vector(0, 0),
      units: 2,
    },
  };

  const isValid = validateGameTurn(inState, action);
  assertEquals(isValid, true);
});
