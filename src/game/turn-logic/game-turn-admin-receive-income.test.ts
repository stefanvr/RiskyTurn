import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { IncomeEvent } from "../interaction/game-player-events.ts";
import { minimalGame } from "../test-game-states.ts";
import { GameState } from "../game-state.ts";
import {
  adminPayOutIncome,
  adminReceiveIncome,
} from "./game-turn-admin-receive-income.ts";

describe("Receive income", () => {
  let state: GameState;
  let events: IncomeEvent[];
  const PlayerId = 1;

  beforeAll(() => {
    state = structuredClone(minimalGame);
    state.playersStatus[PlayerId].money = 1;
    events = adminPayOutIncome(state)!;
  });

  describe("Action result Event", () => {
    it("Player event is returned", () => {
      assertEquals(events, [
        {
          income: 3,
          playerId: 1,
          type: "Income",
        },
        {
          income: 0,
          playerId: 2,
          type: "Income",
        },
      ]);
    });
  });

  describe("Event result applied", () => {
    beforeAll(() => {
      adminReceiveIncome(state, events);
    });

    it("Player income, updated", () => {
      assertEquals(state.playersStatus[PlayerId].money, 3);
    });
  });
});
