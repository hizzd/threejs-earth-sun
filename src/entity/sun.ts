import {Entity} from "../core/entity";
import {
    AmbientLight, Color, ImageUtils,
    Mesh,
    MeshBasicMaterial,
    PointLight, SphereBufferGeometry
} from "three";
import {Lensflare, LensflareElement} from "three/examples/jsm/objects/Lensflare";

import {
    GodRaysEffect,
    EffectComposer,
    EffectPass,
    RenderPass,
    KernelSize,
    BlendFunction,
    BloomEffect
    // @ts-ignore
} from "postprocessing";


export class SunEntity extends Entity {
    ambientLight: AmbientLight;
    pointLight: PointLight;
    lightSphere: Mesh;
    lensFlare: Lensflare;
    composer: EffectComposer;

    create(): void {
        this.scene.add(this.ambientLight = new AmbientLight(0x2c3e50));
        this.scene.add(this.pointLight = new PointLight(0xffffff, 1.5));
        this.pointLight.position.setZ(-500);
        const lightSphere = new Mesh(
            new SphereBufferGeometry(60, 32, 32),
            new MeshBasicMaterial({
                color: 0xffddaa,
                alphaTest: 0,
                transparent: true,
                fog: false
            }),
        );
        this.pointLight.add(this.lightSphere = lightSphere);

        let godraysEffect = new GodRaysEffect(this.scene.camera, lightSphere, {
            resolutionScale: 0.75,
            kernelSize: KernelSize.SMALL,
            density: 0.96,
            decay: 0.93,
            weight: 0.3,
            exposure: 0.55,
            samples: 60,
            clampMax: 1.0,
            blendFunction: BlendFunction.SCREEN
        });
        godraysEffect.dithering = true;

        const bloomEffect = new BloomEffect({
            blendFunction: BlendFunction.SCREEN,
            kernelSize: KernelSize.MEDIUM,
            resolutionScale: 0.5,
            distinction: 3.8
        });

        bloomEffect.blendMode.opacity.value = 2.5;

        const effectPass = new EffectPass(this.scene.camera, bloomEffect, godraysEffect);
        effectPass.renderToScreen = true;
        this.composer = new EffectComposer(this.scene.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.scene.camera));
        this.composer.addPass(effectPass);

        const flareColor = new Color(0xffffff);
        flareColor.setHSL(0.55, 0.9, 1.0);
        const lensFlare = this.lensFlare = new Lensflare();
        lensFlare.addElement(new LensflareElement(ImageUtils.loadTexture("assets/flare1.jpg"), 960, 0, flareColor));
        lensFlare.addElement(new LensflareElement(ImageUtils.loadTexture("assets/flare6.jpg"), 1280, 0, new Color("rgb(168,156,77)")));
        lensFlare.addElement(new LensflareElement(ImageUtils.loadTexture("assets/flare4.jpg"), 1280, 0, flareColor));
        lensFlare.addElement(new LensflareElement(ImageUtils.loadTexture("assets/flare2.jpg"), 100, 0.3, flareColor));
        lensFlare.addElement(new LensflareElement(ImageUtils.loadTexture("assets/flare3.jpg"), 280, 0.4, flareColor));
        lensFlare.addElement(new LensflareElement(ImageUtils.loadTexture("assets/flare5.jpg"), 620, 0.5, new Color("rgb(1,31,255)")));
        lensFlare.addElement(new LensflareElement(ImageUtils.loadTexture("assets/flare3.jpg"), 300, 0.6, new Color("rgb(15,171,18)")));
        lensFlare.addElement(new LensflareElement(ImageUtils.loadTexture("assets/flare3.jpg"), 310, 0.7, new Color("rgb(171,0,42)")));
        lensFlare.addElement(new LensflareElement(ImageUtils.loadTexture("assets/flare5.jpg"), 790, 0.8, new Color("rgb(11,127,13)")));
        lensFlare.addElement(new LensflareElement(ImageUtils.loadTexture("assets/flare2.jpg"), 350, 0.9, new Color("rgb(0,23,176)")));
        lensFlare.addElement(new LensflareElement(ImageUtils.loadTexture("assets/flare5.jpg"), 800, 1.0, new Color("rgb(99,80,14)")));
        this.pointLight.add(lensFlare);
    }

    destroy(): void {
        this.scene.remove(this.ambientLight, this.pointLight);
        this.ambientLight = undefined;
        this.pointLight = undefined;
        this.lightSphere = undefined;
        this.composer = undefined;
        this.lensFlare = undefined;
    }

    update(delta: number): void {
        super.update(delta);
    }

}
