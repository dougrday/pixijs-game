import { Assets, Container, Sprite, Texture } from "pixi.js";
import { GameContext } from "./GameContext";
import { Tile } from "./Tile";
import { TerrainType } from "../types/TerrainType";

export class Grid extends Container {
    public tiles: Tile[] = [];

    static async preload() {
        await Assets.load("assets/tile-house-on-grass.webp");
    }

    constructor(
        public context: GameContext,
        public tilesAcross: number,
        public tilesDown: number,
    ) {
        super();

        const texture = Texture.from("assets/tile-house-on-grass.webp");

        this.tiles = [];
        for (let y = 0; y < tilesDown; y++) {
            for (let x = 0; x < tilesAcross; x++) {
                const elevation = 0; //Math.floor(Math.random() * 4); // Random elevation from 0 to 3
                this.tiles.push(
                    new Tile(texture, TerrainType.Plain, x, y, elevation),
                );
            }
        }

        this.drawIsometricGrid();
    }

    drawIsometricGrid() {
        const tileSize = 128; // Assuming the height of the tile, width will be considered double
        const tileWidth = tileSize * 2;

        // Depth sorting
        this.tiles.sort(
            (a, b) => a.x + a.y - (b.x + b.y) || b.elevation - a.elevation,
        );

        // Draw tiles based on sorted order
        for (const tile of this.tiles) {
            const sprite = Sprite.from(tile.texture);
            sprite.setSize(tileWidth, tileWidth);

            // Position adjustments for isometric perspective
            sprite.x =
                (tile.x - tile.y) * (tileWidth / 2) +
                this.context.app.renderer.width / 2;
            sprite.y =
                (tile.x + tile.y) * (tileSize / 2) -
                (tile.elevation * tileSize) / 2; // Adjust y based on elevation

            this.addChild(sprite);
        }
    }
}
