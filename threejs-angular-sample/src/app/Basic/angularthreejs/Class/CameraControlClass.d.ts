import * as THREE from 'three';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { ThreeJSLib } from '../ThreeJsLib';
export declare class CameraControlClass {
    private threeJsLib;
    private camera;
    private mapControl;
    constructor(threeJsLib: ThreeJSLib, camera: THREE.Camera, mapControl: MapControls, zoomMin?: number, zoomMax?: number);
    /**
     * 컨트롤 방식을 1인칭 뷰 방식으로 변경
     */
    SetFirstPersonView(wheelSpeed?: number): boolean;
    /**
     * 컨트롤 방식을 3인칭 뷰 방식으로 변경
     */
    SetThirdPersonView(wheelSpeed?: number): boolean;
    /**
     * 지도 컨트롤러 방식으로 변경
     */
    SetMapView(): boolean;
    private CamMoveAnimation;
    /**
     * 카메라 기준점 변경
     * @param position 위치
     * @param isSmooth 부드러운이동
     * @param moveTime 이동시간 (ms)
     */
    SetCamPosition(position: THREE.Vector3, isSmooth?: boolean, moveTime?: number): void;
    /**
     * 카메라 시점 변경
     * @param position
     */
    SetCamViewPosition(position: THREE.Vector3, isSmooth?: boolean, moveTime?: number): void;
    SetCamRotation(rotate: THREE.Vector3, isSmooth?: boolean, moveTime?: number): void;
    /**
     * THREE에 할당된 카메라의 위치정보를 가져옴
     * @returns 카메라의 위치 정보 (THREE.Vector3)
     */
    GetCameraPosition(): THREE.Vector3;
    /**
     * THREE에 할당된 카메라의 방향정보를 가져옴
     * @returns 카메라의 방향 정보 (THREE.Euler)
     */
    GetCameraRotation(): THREE.Euler;
    /**
     * 미니맵의 오른쪽 클릭으로 회전하는 기능을 막음
     * @param value true:설정 || false:해제
     */
    SetLockCamControl(value: boolean): void;
    SetZoomMin(zoomMin: number): void;
    SetZoomMax(zoomMax: number): void;
    SetZoom(value: number): void;
    GetZoomValue(): number;
}
