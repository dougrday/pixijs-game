import { Sprite, Texture, TextureSourceLike } from "pixi.js";
import { Velocity } from "../types";

export class GameObject extends Sprite {
    drag = 0.01;
    force: Velocity = {
        x: 0,
        y: 0,
    };
    mass = 1;

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
