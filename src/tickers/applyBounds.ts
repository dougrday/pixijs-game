import { Container, Ticker } from "pixi.js";
import { GameObject } from "../objects/GameObject";

interface HasBounds {
    width: number;
    height: number;
}

/**
 * Ensures objects stay in-bounds.
 * @param bounds The boundary.
 * @param container The container.
 * @returns A ticker updater.
 */
export const applyBounds =
    (boundary: HasBounds) => (container: Container) => (_: Ticker) => {
        for (const child of container.children) {
            if (child instanceof GameObject) {
                // Ensure the object stays in bounds
                if (child.x < 0) {
                    child.x = 0;
                }
                if (child.x + child.width > boundary.width) {
                    child.x = boundary.width - child.width;
                }
                if (child.y < 0) {
                    child.y = 0;
                }
                if (child.y + child.height > boundary.height) {
                    child.y = boundary.height - child.height;
                }
            }
        }
        return container;
    };
