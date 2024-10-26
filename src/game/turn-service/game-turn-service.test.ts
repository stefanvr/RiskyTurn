import { describe, it } from "jsr:@std/testing/bdd";
import { processGameTurn } from "./game-turn-service.ts";
import { GamePhase } from "../game-state.ts";
import { assertEquals } from "@std/assert/equals";
import { minimalGame } from "../test-game-states.ts";

describe("processGameTurn (valid actions)", () => {
  describe("Starting game", () => {
    const inState = structuredClone(minimalGame);
    const outState = processGameTurn(inState, []);

    it("Status change from placing to playing", () => {
      assertEquals(outState.gameStatus.phase, GamePhase.Playing);
    });
  });

  describe("Finish game", () => {
    const inState = structuredClone(minimalGame);
    inState.mapStatus.fields[0][1].playerId = 1;
    const outState = processGameTurn(inState, []);

    it("Status change from placing to finished", () => {
      assertEquals(outState.gameStatus.phase, GamePhase.Finished);
    });

    it("Player stats reflect new state", () => {
      assertEquals(outState.playersStatus[1].mapDomination, 100);
      assertEquals(outState.playersStatus[2].mapDomination, 0);
    });

    it("Player receives income", () => {
      assertEquals(outState.playersStatus[1].money, 3);
      assertEquals(outState.playersStatus[2].money, 0);
    });
  });
});
