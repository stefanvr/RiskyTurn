import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import {
  BuildFinishedEvent,
  PlayerEventType,
} from "../interaction/game-player-events.ts";
import { minimalGame } from "../test-game-states.ts";
import { GameState } from "../game-state.ts";
import {
  adminReceiveConstructedUnits,
  adminUnitsReady,
} from "./game-turn-admin-receive-constructed-units.ts";
import { Vector } from "../../lib/vector.ts";

describe("Units constructed", () => {
  let state: GameState;
  let events: BuildFinishedEvent[];

  beforeAll(() => {
    state = structuredClone(minimalGame);
    state.mapStatus.fields[0][1].unitsUnderConstruction = 2;
    state.mapStatus.fields[0][2].unitsUnderConstruction = 3;
    events = adminUnitsReady(state)!;
  });

  describe("Action result Event", () => {
    it("Units moved from underConstruction to constructed", () => {
      assertEquals(events, [
        {
          type: PlayerEventType.BuildFinished,
          build: {
            target: {
              field: new Vector(1, 0),
              units: 2,
              unitsUnderConstruction: 0,
            },
          },
        },
        {
          type: PlayerEventType.BuildFinished,
          build: {
            target: {
              field: new Vector(2, 0),
              units: 3,
              unitsUnderConstruction: 0,
            },
          },
        },
      ]);
    });
  });

  describe("Event result applied", () => {
    beforeAll(() => {
      adminReceiveConstructedUnits(state, events);
    });

    it("Field units, updated", () => {
      assertEquals(state.mapStatus.fields[0][1].units, 2);
      assertEquals(state.mapStatus.fields[0][1].unitsUnderConstruction, 0);
      assertEquals(state.mapStatus.fields[0][2].units, 3);
      assertEquals(state.mapStatus.fields[0][2].unitsUnderConstruction, 0);
    });
  });
});
