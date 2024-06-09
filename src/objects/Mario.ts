import { Assets, Texture } from "pixi.js";
import { GameObject } from "../objects/GameObject";

export class Mario extends GameObject {
    static async preload() {
        await Assets.load("assets/mario.png");
    }

    static build() {
        return new Mario(Texture.from("assets/mario.png"));
    }

    private constructor(texture: Texture) {
        super(texture);

        this.scale.x = 0.2;
        this.scale.y = 0.2;
    }
}
