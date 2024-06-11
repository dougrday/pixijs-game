import { Application } from "pixi.js";
import { Keyboard } from "./controllers/keyboard";
import { GameContext } from "./objects/GameContext";
import { Game } from "./scenes/Game";

const init = async (app: Application) => {
    await app.init();
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.ticker.maxFPS = 120;

    window.addEventListener("resize", () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
};

const main = async () => {
    const app = new Application();

    await init(app);

    // Build a game context
    const context: GameContext = {
        app,
        controllers: {
            keyboard: new Keyboard(),
        },
        ticker: app.ticker,
    };

    // Preload the first scene
    await Game.preload();
    // Add the first scene to the stage
    app.stage.addChild(new Game(context, [], 16, 16));

    document.body.appendChild(app.canvas);
};

main();
