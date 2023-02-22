import * as THREE from 'three';
import { ThreeJSLib } from "../ThreeJsLib";
declare class RestAPI {
    private http;
    private serverIP;
    private serverPort;
    constructor(httpClient: any, serverIP?: string, serverPort?: number);
    /**
     * 서버 정보 재설정
     * @param serverIP 서버아이피
     * @param serverPort 서버포트
     */
    Set(serverIP: string, serverPort: number): void;
    GetRequest(apiUrl?: string, dataRes?: Function, errRes?: Function, finish?: Function): void;
    PostRequest(apiUrl?: string, reqData?: any, dataRes?: Function, errRes?: Function, finish?: Function): void;
    PostRequestOption(apiUrl?: string, reqData?: any, options?: any, dataRes?: Function, errRes?: Function, finish?: Function): void;
}
export declare class MiniMapManager2 {
    threeJsLib: ThreeJSLib;
    miniThreeJsLib: ThreeJSLib;
    pointCloudAPI?: RestAPI;
    mapPosition: THREE.Vector3;
    mapContainer: HTMLDivElement;
    private minPosX;
    private minPosY;
    private widthSize;
    private heightSize;
    private isSyncTarget;
    private targetObj?;
    private targetPoi?;
    constructor(pointCloudAPI: RestAPI, threeJsLib: ThreeJSLib, targetObj: THREE.Object3D, mapPosition?: THREE.Vector3, targetImgPath?: string);
    MiniMapLoadAPI(pc_cd: string, pc_idx: number): void;
    SetCenterPosition(): void;
    SetSize(): void;
    private BlocksOutline;
    private BlocksMerge;
    /**
     * 지도 기능을 숨김
     * @param bool
     */
    SetVisible(bool: boolean): void;
    private SetMiniMapBlock;
    private SetMiniMapOutline;
    MiniMapPositionSync(value?: boolean): void;
}
export declare class MiniMapManager {
    mainDiv: HTMLDivElement;
    mapThreeJsLib: ThreeJSLib;
    pointCloudAPI: RestAPI;
    mapPosition: THREE.Vector3;
    private minPosX;
    private minPosY;
    constructor(mainDiv: HTMLDivElement, mapThreeJsLib: ThreeJSLib, pointCloudAPI: RestAPI);
    MiniMapLoadAPI(pc_cd: string, pc_idx: number): void;
    private BlocksMerge;
    private SetMiniMapBlock;
}
export {};
