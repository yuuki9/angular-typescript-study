"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraControlClass = void 0;
const tween_js_1 = require("@tweenjs/tween.js");
const THREE = require("three");
class CameraControlClass {
    constructor(threeJsLib, camera, mapControl, zoomMin = 0.01, zoomMax = 10000) {
        this.threeJsLib = threeJsLib;
        this.camera = camera;
        this.mapControl = mapControl;
        this.mapControl.minDistance = zoomMin;
        this.mapControl.maxDistance = zoomMax;
    }
    /**
     * 컨트롤 방식을 1인칭 뷰 방식으로 변경
     */
    SetFirstPersonView(wheelSpeed = 0.01) {
        if (this.mapControl.maxPolarAngle == 0)
            return false;
        this.mapControl.enabled = false;
        this.mapControl.maxPolarAngle = Math.PI; // 하늘을 바라볼 수 있어야 하기 때문에 설정 처리
        this.threeJsLib.container.onwheel = ((wheelEvent) => {
            this.threeJsLib.CameraControl.SetZoom(this.threeJsLib.CameraControl.GetZoomValue() - (wheelEvent.deltaY * wheelSpeed / 100));
        });
        return true;
    }
    /**
     * 컨트롤 방식을 3인칭 뷰 방식으로 변경
     */
    SetThirdPersonView(wheelSpeed = 0.01) {
        if (this.mapControl.maxPolarAngle == 0)
            return false;
        this.mapControl.enabled = false;
        this.mapControl.maxPolarAngle = Math.PI / 2; //지형 아래로 떨어지지 않도록 처리
        this.threeJsLib.container.onwheel = ((wheelEvent) => {
            this.threeJsLib.CameraControl.SetZoom(this.threeJsLib.CameraControl.GetZoomValue() - (wheelEvent.deltaY * wheelSpeed / 100));
        });
        return true;
    }
    /**
     * 지도 컨트롤러 방식으로 변경
     */
    SetMapView() {
        //TODO 지형이 있으면 해당 지형에 맞춰서 높이값을 조정하는 부분이 필요함
        if (this.mapControl.maxPolarAngle == 0)
            return false;
        this.mapControl.enabled = true;
        this.mapControl.maxPolarAngle = Math.PI / 2; //지형 아래로 떨어지지 않도록 처리
        this.threeJsLib.container.onwheel = null;
        return true;
    }
    CamMoveAnimation(object, pos, moveTime = 500) {
        new tween_js_1.default.Tween(object)
            .to({
            x: pos.x,
            y: pos.y,
            z: pos.z
        }, moveTime)
            .easing(tween_js_1.default.Easing.Cubic.Out)
            .start();
    }
    /**
     * 카메라 기준점 변경
     * @param position 위치
     * @param isSmooth 부드러운이동
     * @param moveTime 이동시간 (ms)
     */
    SetCamPosition(position, isSmooth = false, moveTime = 500) {
        if (isSmooth)
            this.CamMoveAnimation(this.camera.position, position, moveTime);
        else
            this.camera.position.set(position.x, position.y, position.z);
    }
    /**
     * 카메라 시점 변경
     * @param position
     */
    SetCamViewPosition(position, isSmooth = false, moveTime = 500) {
        if (isSmooth)
            this.CamMoveAnimation(this.mapControl.target, position, moveTime);
        else
            this.mapControl.target.set(position.x, position.y, position.z);
    }
    SetCamRotation(rotate, isSmooth = false, moveTime = 500) {
        if (isSmooth) {
            const stPosition = { x: THREE.MathUtils.radToDeg(this.camera.rotation.x), y: THREE.MathUtils.radToDeg(this.camera.rotation.y), z: THREE.MathUtils.radToDeg(this.camera.rotation.z) };
            const tween = new tween_js_1.default.Tween(stPosition).to({ x: rotate.x, y: rotate.y, z: rotate.z }, moveTime).easing(tween_js_1.default.Easing.Cubic.Out).start();
            tween.onUpdate((obj) => {
                const getx = THREE.MathUtils.degToRad(obj.x);
                const gety = THREE.MathUtils.degToRad(obj.y);
                const getz = THREE.MathUtils.degToRad(obj.z);
                this.camera.rotation.set(getx, gety, getz);
            });
            tween.start();
        }
        else
            this.camera.rotation.set(THREE.MathUtils.degToRad(rotate.x), THREE.MathUtils.degToRad(rotate.y), THREE.MathUtils.degToRad(rotate.z));
    }
    /**
     * THREE에 할당된 카메라의 위치정보를 가져옴
     * @returns 카메라의 위치 정보 (THREE.Vector3)
     */
    GetCameraPosition() { return this.camera.position; }
    /**
     * THREE에 할당된 카메라의 방향정보를 가져옴
     * @returns 카메라의 방향 정보 (THREE.Euler)
     */
    GetCameraRotation() { return this.camera.rotation; }
    /**
     * 미니맵의 오른쪽 클릭으로 회전하는 기능을 막음
     * @param value true:설정 || false:해제
     */
    SetLockCamControl(value) { this.mapControl.enableRotate = !value; }
    SetZoomMin(zoomMin) { this.mapControl.minDistance = zoomMin; }
    SetZoomMax(zoomMax) { this.mapControl.maxDistance = zoomMax; }
    SetZoom(value) {
        if (value >= this.mapControl.maxDistance)
            value = this.mapControl.maxDistance;
        if (value <= this.mapControl.minDistance)
            value = this.mapControl.minDistance;
        this.camera.zoom = value;
        this.camera.updateProjectionMatrix();
    }
    GetZoomValue() { return this.camera.zoom; }
}
exports.CameraControlClass = CameraControlClass;
