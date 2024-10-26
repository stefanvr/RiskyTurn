import { FieldType } from "../game-elements.ts";

export type fieldRule = {
  live: boolean;
};

export type GameRules = {
  income: {
    baseIncome: number;
    fieldIncome: number;
  };
  fields: {
    [key in FieldType]: fieldRule;
  };
};

export const defaultRules = {
  income: {
    baseIncome: 2,
    fieldIncome: 1,
  },
  fields: {
    [FieldType.None]: { live: false },
    [FieldType.Dirt]: { live: true },
    [FieldType.Stone]: { live: false },
  },
};
