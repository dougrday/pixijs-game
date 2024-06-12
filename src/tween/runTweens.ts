import { Tween } from "@tweenjs/tween.js";
import { Ticker } from "pixi.js";

/**
 * Adds tweens to the given ticker, then removes it when the tweens have completed.
 * @param ticker The ticker to add tweens to.
 * @param tweens The tween(s) to run.
 */
export const addTweensToTicker = <T extends Record<string, any>>(
    ticker: Ticker,
    ...tweens: Tween<T>[]
): Promise<void> => {
    return new Promise((resolve) => {
        let update: (() => void) | undefined;
        update = () => {
            let anyUpdated = false;
            for (const tween of tweens) {
                if (tween.update()) {
                    anyUpdated = true;
                }
            }
            if (!anyUpdated && update) {
                ticker.remove(update);
                resolve();
            }
        };
        ticker.add(update);
    });
};
