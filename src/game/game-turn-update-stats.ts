import { FieldStatus, GameState } from "./game-state.ts";

export function updatePlayerStats(state: GameState) {
  const allFields = state.mapStatus.fields.flatMap((fieldRow) => fieldRow);

  Object.entries(state.playersStatus).forEach(([playerId, player]) => {
    player.mapDomination = calcDomination(+playerId, allFields);
  });
}

function calcDomination(playerId: number, allFields: FieldStatus[]) {
  const conquered = allFields
    .filter((field) => field.playerId === playerId)
    .length;

  return (conquered / allFields.length) * 100;
}
