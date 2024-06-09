import { Sprite, Texture, TextureSourceLike } from "pixi.js";

export interface Vector2 {
    x: number;
    y: number;
}

export type Velocity = Vector2;

export class GameObject extends Sprite {
    drag = 0.01;

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

    protected constructor(texture: Texture) {
        super(texture);
    }
}
