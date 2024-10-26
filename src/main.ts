import { App } from "./app.ts";

const canvas = document.getElementById("game") as HTMLCanvasElement;

const app = new App(canvas);
await app.start();
