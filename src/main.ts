import { Application } from "pixi.js";
import { HelloWorld } from "./scenes/helloWorld";

const init = async (app: Application) => {
    await app.init({ width: 1280, height: 600 });
};

const main = async () => {
    // Main app
    const app = new Application();

    await init(app);
    await HelloWorld.preload();

    app.stage.addChild(new HelloWorld(app));

    document.body.appendChild(app.canvas);
};

main();
