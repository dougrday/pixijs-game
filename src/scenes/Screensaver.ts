import { Container, Ticker } from "pixi.js";
import { GameContext } from "../objects/GameContext";
import { Mario } from "../objects/Mario";
import { applyBounceOffWalls } from "../tickers/applyBounceOffWalls";
import { applyVelocity } from "../tickers/applyVelocity";
import { compose } from "../tickers/compose";
import { applyBounds } from "../tickers/applyBounds";
import { applyDrag } from "../tickers/applyDrag";
import { applyGravity } from "../tickers/applyGravity";

export class Screensaver extends Container {
    mario: Mario;
    updater: (ticker: Ticker) => void;

    static async preload() {
        await Mario.preload();
    }

    constructor(protected context: GameContext) {
        super();

        this.mario = Mario.build();

        this.mario.x =
            this.context.app.renderer.width / 2 - this.mario.width / 2;
        this.mario.y =
            this.context.app.renderer.height / 2 - this.mario.height / 2;
        this.addChild(this.mario);

        // Handle window resizing
        window.addEventListener("resize", () => {
            this.mario.x = window.innerWidth / 2 - this.mario.width / 2;
            this.mario.y = window.innerHeight / 2 - this.mario.height / 2;
        });

        // Handle update
        this.updater = compose(
            applyVelocity,
            applyBounds(context.app.renderer),
            applyBounceOffWalls({
                preservation: 0.4,
                renderer: context.app.renderer,
            }),
            applyGravity,
            applyDrag,
        )(this);
        context.app.ticker.add(this.updater);
    }
}
