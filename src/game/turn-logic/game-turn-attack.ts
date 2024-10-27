import { GameState } from "../game-state.ts";
import { AttackAction } from "../interaction/game-actions.ts";
import {
  AttackingEvent,
  PlayerEventType,
} from "../interaction/game-player-events.ts";

export function isValidAttack(
  state: GameState,
  action: AttackAction,
): boolean {
  const fromField = state.mapStatus
    .fields[action.from.targetField.y][action.from.targetField.x];
  const toField =
    state.mapStatus.fields[action.to.targetField.y][action.to.targetField.x];
  // todo adjacency check
  return fromField.playerId === action.playerId &&
    fromField.units >= action.from.numberOfUnits &&
    state.rules.fields[toField.fieldType].live;
}

export function attack(
  _: GameState,
  action: AttackAction,
): AttackingEvent {
  return {
    type: PlayerEventType.Attacking,
    playerId: action.playerId,
    from: action.from,
    to: action.to,
  };
}

export function gameTurnAttacking(state: GameState, event: AttackingEvent) {
  const battleKey = `${event.to.targetField.x}#${event.to.targetField.y}`;
  let battle = state.turnBattles.get(battleKey);
  if (!battle) {
    battle = [];
    state.turnBattles.set(battleKey, battle);
  }
  battle.push(event);
}
