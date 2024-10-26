import { describe, it } from "jsr:@std/testing/bdd";
import { processGameTurn } from "./game-turn-processor.ts";
import { GamePhase } from "./game-state.ts";
import { assertEquals } from "@std/assert/equals";
import { PlayerAction, PlayerActionType } from "./game-actions.ts";
import { Vector } from "../lib/vector.ts";
import { minimalGame } from "./test-game-states.ts";

describe("processGameTurn (valid actions)", () => {
  describe("PlaceUnit", () => {
    const inState = structuredClone(minimalGame);
    const action: PlayerAction = {
      type: PlayerActionType.PlaceUnits,
      playerId: 1,
      unitPlacement: {
        targetField: new Vector(1, 0),
        units: 2,
      },
    };
    const outState = processGameTurn(inState, [action]);

    it("Unit placed on assigned field", () => {
      assertEquals(outState.gameStatus.phase, GamePhase.playing);
    });

    it("NoF placement units (2), deducted with 2 to zero ", () => {
      assertEquals(outState.playersStatus[action.playerId].placeableUnits, 0);
    });
  });
});
