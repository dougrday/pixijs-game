import { Texture } from "pixi.js";
import { TerrainType } from "../types/TerrainType";
import { Unit } from "./Unit";

export class Tile {
    public occupant: Unit | null = null;

    constructor(
        public texture: Texture,
        public terrain: TerrainType,
        public x: number,
        public y: number,
        public elevation = 0,
    ) {}
}
