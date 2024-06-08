import { Container, Renderer } from "pixi.js";
import { GameObject } from "../objects/GameObject";

export const applyVelocityTicker =
    (container: Container, renderer: Renderer) => () => {
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
                // Apply velocity
                child.x += child.velocity.x;
                child.y += child.velocity.y;
            }
        }
    };
