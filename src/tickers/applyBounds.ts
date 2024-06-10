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
                const anchorLeft =
                    child.anchor.x !== 0 ? child.width * child.anchor.x : 0;
                const anchorTop =
                    child.anchor.y !== 0 ? child.height * child.anchor.y : 0;
                const x = child.x - anchorLeft;
                const y = child.y - anchorTop;
                // Ensure the object stays in bounds
                if (x < 0) {
                    child.x = anchorLeft;
                }
                if (x + child.width > boundary.width) {
                    child.x = boundary.width - child.width + anchorLeft;
                }
                if (y < 0) {
                    child.y = anchorTop;
                }
                if (y + child.height > boundary.height) {
                    child.y = boundary.height - child.height + anchorTop;
                }
            }
        }
        return container;
    };
