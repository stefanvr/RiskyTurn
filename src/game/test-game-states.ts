import { defaultPlayerConfig, GameConfig, MapConfig } from "./game-config.ts";
import { FieldType } from "./game-elements.ts";
import { GameBuilder } from "./game-builder.ts";

export const MinimalMap: MapConfig = {
  fields: [[
    { fieldType: FieldType.Dirt, playerId: 1 },
    { fieldType: FieldType.Dirt },
  ]],
};
export const MinimaGameConfig: GameConfig = {
  players: defaultPlayerConfig,
  mapConfig: MinimalMap,
};

export const minimalGame = new GameBuilder().createGame(MinimaGameConfig);
