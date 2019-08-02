import {Entity} from "../core/entity";
import {
    ImageUtils,
    Mesh, MeshLambertMaterial,
    MeshPhongMaterial, ShaderMaterial,
    SphereBufferGeometry,
    SphereGeometry, TangentSpaceNormalMap, Vector3
} from "three";
import {GlowShader} from "../shader/glow";

export class EarthEntity extends Entity {
    get position(): Vector3 {
        return this.mesh.position.clone();
    }

    mesh: Mesh;
    cloudMesh: Mesh;
    glowMesh: Mesh;

    create(): void {
        const geo = new SphereBufferGeometry(6, 64, 64);
        this.mesh = new Mesh(
            geo,
            new MeshPhongMaterial({
                shininess: 15,
                map: ImageUtils.loadTexture('assets/earth_diffuse.jpg'),
                specularMap: ImageUtils.loadTexture('assets/earth_specular.jpg'),
                normalMap: ImageUtils.loadTexture("assets/earth_normal.jpg"),
                normalMapType: TangentSpaceNormalMap,
            })
        );
        this.mesh.position.set(0, 0, 4);
        this.scene.add(this.mesh);
        const materialClouds = new MeshLambertMaterial({
            map: ImageUtils.loadTexture("assets/earth_cloud.png"),
            transparent: true
        });
        this.cloudMesh = new Mesh(geo, materialClouds);
        this.cloudMesh.scale.set(1.01, 1.01, 1.01);

        this.scene.add(this.cloudMesh);


        this.glowMesh = new Mesh(new SphereGeometry(6.2, 64, 64), new ShaderMaterial(new GlowShader(1, 10, 0x93cfef, this.scene.camera.position)));

        this.scene.add(this.glowMesh);
    }

    destroy(): void {
        this.scene.remove(this.mesh, this.cloudMesh, this.glowMesh);
        this.mesh = undefined;
        this.cloudMesh = undefined;
        this.glowMesh = undefined;
    }

    update(delta: number): void {
        this.cloudMesh.position.copy(this.mesh.position);
        this.glowMesh.position.copy(this.mesh.position);

        this.mesh.rotation.y -= 0.00003 * delta;

        let cloudSpeed = Math.random() * 0.00002;


        this.cloudMesh.rotation.y += cloudSpeed * delta;
        this.glowMesh.material['uniforms'].viewVector.value = this.scene.camera.position;
    }
}
