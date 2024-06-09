import { Container, Renderer, Ticker } from "pixi.js";
import { GameObject } from "../objects/GameObject";

interface ApplyBounceOffWalls {
    renderer: Renderer;
}

/**
 * Applies game object velocity during a tick.
 * @param container The container that is applying velocity.
 * @param renderer The renderer, so we know the bounds of the velocity (for bouncing)
 * @returns A ticker updater.
 */
export const applyBounceOffWalls =
    (settings: ApplyBounceOffWalls) =>
    (container: Container) =>
    (_: Ticker) => {
        for (const child of container.children) {
            if (child instanceof GameObject) {
                // Bounce off horizontal walls
                if (
                    child.x <= 0 ||
                    child.x >= settings.renderer.width - child.width
                ) {
                    child.velocity.x = -child.velocity.x;
                }
                // Bounce off vertical walls
                if (
                    child.y <= 0 ||
                    child.y >= settings.renderer.height - child.height
                ) {
                    child.velocity.y = -child.velocity.y;
                }
            }
        }
        return container;
    };
