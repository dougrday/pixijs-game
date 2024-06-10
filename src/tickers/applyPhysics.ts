import { Container, Ticker } from "pixi.js";
import { GameObject } from "../objects/GameObject";

const dragCoefficient = 0.1; // A simple drag coefficient, adjust based on experimentation
const gravity = 2.3;

/**
 * Applies game object velocity during a tick.
 * @param container The container that is applying velocity.
 * @param renderer The renderer, so we know the bounds of the velocity (for bouncing)
 * @returns A ticker updater.
 */
export const applyPhysics = (container: Container) => (ticker: Ticker) => {
    for (const child of container.children) {
        if (child instanceof GameObject) {
            // Apply gravity (positive y-direction is assumed to be downwards)
            child.force.y = child.mass * gravity; // Gravity force added to the existing force

            // Calculate drag based on current velocity and update forces
            let velocityMagnitude = Math.sqrt(
                child.velocity.x ** 2 + child.velocity.y ** 2,
            );
            if (velocityMagnitude !== 0) {
                let dragForceX =
                    -dragCoefficient * child.velocity.x * velocityMagnitude;
                let dragForceY =
                    -dragCoefficient * child.velocity.y * velocityMagnitude;
                child.force.x += dragForceX;
                child.force.y += dragForceY;
            }

            // Calculate acceleration from force and mass
            // a = F / m
            let ax = child.force.x / child.mass;
            let ay = child.force.y / child.mass;

            // Update velocity
            // v = v0 + a * t
            child.velocity.x += ax * ticker.deltaTime;
            child.velocity.y += ay * ticker.deltaTime;

            // Update position
            // x = x0 + v * t
            child.x += child.velocity.x * ticker.deltaTime;
            child.y += child.velocity.y * ticker.deltaTime;

            // Reset forces after update (important for the next cycle)
            child.force.x = 0;
            child.force.y = 0;
        }
    }
    return container;
};
