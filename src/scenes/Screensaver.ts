import { Container, Ticker } from "pixi.js";
import { GameContext } from "../objects/GameContext";
import { Mario } from "../objects/Mario";
import { positionRandomely } from "../position/positionRandomely";
import { applyBounds } from "../tickers/applyBounds";
import { applyPhysics } from "../tickers/applyPhysics";
import { compose } from "../tickers/compose";

export class Screensaver extends Container {
    updater: (ticker: Ticker) => void;

    static async preload() {
        await Mario.preload();
    }

    constructor(protected context: GameContext) {
        super();

        // Generate 100 marios
        for (let i = 0; i < 100; i++) {
            const mario = Mario.build(context);
            // Position each one randomely
            positionRandomely(mario, context.app.renderer);
            // Add it to the container
            this.addChild(mario);
        }

        // Handle update
        this.updater = compose(
            applyPhysics,
            applyBounds(context.app.renderer),
        )(this);

        context.ticker.add(this.updater);
    }
}
