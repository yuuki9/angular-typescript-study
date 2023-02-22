"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
const THREE = require("three");
class Models {
    constructor() { }
    ;
    static MakeTunnel(radius, height, tunnelTexturePath, planeTexturePath) {
        const tunnelTexture = new THREE.TextureLoader().load(tunnelTexturePath);
        const tunnelGeometry = new THREE.CylinderGeometry(radius, radius, height, 50, height, true);
        const tunnelMaterial = new THREE.MeshBasicMaterial({ color: 0x848A83, side: THREE.DoubleSide, map: tunnelTexture });
        const cylinder = new THREE.Mesh(tunnelGeometry, tunnelMaterial);
        cylinder.rotateX(-Math.PI / 2);
        const planeTexture = new THREE.TextureLoader().load(planeTexturePath);
        const planeGeometry = new THREE.BoxGeometry(radius * 1.3, height, radius / 20, radius, height, radius / 20);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x848A83, side: THREE.FrontSide, map: planeTexture });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        cylinder.add(plane); //추가하기
        plane.position.set(0, 0, -radius + (radius / 5));
        tunnelTexture.dispose();
        planeTexture.dispose();
        tunnelGeometry.dispose();
        planeGeometry.dispose();
        tunnelMaterial.dispose();
        planeMaterial.dispose();
        return cylinder;
    }
}
exports.Models = Models;
