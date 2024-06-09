import { Container, Ticker } from "pixi.js";
import { GameObject } from "../objects/GameObject";

const gravity = 9.81; // Earth's gravity in m/s^2

/**
 * Applies gravity to items within the container.
 * @param container The sprite container.
 * @returns A ticker updater.
 */
export const applyGravity = (container: Container) => (ticker: Ticker) => {
    for (const child of container.children) {
        if (child instanceof GameObject) {
            // Apply gravity to the y-velocity
            child.velocity.y += (gravity * ticker.deltaTime) / 60; // assuming 60 fps
        }
    }
    return container;
};
