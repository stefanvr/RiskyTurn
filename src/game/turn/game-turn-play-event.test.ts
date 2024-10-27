import { describe, it } from "@std/testing/bdd";
import { minimalGame } from "../test-game-states.ts";
import { playGameTurnAction } from "./game-turn-play-action.ts";

describe("playGameTurnEvent (Invalid)", () => {
  it("Unknown action, skipps silent", () => {
    const inState = minimalGame;
    // deno-lint-ignore no-explicit-any
    const action: any = {
      type: "PlayerEventType.Invalid",
    };

    playGameTurnAction(inState, action);
  });
});
