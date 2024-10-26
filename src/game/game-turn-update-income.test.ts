import { describe, it } from "jsr:@std/testing/bdd";
import { FieldType } from "./game-elements.ts";
import { assertEquals } from "@std/assert/equals";
import { minimalGame } from "./test-game-states.ts";
import { updatePlayerIncome } from "./game-turn-update-income.ts";

describe("updatePlayerStats - calcMoney", () => {
  const PlayerId = 1;

  it("When no field conquered, Player receives 0", () => {
    const state = structuredClone(minimalGame);
    state.mapStatus.fields = [[
      { fieldType: FieldType.Dirt, playerId: null, units: 0 },
    ]];

    updatePlayerIncome(state);

    assertEquals(state.playersStatus[PlayerId].money, 0);
  });

  it("When 1 fields conquered, Player receives 2", () => {
    const state = structuredClone(minimalGame);
    state.playersStatus[PlayerId].money = 3;
    state.mapStatus.fields = [[
      { fieldType: FieldType.Dirt, playerId: PlayerId, units: 0 },
      { fieldType: FieldType.Dirt, playerId: null, units: 0 },
    ]];

    updatePlayerIncome(state);

    assertEquals(state.playersStatus[PlayerId].money, 3 + 2);
  });

  it("When 2 fields conquered, Player receives 2+1", () => {
    const state = structuredClone(minimalGame);
    state.mapStatus.fields = [[
      { fieldType: FieldType.Dirt, playerId: PlayerId, units: 0 },
      { fieldType: FieldType.Dirt, playerId: PlayerId, units: 0 },
      { fieldType: FieldType.Dirt, playerId: null, units: 0 },
    ]];

    updatePlayerIncome(state);

    assertEquals(state.playersStatus[PlayerId].money, 3);
  });
});
