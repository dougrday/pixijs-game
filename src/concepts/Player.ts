import { Unit } from "../objects/Unit";

export class Player {
    constructor(
        public id: number,
        public name: string,
        public units: Unit[] = [],
    ) {}
}
