import { Container, Ticker } from "pixi.js";
import { GameObject } from "../objects/GameObject";

/**
 * Applies game object velocity during a tick.
 * @param container The container that is applying velocity.
 * @param renderer The renderer, so we know the bounds of the velocity (for bouncing)
 * @returns A ticker updater.
 */
export const applyVelocity = (container: Container) => (_: Ticker) => {
    for (const child of container.children) {
        if (child instanceof GameObject) {
            // Apply velocity
            child.x += child.velocity.x;
            child.y += child.velocity.y;
        }
    }
    return container;
};
