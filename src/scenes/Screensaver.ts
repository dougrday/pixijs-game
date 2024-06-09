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
    updater: (ticker: Ticker) => void;

    static async preload() {
        await Mario.preload();
    }

    constructor(protected context: GameContext) {
        super();

        // Generate 100 marios in random positions
        for (let i = 0; i < 100; i++) {
            const mario = Mario.build();
            mario.x =
                Math.random() * this.context.app.renderer.width -
                mario.width / 2;
            mario.y =
                Math.random() * this.context.app.renderer.height -
                mario.height / 2;
            this.addChild(mario);
        }

        // Handle update
        this.updater = compose(
            applyVelocity,
            applyBounds(context.app.renderer),
            applyBounceOffWalls({
                preservation: 0.3,
                renderer: context.app.renderer,
            }),
            applyGravity,
            applyDrag,
        )(this);

        context.app.ticker.add(this.updater);
    }
}
