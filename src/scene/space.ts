// @ts-ignore
import {AppScene} from "../core/app-scene";
import {SunEntity} from "../entity/sun";
import {Clock, PerspectiveCamera, WebGLRenderer} from "three";
import {EarthEntity} from "../entity/earth";
import {OrbitControls} from "../controls/OrbitControls";

export class Space extends AppScene {
    camera: PerspectiveCamera;
    sun: SunEntity;
    earth: EarthEntity;
    controls: OrbitControls;
    clock = new Clock();


    create(): void {
        this.camera = new PerspectiveCamera(50,
            window.innerWidth / window.innerHeight, 0.3, 1000*200);
        this.renderer = new WebGLRenderer({
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.applyToDocument();
        window.addEventListener("resize", this.handleWindowChange);
        this.addEntity(this.earth = new EarthEntity());
        this.addEntity(this.sun = new SunEntity());

        this.controls = new OrbitControls(this.camera, this.renderer.domElement, window);
        this.controls.center.copy(this.earth.position);

        this.camera.position.set(-5,5,30);
    }

    handleWindowChange = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    destroy(): void {
        super.destroy();
        window.removeEventListener("onchange", this.handleWindowChange);
    }

    update(delta: number) {
        super.update(delta);
        this.controls.update();
        if (this.sun) {
            this.sun.composer.render(this.clock.getDelta());
        }

    }

}
