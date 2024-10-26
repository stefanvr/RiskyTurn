import { describe, it } from "jsr:@std/testing/bdd";
import { processGameTurn } from "./game-turn-processor.ts";
import { GamePhase } from "./game-state.ts";
import { assertEquals } from "@std/assert/equals";
import { minimalGame } from "./test-game-states.ts";

describe("processGameTurn (valid actions)", () => {
  describe("PlaceUnit", () => {
    const outState = processGameTurn(minimalGame, []);

    it("Status change from placing to playing", () => {
      assertEquals(outState.gameStatus.phase, GamePhase.playing);
    });
  });
});
