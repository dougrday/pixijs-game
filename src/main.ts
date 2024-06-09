import { Application } from "pixi.js";
import { Screensaver } from "./scenes/Screensaver";

const init = async (app: Application) => {
    await app.init();
    app.renderer.resize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
};

const main = async () => {
    const app = new Application();

    await init(app);
    await Screensaver.preload();

    app.stage.addChild(new Screensaver({ app }));

    document.body.appendChild(app.canvas);
};

main();
