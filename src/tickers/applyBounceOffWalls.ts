import { Container, Ticker } from "pixi.js";
import { GameObject } from "../objects/GameObject";
import { HasBounds } from "../types";

interface BounceOffWallsSettings {
    /** The boundaries of the wall */
    bounds: HasBounds;
    /** What percentage of velocity is preserved on a bounce */
    preservation: number;
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
                    child.x >= settings.bounds.width - child.width
                ) {
                    child.velocity.x = -(
                        child.velocity.x * settings.preservation
                    );
                }
                // Bounce off vertical walls
                if (
                    child.y <= 0 ||
                    child.y >= settings.bounds.height - child.height
                ) {
                    child.velocity.y = -(
                        child.velocity.y * settings.preservation
                    );
                }
            }
        }
        return container;
    };
