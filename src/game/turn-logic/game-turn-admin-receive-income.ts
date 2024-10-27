import { FieldStatus, GameState } from "../game-state.ts";
import { GameRules } from "../configuration/game-rules.ts";
import {
  IncomeEvent,
  PlayerEventType,
} from "../interaction/game-player-events.ts";

export function adminPayOutIncome(state: GameState): IncomeEvent[] {
  const allFields = state.mapStatus.fields
    .flatMap((fieldRow) => fieldRow)
    .filter((f) => state.rules.fields[f.fieldType].live);

  return Object.entries(state.playersStatus).map(([id, stat]): IncomeEvent => {
    return {
      type: PlayerEventType.Income,
      playerId: +id,
      income: stat.money + calculateIncome(+id, allFields, state.rules),
    };
  });
}

function calculateIncome(
  playerId: number,
  allFields: FieldStatus[],
  rules: GameRules,
) {
  const conquered = allFields
    .filter((field) => field.playerId === playerId)
    .length;

  return conquered > 0
    ? rules.income.baseIncome + ((conquered - 1) * rules.income.fieldIncome)
    : 0;
}

export function adminReceiveIncome(
  state: GameState,
  payedOutIncome: IncomeEvent[],
) {
  return payedOutIncome.forEach((income) => {
    state.playersStatus[income.playerId].money = income.income;
  });
}
