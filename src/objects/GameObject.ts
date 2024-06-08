import { Sprite, Texture, TextureSourceLike } from "pixi.js";

export interface Velocity {
    x: number;
    y: number;
}

export class GameObject extends Sprite {
    /**
     * The velocity of the game object.
     */
    velocity: Velocity = {
        x: 0,
        y: 0,
    };

    /**
     * Creates a game object from a texture.
     */
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
