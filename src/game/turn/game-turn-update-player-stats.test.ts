import { describe, it } from "jsr:@std/testing/bdd";
import { FieldType } from "../game-elements.ts";
import { assertEquals } from "@std/assert/equals";
import { updatePlayerStats } from "./game-turn-update-player-stats.ts";
import { minimalGame } from "../test-game-states.ts";

describe("updatePlayerStats - calcDomination", () => {
  const PlayerId = 1;

  it("When no field conquered, Player has 0% ", () => {
    const state = structuredClone(minimalGame);
    state.mapStatus.fields = [[
      { fieldType: FieldType.Dirt, playerId: null, units: 0 },
    ]];

    updatePlayerStats(state);

    assertEquals(state.playersStatus[PlayerId].mapDomination, 0);
  });

  it("When 1 out 3 fields conquered, Player has 33% ", () => {
    const state = structuredClone(minimalGame);
    state.mapStatus.fields = [[
      { fieldType: FieldType.Dirt, playerId: PlayerId, units: 0 },
      { fieldType: FieldType.Dirt, playerId: null, units: 0 },
      { fieldType: FieldType.Dirt, playerId: null, units: 0 },
    ]];

    updatePlayerStats(state);

    assertEquals(state.playersStatus[PlayerId].mapDomination, 33);
  });

  it("When 1 out 3 conquered and one dead field, Player has 50% ", () => {
    const state = structuredClone(minimalGame);
    state.mapStatus.fields = [[
      { fieldType: FieldType.Dirt, playerId: PlayerId, units: 0 },
      { fieldType: FieldType.Dirt, playerId: null, units: 0 },
      { fieldType: FieldType.None, playerId: null, units: 0 },
      { fieldType: FieldType.Stone, playerId: null, units: 0 },
    ]];

    updatePlayerStats(state);

    assertEquals(state.playersStatus[PlayerId].mapDomination, 50);
  });
});
