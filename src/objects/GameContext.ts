import { Application, Ticker } from "pixi.js";
import { Controllers } from "../controllers/controllers";

export interface GameContext {
    app: Application;
    controllers: Controllers;
    ticker: Ticker;
}
