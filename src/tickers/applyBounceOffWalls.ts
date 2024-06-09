import { Container, Renderer, Ticker } from "pixi.js";
import { GameObject } from "../objects/GameObject";

/**
 * Ensures objects stay in-bounds to the renderer.
 * @param renderer The renderer.
 * @param container The container.
 * @returns A ticker updater.
 */
export const applyBounceOffWalls =
    (renderer: Renderer) => (container: Container) => (_: Ticker) => {
        for (const child of container.children) {
            if (child instanceof GameObject) {
                // Bounce off horizontal walls
                if (child.x <= 0 || child.x >= renderer.width - child.width) {
                    child.velocity.x = -child.velocity.x;
                }
                // Bounce off vertical walls
                if (child.y <= 0 || child.y >= renderer.height - child.height) {
                    child.velocity.y = -child.velocity.y;
                }
            }
        }
        return container;
    };
