import { Application, Container } from "pixi.js";
import { Mario } from "../objects/Mario";
import { compose } from "../tickers/compose";
import { applyVelocity } from "../tickers/applyVelocity";
import { applyDrag } from "../tickers/applyDrag";
import { applyBounceOffWalls } from "../tickers/applyBounceOffWalls";

export class Screensaver extends Container {
    app: Application;
    mario: Mario;

    static async preload() {
        await Mario.preload();
    }

    constructor(app: Application) {
        super();

        this.app = app;
        this.mario = Mario.build();

        this.mario.velocity = {
            x: 2,
            y: 2,
        };

        this.mario.x = this.app.renderer.width / 2 - this.mario.width / 2;
        this.mario.y = this.app.renderer.height / 2 - this.mario.height / 2;
        this.addChild(this.mario);

        // Handle window resizing
        window.addEventListener("resize", () => {
            this.mario.x = window.innerWidth / 2 - this.mario.width / 2;
            this.mario.y = window.innerHeight / 2 - this.mario.height / 2;
            this.mario.velocity = {
                x: 2,
                y: 2,
            };
        });

        // Handle update
        const updater = compose(
            applyVelocity,
            applyBounceOffWalls({ renderer: app.renderer }),
            applyDrag,
        );
        app.ticker.add(updater(this));
    }
}
