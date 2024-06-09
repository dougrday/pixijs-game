import { Container, Ticker } from "pixi.js";
import { GameObject } from "../objects/GameObject";

/**
 * Applies drag to object velocity.
 * @param container The sprite container.
 * @returns A ticker updater.
 */
export const applyDrag = (container: Container) => (_: Ticker) => {
    for (const child of container.children) {
        if (child instanceof GameObject) {
            // Add some drag to the velocity
            if (child.velocity.x < -0.001) {
                child.velocity.x += child.drag;
                if (child.velocity.x > 0) {
                    child.velocity.x = 0;
                }
            } else if (child.velocity.x > 0.001) {
                child.velocity.x -= child.drag;
                if (child.velocity.x < 0) {
                    child.velocity.x = 0;
                }
            }
            if (child.velocity.y < -0.001) {
                child.velocity.y += child.drag;
                if (child.velocity.y > 0) {
                    child.velocity.y = 0;
                }
            } else if (child.velocity.y > 0.001) {
                child.velocity.y -= child.drag;
                if (child.velocity.y < 0) {
                    child.velocity.y = 0;
                }
            }
        }
    }
    return container;
};
