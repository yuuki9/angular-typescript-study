export { PointCloudConvertManager, XYZ, XYZ_RGBA, XYZ_RGBA_L } from './Lib/PointCloudConverter';
export { MiniMapManager, MiniMapManager2 } from './Managers/MiniMapManager';
export { PointcloudRender, PointcloudStreamRender } from './Managers/PointcloudManager';
import * as THREE from 'three';
export declare class ThreeUtils {
    constructor();
    static GetFirstParents(obj: THREE.Object3D): THREE.Object3D;
    static GetMiniMapSize(mainDiv: HTMLDivElement, mapWidthSize: number, maphHightSize: number): THREE.Vector2;
    static GetDegDisToPos(orginPos: THREE.Vector3, distance: number, hDegree: number, vDegree: number): THREE.Vector3;
    /** 두점과 거리를 알 때 수직으로 일정 거리 떨어진 기준 좌표를 구하는 공식 */
    static GetUpDownLineNewPos(pos1: THREE.Vector3, pos2: THREE.Vector3, distance: number): THREE.Vector3[];
    static GetIntersectionPoint(pos1St: THREE.Vector3, pos1Ed: THREE.Vector3, pos2St: THREE.Vector3, pos2Ed: THREE.Vector3): THREE.Vector3 | undefined;
}
