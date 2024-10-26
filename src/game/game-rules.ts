import { FieldType } from "./game-elements.ts";

export type fieldRule = {
  live: boolean;
};

export type GameRules = {
  fields: {
    [key in FieldType]: fieldRule;
  };
};

export const defaultRules = {
  fields: {
    [FieldType.None]: { live: false },
    [FieldType.Dirt]: { live: true },
    [FieldType.Stone]: { live: false },
  },
};
