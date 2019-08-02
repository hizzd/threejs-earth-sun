import {AppScene} from "./app-scene";

export abstract class Entity {
    scene: AppScene;

    abstract create(): void;

    abstract destroy(): void;

    update(delta: number): void {
    }
}
