import { assertEquals } from "jsr:@std/assert";
import { GameBuilder } from "./game-builder.ts";
import { GamePhase } from "./game-state.ts";

Deno.test("GameBuilder: Create game, game in placing phase", () => {
  const g = new GameBuilder();
  const game = g.createGame({});
  assertEquals(game.gameStatus, { phase: GamePhase.placing });
});
