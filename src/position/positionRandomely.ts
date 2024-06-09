import { Container } from "pixi.js";
import { HasBounds } from "../types";

/**
 * Positions a container randomely with a bounds.
 * @param container The container to position.
 * @param bounds The bounds.
 */
export const positionRandomely = (container: Container, bounds: HasBounds) => {
    container.x = Math.random() * (bounds.width - container.width);
    container.y = Math.random() * (bounds.height - container.height);
};
