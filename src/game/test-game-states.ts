import {
  defaultPlayerConfig,
  GameConfig,
  MapConfig,
} from "./configuration/game-config.ts";
import { FieldType } from "./game-elements.ts";
import { GameBuilder } from "./configuration/game-builder.ts";

export const MinimalMap: MapConfig = {
  fields: [[
    { fieldType: FieldType.Stone },
    { fieldType: FieldType.Dirt },
    { fieldType: FieldType.Dirt, playerId: 1 },
  ]],
};
export const MinimaGameConfig: GameConfig = {
  players: defaultPlayerConfig,
  mapConfig: MinimalMap,
};

export const minimalGame = new GameBuilder().createGame(MinimaGameConfig);
