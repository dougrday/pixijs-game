import { Container, Renderer, Ticker } from "pixi.js";
import { GameObject } from "../objects/GameObject";

interface BounceOffWallsSettings {
    preservation: number;
    renderer: Renderer;
}

/**
 * Ensures objects stay in-bounds to the renderer.
 * @param renderer The renderer.
 * @param container The container.
 * @returns A ticker updater.
 */
export const applyBounceOffWalls =
    (settings: BounceOffWallsSettings) =>
    (container: Container) =>
    (_: Ticker) => {
        for (const child of container.children) {
            if (child instanceof GameObject) {
                // Bounce off horizontal walls
                if (
                    child.x <= 0 ||
                    child.x >= settings.renderer.width - child.width
                ) {
                    child.velocity.x = -(
                        child.velocity.x * settings.preservation
                    );
                }
                // Bounce off vertical walls
                if (
                    child.y <= 0 ||
                    child.y >= settings.renderer.height - child.height
                ) {
                    child.velocity.y = -(
                        child.velocity.y * settings.preservation
                    );
                }
            }
        }
        return container;
    };
