import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { GameBuilder } from "./game-builder.ts";
import { GamePhase, type MapStatus } from "./game-state.ts";
import { FieldType } from "./game-elements.ts";
import { MinimaGameConfig } from "./test-game-states.ts";

const MinimalMapStatus: MapStatus = {
  fields: [[
    { fieldType: FieldType.Dirt, playerId: 1, units: 0 },
    { fieldType: FieldType.Dirt, playerId: null, units: 0 },
  ]],
};

describe("GameBuilder", () => {
  const g = new GameBuilder();
  const game = g.createGame(MinimaGameConfig);

  it(`Game starts in phase: ${GamePhase.placing}`, () => {
    assertEquals(game.gameStatus, { phase: GamePhase.placing });
    assertEquals(Object.entries(game.playersStatus).length, 2);
    assertEquals(game.mapStatus, MinimalMapStatus);
  });

  it("Adds players status with 2 placeable Units", () => {
    assertEquals(Object.entries(game.playersStatus).length, 2);
    Object.values(game.playersStatus).forEach((ps) => {
      assertEquals(ps.placeableUnits, 2);
    });
  });

  it("Converts mapConfig to mapStatus correctly", () => {
    assertEquals(game.mapStatus, MinimalMapStatus);
  });

  it("Player stats are initialized correctly", () => {
    assertEquals(game.playersStatus[1].mapDomination, 50);
    assertEquals(game.playersStatus[2].mapDomination, 0);
  });
});
