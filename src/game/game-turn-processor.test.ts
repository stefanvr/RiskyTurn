import { processGameTurn } from "./game-turn-processor.ts";
import { GamePhase } from "./game-state.ts";
import { assertEquals } from "@std/assert/equals";
import { PlayerActionType, TurnActions } from "./game-actions.ts";
import { Vector } from "../lib/vector.ts";
import { minimalGame } from "./test-game-states.ts";

Deno.test("GameBuilder: After place in units, game in playing phase", () => {
  const inState = structuredClone(minimalGame);
  const actions: TurnActions = [{
    type: PlayerActionType.PlaceUnits,
    playerId: 1,
    unitPlacement: {
      targetField: new Vector(0, 1),
      units: 2,
    },
  }];

  const outState = processGameTurn(inState, actions);

  assertEquals(outState.gameStatus.phase, GamePhase.playing);
});
