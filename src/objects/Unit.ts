import { Player } from "../concepts/Player";
import { StatusEffect } from "../types";
import { Tile } from "./Tile";

export class Unit {
    constructor(
        public attack: number,
        public defense: number,
        public health: number,
        public id: number,
        public name: string,
        public player: Player,
        public speed: number,
        public statusEffects: StatusEffect[] = [],
    ) {}

    moveToTile(targetTile: Tile): void {
        // Implement movement logic, e.g., updating tile occupancy
    }

    attackTarget(target: Unit): void {
        // Implement attack logic, calculating damage based on attack, defense, etc.
    }
}
