import { Application } from "pixi.js";
import { Keyboard } from "./controllers/keyboard";
import { GameContext } from "./objects/GameContext";
import { MarioGame } from "./scenes/MarioGame";

const init = async (app: Application) => {
    await app.init();
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.ticker.maxFPS = 60;

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
    await MarioGame.preload();
    // Add the first scene to the stage
    app.stage.addChild(new MarioGame(context));

    document.body.appendChild(app.canvas);
};

main();
