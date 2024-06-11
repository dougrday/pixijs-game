import { Tween } from "@tweenjs/tween.js";
import { Container, Ticker } from "pixi.js";
import { Vector2 } from "../types";

type EasingFunction = (amount: number) => number;
interface ZoomToParameters {
    pivot?: Partial<Vector2>;
    scale?: Partial<Vector2>;
}

/**
 * Zooms the "camera" smoothly.
 * @param ticker The ticker to use for smooth zooming.
 * @param container The container to be zoomed.
 * @param to The zoom parameters.
 * @param duration The duration of the animation.
 * @param easing The easing function for the animation, if provided.
 */
export const zoomTo = (
    ticker: Ticker,
    container: Container,
    to: ZoomToParameters,
    duration?: number,
    easing?: EasingFunction,
) => {
    const tween = new Tween(container).to(to, duration).easing(easing);
    const update = () => tween.update();
    tween.onComplete(() => ticker.remove(update)).start();
    ticker.add(update);
};
