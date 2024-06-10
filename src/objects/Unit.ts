import { Player } from "../concepts/Player";
import { StatusEffect } from "../types";
import { Tile } from "./Tile";

export class Unit {
    constructor(
        public id: number,
        public name: string,
        public health: number,
        public attack: number,
        public defense: number,
        public speed: number,
        public player: Player,
        public statusEffects: StatusEffect[] = [],
    ) {}

    moveToTile(targetTile: Tile): void {
        // Implement movement logic, e.g., updating tile occupancy
    }

    attackTarget(target: Unit): void {
        // Implement attack logic, calculating damage based on attack, defense, etc.
    }
}
