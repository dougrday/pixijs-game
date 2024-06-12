import { Easing, Tween } from "@tweenjs/tween.js";
import { AdvancedBloomFilter, GodrayFilter } from "pixi-filters";
import { Container } from "pixi.js";
import { Player } from "../concepts/Player";
import { GameContext } from "../objects/GameContext";
import { Grid } from "../objects/Grid";
import { addTweensToTicker } from "../tween/runTweens";

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
        this.grid.filters = [
            new AdvancedBloomFilter({
                blur: 8,
                brightness: 1,
                quality: 4,
                threshold: 0.5,
            }),
            new GodrayFilter({
                alpha: 1,
                angle: 160,
                gain: 0.6,
                lacunarity: 2.75,
                time: 0,
            }),
        ];
        this.players = players;

        this.addChild(this.grid);

        addTweensToTicker(
            context.ticker,
            new Tween(this.grid)
                .to(
                    {
                        pivot: {
                            x: 600,
                            y: 800,
                        },
                        scale: { x: 2, y: 2 },
                    },
                    2000,
                )
                .easing(Easing.Quintic.Out)
                .start(),
        ).then(() =>
            addTweensToTicker(
                context.ticker,
                new Tween(this.grid)
                    .delay(3000)
                    .to(
                        {
                            pivot: {
                                x: -600,
                                y: 400,
                            },
                            scale: { x: 0.5, y: 0.5 },
                        },
                        1000,
                    )
                    .easing(Easing.Quintic.Out)
                    .start(),
            ),
        );
    }

    getCurrentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    nextTurn(): void {
        this.currentPlayerIndex =
            (this.currentPlayerIndex + 1) % this.players.length;
    }
}
