import { Grid } from "../objects/Grid";
import { Player } from "../concepts/Player";
import { Container } from "pixi.js";
import { GameContext } from "../objects/GameContext";
import { runTween } from "../tween/runTween";
import { Easing, Tween } from "@tweenjs/tween.js";

export class Game extends Container {
    public grid: Grid;
    public players: Player[];
    public currentPlayerIndex: number = 0;

    static async preload() {
        await Grid.preload();
    }

    constructor(
        protected context: GameContext,
        players: Player[],
        gridWidth: number,
        gridHeight: number,
    ) {
        super();

        this.grid = new Grid(context, gridWidth, gridHeight);
        this.players = players;

        this.addChild(this.grid);

        // First zoom
        runTween(
            context.ticker,
            new Tween(this.grid)
                .to({ pivot: { x: 600, y: 600 }, scale: { x: 2, y: 2 } }, 1000)
                .easing(Easing.Quadratic.InOut)
                .start(),
        );
        // .then(() =>
        //     // Second zoom
        //     runTween(
        //         context.ticker,
        //         new Tween(this.grid)
        //             .to(
        //                 {
        //                     pivot: { x: -800, y: 200 },
        //                     scale: { x: 0.5, y: 0.5 },
        //                 },
        //                 1000,
        //             )
        //             .easing(Easing.Quadratic.InOut)
        //             .start(),
        //     ),
        // );
    }

    getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    nextTurn(): void {
        this.currentPlayerIndex =
            (this.currentPlayerIndex + 1) % this.players.length;
    }
}
