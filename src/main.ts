import { Application } from "pixi.js";
import { HelloWorld } from "./HelloWorld";

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
    await HelloWorld.preload();

    app.stage.addChild(new HelloWorld(app));

    document.body.appendChild(app.canvas);
};

main();
