import {AppScene} from "./app-scene";


export class App {

    scene: AppScene;

    preload() {
    }

    create() {
    }

    changeScene(scene: AppScene) {
        if (this.scene) {
            this.scene.destroy();
        }
        scene.app = this;
        this.scene = scene;
        this.scene.create();
    }

    destroy() {
        this.scene.destroy();
        this.scene = null;
    }

    update(delta: number) {
        this.scene.update(delta);
    }
}

