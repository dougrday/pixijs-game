import { Application } from "pixi.js";
import { Screensaver } from "./scenes/Screensaver";
import { GameContext } from "./objects/GameContext";

const init = async (app: Application) => {
    await app.init();
    app.renderer.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
};

const main = async () => {
    const app = new Application();
    const context: GameContext = { app, ticker: app.ticker };

    await init(app);
    await Screensaver.preload();

    app.stage.addChild(new Screensaver(context));

    document.body.appendChild(app.canvas);
};

main();
