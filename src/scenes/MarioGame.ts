import { Container, Ticker } from "pixi.js";
import { GameContext } from "../objects/GameContext";
import { Mario } from "../objects/Mario";
import { positionCentered } from "../position/positionCentered";
import { applyBounds } from "../tickers/applyBounds";
import { applyPhysics } from "../tickers/applyPhysics";
import { compose } from "../tickers/compose";

export class MarioGame extends Container {
    mario: Mario;
    updater: (ticker: Ticker) => void;

    static async preload() {
        await Mario.preload();
    }

    constructor(protected context: GameContext) {
        super();

        this.mario = Mario.build(context);
        positionCentered(this.mario, context.app.renderer);
        this.addChild(this.mario);

        // Handle update
        this.updater = compose(
            applyPhysics,
            applyBounds(context.app.renderer),
        )(this);

        context.ticker.add(this.updater);
    }
}
