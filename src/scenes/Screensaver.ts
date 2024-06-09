import { Container, Ticker } from "pixi.js";
import { GameContext } from "../objects/GameContext";
import { Mario } from "../objects/Mario";
import { applyBounceOffWalls } from "../tickers/applyBounceOffWalls";
import { applyVelocity } from "../tickers/applyVelocity";
import { compose } from "../tickers/compose";
import { applyBounds } from "../tickers/applyBounds";
import { applyDrag } from "../tickers/applyDrag";
import { applyGravity } from "../tickers/applyGravity";
import { positionRandomely } from "../position/positionRandomely";

export class Screensaver extends Container {
    updater: (ticker: Ticker) => void;

    static async preload() {
        await Mario.preload();
    }

    constructor(protected context: GameContext) {
        super();

        // Generate 100 marios
        for (let i = 0; i < 100; i++) {
            const mario = Mario.build();
            // Position each one randomely
            positionRandomely(mario, context.app.renderer);
            // Add it to the container
            this.addChild(mario);
        }

        // Handle update
        this.updater = compose(
            applyVelocity,
            applyBounds(context.app.renderer),
            applyBounceOffWalls({
                bounds: context.app.renderer,
                preservation: 0.4,
            }),
            applyGravity,
            applyDrag,
        )(this);

        context.ticker.add(this.updater);
    }
}
