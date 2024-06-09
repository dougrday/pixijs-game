import { Container, Ticker } from "pixi.js";

type ApplyFunction = (container: Container) => (ticker: Ticker) => void;

export const compose = (...funcs: ApplyFunction[]): ApplyFunction => {
    return (container: Container) => {
        return (ticker: Ticker) => {
            funcs.forEach((func) => {
                const handle = func(container);
                handle(ticker);
            });
        };
    };
};
