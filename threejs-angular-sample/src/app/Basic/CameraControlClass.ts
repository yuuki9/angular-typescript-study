import { ThreeJSLib } from './angularthreejs/ThreeJsLib';

export class CameraControlClass {
    private threeJSLib: ThreeJSLib;
    constructor(threeJSLib: ThreeJSLib) {
        this.threeJSLib = threeJSLib;
    }

    /**
     * 컨트롤 방식을 1인칭 뷰 방식으로 변경
     * @param wheelSpeed 
     * @returns boolean
     */
    SetFirstPersonView(wheelSpeed: number = 0.01): boolean {
        return this.threeJSLib.CameraControl.SetFirstPersonView(wheelSpeed);
    }

    /**
     * 컨트롤 방식을 3인칭 뷰 방식으로 변경
     */
    SetThirdPersonView(wheelSpeed: number = 0.01): boolean {
        return this.threeJSLib.CameraControl.SetThirdPersonView(wheelSpeed);
    }

    /**
     * 지도 컨트롤러 방식으로 변경
     */
    SetMapView(): boolean {
        return this.threeJSLib.CameraControl.SetMapView();
    }
    /**
     * 카메라 기준점 변경
     * @param position 위치
     * @param isSmooth 부드러운이동
     * @param moveTime 이동시간 (ms)
     */
    SetCamPosition(position: THREE.Vector3, isSmooth: boolean = false, moveTime: number = 500) {
        this.threeJSLib.CameraControl.SetCamPosition(position, isSmooth, moveTime);
    }
    /**
     * 카메라 시점 변경
     * @param position
     */
    SetCamViewPosition(position: THREE.Vector3, isSmooth: boolean = false, moveTime: number = 500) {
        this.threeJSLib.CameraControl.SetCamViewPosition(position, isSmooth, moveTime);
    }
    SetCamRotation(rotate: THREE.Vector3, isSmooth: boolean = false, moveTime: number = 500) {
        this.threeJSLib.CameraControl.SetCamRotation(rotate, isSmooth, moveTime);
    }

    /**
     * THREE에 할당된 카메라의 위치정보를 가져옴
     * @returns 카메라의 위치 정보 (THREE.Vector3)
     */
    GetCameraPosition(): THREE.Vector3 {
        return this.threeJSLib.CameraControl.GetCameraPosition();
    }

    GetCameraRotation(): THREE.Euler {
        return this.threeJSLib.CameraControl.GetCameraRotation();
    }
    /**
     * 미니맵의 오른쪽 클릭으로 회전하는 기능을 막음
     * @param value true:설정 || false:해제
     */
    SetLockCamControl(value: boolean) {
        this.threeJSLib.CameraControl.SetLockCamControl(value);
    }

    SetZoomMin(zoomMin: number) {
        this.threeJSLib.CameraControl.SetZoomMin(zoomMin);
    }

    SetZoomMax(zoomMax: number) {
        this.threeJSLib.CameraControl.SetZoomMax(zoomMax);
    }

    SetZoom(value: number) {
        this.threeJSLib.CameraControl.SetZoom(value);
    }

    GetZoomValue(): number {
        return this.threeJSLib.CameraControl.GetZoomValue();
    }
}