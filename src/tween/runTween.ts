import { Tween } from "@tweenjs/tween.js";
import { Ticker } from "pixi.js";

/**
 * Runs a tween using the given ticker, then removes it.
 * @param ticker The ticker to use for smooth zooming.
 * @param tween The tween to run.
 */
export const runTween = <T extends Record<string, any>>(
    ticker: Ticker,
    tween: Tween<T>,
): Promise<void> => {
    return new Promise((resolve) => {
        const update = () => tween.update();
        tween.onComplete(() => {
            ticker.remove(update);
            resolve();
        });
        ticker.add(update);
    });
};
