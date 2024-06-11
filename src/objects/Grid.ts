import { Assets, Container, Sprite, Texture } from "pixi.js";
import { TerrainType } from "../types/TerrainType";
import { GameContext } from "./GameContext";
import { Tile } from "./Tile";

export class Grid extends Container {
    public tiles: Tile[] = [];

    static async preload() {
        await Assets.load([
            "assets/tiles/basic/grassland.webp",
            "assets/tiles/basic/tile-house-on-grass.webp",
            "assets/tiles/basic/road1.webp",
        ]);
    }

    constructor(
        public context: GameContext,
        public tilesAcross: number,
        public tilesDown: number,
    ) {
        super();

        const textures = [
            Texture.from("assets/tiles/basic/grassland.webp"),
            Texture.from("assets/tiles/basic/tile-house-on-grass.webp"),
            Texture.from("assets/tiles/basic/road1.webp"),
        ];

        this.tiles = [];
        for (let y = 0; y < tilesDown; y++) {
            for (let x = 0; x < tilesAcross; x++) {
                const elevation = 0;
                const tileIndex = Math.floor(Math.random() * 3);
                this.tiles.push(
                    new Tile(
                        textures[tileIndex],
                        TerrainType.Plain,
                        x,
                        y,
                        elevation,
                    ),
                );
            }
        }

        this.drawIsometricGrid();
    }

    drawIsometricGrid() {
        const tileSize = 128; // Assuming the height of the tile, width will be considered double
        const tileWidth = tileSize * 1.5;

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
