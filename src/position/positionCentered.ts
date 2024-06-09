import { Container } from "pixi.js";
import { HasBounds } from "../types";

/**
 * Positions a container cenetered with a bounds.
 * @param container The container to position.
 * @param bounds The bounds.
 */
export const positionCentered = (container: Container, bounds: HasBounds) => {
    container.x = bounds.width / 2 - container.width / 2;
    container.y = bounds.height / 2 - container.height / 2;
};
