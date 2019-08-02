import {Camera, Scene, WebGLRenderer} from "three";
import {Entity} from "./entity";
import {App} from "./app";

export abstract class AppScene extends Scene {
    app: App;
    camera: Camera;
    renderer: WebGLRenderer;
    private entities: Entity[] = [];

    abstract create(): void;

    applyToDocument() {
        const oldEl = document.getElementById("main-content");
        if (oldEl) {
            oldEl.remove();
        }
        document.body.appendChild(this.renderer.domElement).id = "main-content";
    }

    destroy(): void {
        this.removeEntity(...this.entities);
        this.app = undefined;
        this.camera = undefined;
        this.renderer = undefined;
    }


    addEntity(...entities: Entity[]) {
        for (const entity of entities) {
            entity.scene = this;
            entity.create();
            this.entities.push(entity);
        }
    }

    removeEntity(...entities: Entity[]) {

        for (const entity of entities) {
            const index = this.entities.indexOf(entity);
            if (index > -1) {
                entity.destroy();
                this.entities.splice(index, 1);
            }
        }
    }

    update(delta: number) {
        for (const entity of this.entities) {
            entity.update(delta);
        }
    }
}
