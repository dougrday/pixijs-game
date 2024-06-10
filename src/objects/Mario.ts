import { Assets, Texture, Ticker } from "pixi.js";
import { Key } from "../controllers/keyboard";
import { GameObject } from "../objects/GameObject";
import { GameContext } from "./GameContext";

export class Mario extends GameObject {
    isJumping = false;
    jumpTime = 0;
    mass = 50;
    targetScaleX = 0.05;

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

        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
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
        const keyboard = this.context.controllers.keyboard;

        // Running left/right
        if (keyboard.isKeyDown(Key.ArrowRight)) {
            // Shift key makes you run
            this.force.x = keyboard.isKeyDown(Key.Shift) ? 70 : 40;
            this.targetScaleX = -0.05;
        } else if (keyboard.isKeyDown(Key.ArrowLeft)) {
            // Shift key makes you run
            this.force.x = keyboard.isKeyDown(Key.Shift) ? -70 : -40;
            this.targetScaleX = 0.05;
        } else this.force.x = 0;

        // Make Mario turn around like paper
        if (this.scale.x > this.targetScaleX) {
            this.scale.x = Math.max(
                this.targetScaleX,
                this.scale.x - 0.01 * ticker.deltaTime,
            );
        } else if (this.scale.x < this.targetScaleX) {
            this.scale.x = Math.min(
                this.targetScaleX,
                this.scale.x + 0.01 * ticker.deltaTime,
            );
        }

        // Space bar to jump
        if (keyboard.isKeyDown(Key.Space)) {
            if (!this.isJumping) {
                // Initial jump force is stronger if you're running fast
                this.initiateJump(3500 + 20 * Math.abs(this.force.x));
            } else this.continueJump(100, 20, ticker.deltaTime);
        } else {
            this.isJumping = false;
            this.jumpTime = 0;
        }
    }
}
