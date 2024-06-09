import { EventEmitter } from "pixi.js";

export enum Key {
    ArrowDown = "ArrowDown",
    ArrowLeft = "ArrowLeft",
    ArrowRight = "ArrowRight",
    ArrowUp = "ArrowUp",
    Enter = "Enter",
    Escape = "Escape",
    Shift = "Shift",
    Space = " ",
    Tab = "Tab",
}

export class Keyboard {
    events = new EventEmitter();
    keys: Partial<Record<Key, boolean>>;

    constructor() {
        this.keys = {};

        window.addEventListener("keydown", (e) => this.handleKeyDown(e));
        window.addEventListener("keyup", (e) => this.handleKeyUp(e));
    }

    protected handleKeyDown(event: KeyboardEvent) {
        this.events.emit("keydown", event);
        if (event.shiftKey) {
            this.keys[Key.Shift] = true;
        }
        this.keys[event.key as Key] = true;
    }

    protected handleKeyUp(event: KeyboardEvent) {
        this.events.emit("keyup", event);
        if (event.shiftKey) {
            delete this.keys[Key.Shift];
        }
        delete this.keys[event.key as Key];
    }

    public isKeyDown(key: Key) {
        return key in this.keys;
    }
}
