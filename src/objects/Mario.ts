import { Assets, Texture, Ticker } from "pixi.js";
import { Key } from "../controllers/keyboard";
import { GameObject } from "../objects/GameObject";
import { GameContext } from "./GameContext";

export class Mario extends GameObject {
    isJumping = false;
    jumpTime = 0;
    mass = 50;

    static async preload() {
        await Assets.load("assets/paper-mario.png");
    }

    static build(context: GameContext) {
        return new Mario(context, Texture.from("assets/paper-mario.png"));
    }

    private constructor(
        protected context: GameContext,
        texture: Texture,
    ) {
        super(texture);

        this.scale.x = 0.05;
        this.scale.y = 0.05;

        this.context.ticker.add((ticker) => this.updater(ticker));
    }

    protected continueJump(
        additionalForce: number,
        maxJumpDuration: number,
        deltaTime: number,
    ) {
        // Continue applying force if the jump button is still held down and the maximum duration isn't reached
        if (this.isJumping && this.jumpTime < maxJumpDuration) {
            this.velocity.y -= (additionalForce / this.mass) * deltaTime;
            this.jumpTime += deltaTime;
        }
    }

    initiateJump(jumpForce: number) {
        this.isJumping = true;
        this.velocity.y -= jumpForce / this.mass;
    }

    updater(ticker: Ticker) {
        if (this.context.controllers.keyboard.isKeyDown(Key.ArrowRight)) {
            this.force.x = 70;
        } else if (this.context.controllers.keyboard.isKeyDown(Key.ArrowLeft)) {
            this.force.x = -70;
        } else this.force.x = 0;

        if (this.context.controllers.keyboard.isKeyDown(Key.Space)) {
            if (!this.isJumping) {
                this.initiateJump(4000);
            } else this.continueJump(150, 20, ticker.deltaTime);
        } else {
            this.isJumping = false;
            this.jumpTime = 0;
        }
    }
}
