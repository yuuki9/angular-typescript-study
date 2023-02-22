import * as THREE from 'three';
import { ThreeJSLib } from '../ThreeJsLib';
import { LocationColor } from '../Struct';
/**
 * 기준 위치로 부터 정해진 위치까지 주변의 데이터를 스트리밍으로 가져오는 모듈
 */
export declare class PointcloudStreamRender {
    private threeJsLib;
    private layerName;
    private targetObj?;
    private viewDistance;
    private maxLevel;
    private interval?;
    private isLocal;
    private locOriginPos;
    private pc_cd;
    private pc_idx;
    private maxX;
    private minX;
    private maxY;
    private minY;
    private maxZ;
    private minZ;
    private interX;
    private interY;
    private interZ;
    private splitLevel;
    private splitCntX;
    private splitCntY;
    private splitCntZ;
    private curTargetPosX;
    private curTargetPosY;
    private curTargetPosZ;
    private mkObject;
    private dataQueue;
    private loadWaitCnt;
    private pointSize;
    private pointCloudAPI;
    private isClickable;
    /**
     * (스트리밍) 포인트 클라우드 초기화
     * @param pointCloudAPI RestAPI 모듈 속성
     */
    constructor(pointCloudAPI: any, threeJsLib: ThreeJSLib, layerName: string, position: THREE.Vector3, targetObj: THREE.Object3D<THREE.Event> | undefined, viewDistance: number, maxLevel?: number, pointSize?: number, isLocal?: boolean);
    dispose(delTime?: number): void;
    Init(pc_cd: string, pc_idx: number, loadBaseLevel?: boolean, isClickable?: boolean): void;
    SetTargetObj(obj: THREE.Object3D): void;
    RequestPointCloudData(reqData: any): void;
    render(): void;
    SetPointSize(pointSize: number): void;
}
/**
 * 서버에 있는 포인트 클라우드를 저레벨부터 지정한 레벨까지 모두 렌더링 하는 모듈
 */
export declare class PointcloudRender {
    private threeJsLib;
    private layerName;
    private maxLevel;
    private interval?;
    private isLocal;
    private locOriginPos;
    private locColors?;
    private pc_cd;
    private pc_idx;
    private maxX;
    private minX;
    private maxY;
    private minY;
    private maxZ;
    private minZ;
    private interX;
    private interY;
    private interZ;
    private splitLevel;
    private splitCntX;
    private splitCntY;
    private splitCntZ;
    private dataQueue;
    private loadWaitCnt;
    private pointSize;
    private pointCloudAPI;
    private isClickable;
    /**
     * 서버에 있는 포인트 클라우드를 저레벨부터 지정한 레벨까지 모두 렌더링 하는 모듈
     * @param pointCloudAPI RestAPI 모듈 속성
     */
    constructor(pointCloudAPI: any, threeJsLib: ThreeJSLib, layerName: string, position: THREE.Vector3, maxLevel?: number, pointSize?: number, isLocal?: boolean);
    dispose(finish?: Function, delTime?: number): void;
    Init(pc_cd: string, pc_idx: number, loadBaseLevel?: boolean, isClickable?: boolean, locColors?: LocationColor[]): void;
    /**
     * 로딩을 일시 정지함
     */
    PauseLoading(): void;
    /**
     * 로딩을 다시 시작함
     */
    ResumeLoading(): void;
    RequestPointCloudData(reqData: any): void;
    SetPointSize(pointSize: number): void;
}
