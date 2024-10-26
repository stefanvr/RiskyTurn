import { assertEquals } from "jsr:@std/assert";
import { GameBuilder } from "./game-builder.ts";
import { GamePhase, type MapStatus } from "./game-state.ts";
import { defaultPlayerConfig, MapConfig } from "./game-config.ts";
import { FieldType } from "./game-elements.ts";

const MinimalMap: MapConfig = {
  fields: [[
    { fieldType: FieldType.Dirt, playerId: 1 },
    { fieldType: FieldType.Dirt },
  ]],
};

const MinimalMapStatus: MapStatus = {
  fields: [[
    { fieldType: FieldType.Dirt, playerId: 1, units: 0 },
    { fieldType: FieldType.Dirt, playerId: null, units: 0 },
  ]],
};

Deno.test("GameBuilder: Create game, game in placing phase", () => {
  const g = new GameBuilder();
  const config = { players: defaultPlayerConfig, mapConfig: MinimalMap };

  const game = g.createGame(config);

  assertEquals(game.gameStatus, { phase: GamePhase.placing });
  assertEquals(Object.entries(game.playersStatus).length, 2);
  assertEquals(game.mapStatus, MinimalMapStatus);
});
