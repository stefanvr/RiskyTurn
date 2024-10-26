import { FieldStatus, GameState } from "./game-state.ts";
import { GameRules } from "./game-rules.ts";

export function updatePlayerIncome(state: GameState) {
  const allFields = state.mapStatus.fields
    .flatMap((fieldRow) => fieldRow)
    .filter((f) => state.rules.fields[f.fieldType].live);

  Object.entries(state.playersStatus).forEach(([playerId, player]) => {
    player.money += receiveMoney(+playerId, allFields, state.rules);
  });
}

function receiveMoney(
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
