import {
  defaultPlayerConfig,
  GameConfig,
  MapConfig,
} from "../game/configuration/game-config.ts";
import { FieldType } from "../game/game-elements.ts";
import { GameBuilder } from "../game/configuration/game-builder.ts";

export const MinimalMap: MapConfig = {
  fields: [[
    { fieldType: FieldType.Dirt, playerId: 1 },
    { fieldType: FieldType.Dirt },
  ], [
    { fieldType: FieldType.Stone },
    { fieldType: FieldType.Stone },
  ]],
};
export const MinimaGameConfig: GameConfig = {
  players: defaultPlayerConfig,
  mapConfig: MinimalMap,
};

export const minimalGame = new GameBuilder().createGame(MinimaGameConfig);
