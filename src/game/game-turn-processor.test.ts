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

  describe("PlaceUnit", () => {
    const inState = structuredClone(minimalGame);
    inState.mapStatus.fields[0][1].playerId = 1;
    const outState = processGameTurn(inState, []);

    it("Status change from placing to finished", () => {
      assertEquals(outState.gameStatus.phase, GamePhase.finished);
    });

    it("Player stats reflect new state", () => {
      assertEquals(outState.playersStatus[1].mapDomination, 100);
      assertEquals(outState.playersStatus[2].mapDomination, 0);
    });
  });
});
