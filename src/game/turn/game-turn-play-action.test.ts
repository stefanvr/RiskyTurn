import { describe, it } from "@std/testing/bdd";
import { minimalGame } from "../test-game-states.ts";
import { assertEquals } from "@std/assert/equals";
import { playGameTurnAction } from "./game-turn-play-action.ts";

describe("playGameTurnAction (Invalid)", () => {
  it("Unknown action, return null event", () => {
    const inState = minimalGame;
    // deno-lint-ignore no-explicit-any
    const action: any = {
      type: "PlayerActionType.Invalid",
    };

    const isValid = playGameTurnAction(inState, action);
    assertEquals(isValid, null);
  });
});
