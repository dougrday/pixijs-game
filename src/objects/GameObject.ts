import { Sprite, Texture, TextureSourceLike } from "pixi.js";

export interface Velocity {
    x: number;
    y: number;
}

export class GameObject extends Sprite {
    velocity: Velocity = {
        x: 0,
        y: 0,
    };

    static from(source: Texture | TextureSourceLike, skipCache?: boolean) {
        const object = new GameObject(
            source instanceof Texture
                ? source
                : Texture.from(source, skipCache),
        );

        return object;
    }

    private constructor(texture: Texture) {
        super(texture);
    }
}
