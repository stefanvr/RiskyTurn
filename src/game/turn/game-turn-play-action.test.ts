import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { PlayerAction, PlayerActionType } from "../interaction/game-actions.ts";
import { Vector } from "../../lib/vector.ts";
import { minimalGame } from "../test-game-states.ts";
import { playGameTurnAction } from "./game-turn-play-action.ts";
import { PlayerEventType } from "../interaction/game-player-events.ts";
import { FieldType } from "../game-elements.ts";

describe("playGameTurnAction (valid actions)", () => {
  describe("PlaceUnit", () => {
    const state = structuredClone(minimalGame);
    state.mapStatus.fields = [[
      { fieldType: FieldType.Dirt, playerId: null, units: 0 },
      { fieldType: FieldType.Dirt, playerId: 1, units: 1 },
    ]];

    const action: PlayerAction = {
      type: PlayerActionType.PlaceUnits,
      playerId: 1,
      unitPlacement: {
        targetField: new Vector(1, 0),
        units: 2,
      },
    };
    const event = playGameTurnAction(state, action);

    it("Unit placed on assigned field", () => {
      assertEquals(state.mapStatus.fields[0][1].units, 1 + 2);
    });

    it("NoF placement units (2), deducted with 2 to zero", () => {
      assertEquals(state.playersStatus[action.playerId].placeableUnits, 0);
    });

    it("Player event is returned", () => {
      console.log(state.mapStatus);
      assertEquals(event, {
        type: PlayerEventType.UnitsPlaced,
        playerId: action.playerId,
        placementResult: {
          targetField: action.unitPlacement.targetField,
          units: 1 + 2,
        },
      });
    });
  });
});
