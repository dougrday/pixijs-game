import { Grid } from "../objects/Grid";
import { Player } from "../concepts/Player";
import { Container } from "pixi.js";
import { GameContext } from "../objects/GameContext";

export class Game extends Container {
    public grid: Grid;
    public players: Player[];
    public currentPlayerIndex: number = 0;

    constructor(
        protected context: GameContext,
        players: Player[],
        gridWidth: number,
        gridHeight: number,
    ) {
        super();

        this.grid = new Grid(context, gridWidth, gridHeight);
        this.players = players;
    }

    getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    nextTurn(): void {
        this.currentPlayerIndex =
            (this.currentPlayerIndex + 1) % this.players.length;
    }
}
