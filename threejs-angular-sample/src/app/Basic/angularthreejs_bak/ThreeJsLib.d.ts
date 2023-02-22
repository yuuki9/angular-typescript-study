import * as THREE from 'three';
import * as Struct from './Struct';
import { GISControlClass } from './Class/GISControlClass';
import { LightControlClass } from './Class/LightControlClass';
import { CameraControlClass } from './Class/CameraControlClass';
import { ObjectControlClass } from './Class/ObjectControlClass';
export interface ThreeLayer {
    name: string;
    objGrp: THREE.Group;
    visible?: boolean;
    viewDistanceMin?: number;
    viewDistanceMax?: number;
    isPOIMerge?: boolean;
    mergePOIObj?: THREE.Object3D;
    mergePOIText?: string;
    isCreatingPOIObj: boolean;
}
export interface ThreeMouse {
    x: number;
    y: number;
}
export declare class ThreeJSLib {
    AnimateEvent?: Function;
    AddLayerEvent?: Function;
    AddObjectEvent?: Function;
    AddPOIEvent?: Function;
    AddLineEvent?: Function;
    AddPolygonEvent?: Function;
    ClickObjectEvent?: Function;
    LightControl: LightControlClass;
    CameraControl: CameraControlClass;
    ObjectControl: ObjectControlClass;
    GISControl: GISControlClass;
    container: HTMLDivElement;
    private scene;
    private camera;
    private renderer;
    private labelRenderer;
    camBenchmarkObj?: THREE.Mesh;
    private stats;
    private clock;
    private _tempDeltaTime;
    private camLookatEvent;
    private mergeIconPath;
    private mergeIconName;
    private mergeIconType;
    private globalLight;
    private mapControl;
    private editControls;
    cam2DMode: boolean;
    private rate2D;
    private raycaster;
    private mouse;
    private isModelTargeting;
    private targetingObj?;
    private targetingLengh;
    private layerGrp;
    private clickableObj;
    private cameraGrp;
    private enableRenderMode;
    /**
     * THREEJS를 표시하는 라이브러리
     * @param divElement 표시될 DIV를 입력
     * @param camPosition 카메라의 초기 위치 지정
     * @param cam2DMode 2D모드로 사용할 경우
     * @param rate2D 2D모드의 배율을 지정 (1 = 원본 해상도 배율) 기본값 : 5
     * @param viewStats 리소스 모니터링 처리
     */
    constructor(divElement: HTMLDivElement, camPosition?: THREE.Vector3, renderDistanceMin?: number, renderDistanceMax?: number, cam2DMode?: boolean, rate2D?: number);
    /**
     * POI 아이콘이 머지될 때 쓰이는 아이콘 경로 지정 (아이콘이 있는 폴더의 경로를 지정)
     * 총 아이콘의 갯수에 따라 아이콘 불러오는 파일명이 "[갯수].png"로 정의됨
     * @param mergeIconPath 파일이 있는 폴더의 경로
     * @param mergeIconName 아이콘의 네임 규칙 숫자를 제외한 파일의 이름 정의 (특문포함)
     * @param mergeIconType 파일의 확장자 정의
     */
    SetMergeIconPath(mergeIconPath: string, mergeIconName?: string, mergeIconType?: string): void;
    /**
     * 랜더링 되는 처리를 시작/정지함
     * @param value
     */
    SetEnableRendering(value: boolean): void;
    /**
     * 화면의 클릭좌표를 기준으로 클릭가능한 오브젝트들의 목록을 리턴함
     * @param ThreejsScreenPosX 콘테이너 기준의 상대적인 화면좌표(X)
     * @param ThreejsScreenPosY 콘테이너 기준의 상대적인 화면좌표(Y)
     * @returns 클릭좌표에 걸리는 모든 오브젝트 (클릭속성 있어야함)
     */
    GetWindowPosToObjects(ThreejsScreenPosX: number, ThreejsScreenPosY: number): THREE.Object3D[];
    /**
     * 마우스 포인트 좌표를 입력하면 해당 마우스 좌표에 걸리는 오브젝트가 있는지 확인하고 오브젝트가 닿은 포인트좌표를 리턴함
     * @param mPosX 마우스 좌표X
     * @param mPosY 마우스 좌표Y
     */
    GetWindowPosToObjectpoint(ThreejsScreenPosX: number, ThreejsScreenPosY: number): THREE.Vector3 | undefined;
    SetViewStats(): void;
    SetAxesHelper(): void;
    LayerRefresh(): void;
    /** 백그라운드 컬러를 지정 */
    SetBackgroundColor(color: THREE.Color): void;
    /**
     * THREE에 할당된 씬정보를 가저옴
     * @returns THREE에 할당된 씬정보
     */
    GetScene(): THREE.Scene;
    /**
     * 지정한 이름으로 레이어를 생성
     * @param LayerName 레이어그룹에 등록된 레이어명
     * @returns 생성된 레이어 오브젝트
     */
    CreateLayer(layerName: string): ThreeLayer;
    /**
     * 오브젝트가 이미 있으면 이미 있는 오브젝트를 가져오고 없으면 새로 빈 오브젝트를 만듬
     * @param layerName 레이어 이름
     * @param objName 오브젝트 이름
     * @returns 생성된 오브젝트
     */
    CreateObject(layerName: string, objName: string): THREE.Object3D;
    /**
     * 할달된 레이어를 이름으로 찾아 제거함
     * @param LayerName 레이어그룹에 등록된 레이어명
     * @returns 할달된 레이어가 있어서 제거가 된 경우 True
     */
    RemoveLayerFromName(layerName: string): boolean;
    /**
     * 레이어 그룹에 등록된 모든 레이어이름을 가져옴
     * @returns 레이어의 이름 리스트
     */
    GetLayerGrpInNames(): string[];
    /**
     * 레이어 그룹에 등록된 레이어를 가져옴
     * @param layerName 레이어그룹에 등록된 레이어명
     * @returns 레이어 그룹에 있으면 반환값을 반환하고 없으면 undefined를 반환
     */
    GetLayer(layerName: string): ThreeLayer | undefined;
    /**
     * 레이어안에 들어 있는 오브젝트의 모든 이름을 가져옴
     * @param layerName 레이어그룹에 등록된 레이어명
     * @returns 레이어에 등록된 오브젝트의 이름 리스트
     */
    GetLayerInObjectNames(layerName: string): string[];
    /**
     * 레이어 안에 있는 오브젝트를 이름으로 찾아서 오브젝트를 가져옴
     * @param layerName 레이어그룹에 등록된 레이어명
     * @param objName 레이어에 등록된 오브젝트명
     * @returns 찾은 오브젝트가 있을 경우 반환값을 반환하고 없으면 undefined를 반환
     */
    GetLayerInObject(layerName: string, objName: string): THREE.Object3D | undefined;
    /**
     * 레이어에 할당된 오브젝트를 이름으로 찾아서 제거함
     * @param layerName 레이어그룹에 등록된 레이어명
     * @param objName 레이어에 등록된 오브젝트명
     * @returns 있을 경우 제거하고 True를 반환 없을 경우 False를 반환
     */
    RemoveLayerInObjectFromName(layerName: string, objName: string): boolean;
    /**
     * 레이어에 할당된 오브젝트를 찾아서 제거함
     * @param targetObj 삭제할 오브젝트
     * @returns 있을 경우 제거하고 True를 반환 없을 경우 False를 반환
     */
    RemoveLayerInObject(targetObj: THREE.Object3D): boolean;
    RemoveClickableObject(targetObj: THREE.Object3D): void;
    DisposeThreejsObject(obj: THREE.Object3D): void;
    /**
     * 레이어 그룹에 레이어가 있는지 확인하고 레이어를 반환
     * @param layerName 레이어그룹에 등록된 레이어명
     * @returns 레이어 그룹에 있으면 반환값을 반환하고 없으면 undefined를 반환
     */
    IsExistLayer(layerName: string): boolean;
    /**
     * 레이어 안에 오브젝트가 있는지 확인
     * @param layerName 레이어그룹에 등록된 레이어명
     * @param objName 레이어에 등록된 오브젝트명
     * @returns true/false
     */
    IsExistLayerInObjectName(layerName: string, objName: string): boolean;
    /**
     * 레이어 안에 오브젝트가 있는지 확인
     * @param object 찾을 오브젝트
     * @returns true/false
     */
    IsExistLayerInObject(object: THREE.Object3D): boolean;
    SetDistanceVisibleWithObject(basicObj: THREE.Camera, targetObj: THREE.Object3D, minViewDistance?: number, maxViewDistance?: number): void;
    /**
     * 수정모드를 변경함
     * @param mode 수정모드에 대한 속성을 지정함
     * @param swich enable, show_xyz의 on/off를 위해 사용
     */
    SetEditMode(mode: Struct.TransfromControlSetMode, swich?: boolean): void;
    /**
     * 수정모드를 사용할 오브젝트를 추가
     * @param obj 적용할 오브젝트
     */
    SetEditModeObj(obj: THREE.Object3D): void;
    /**
     * 수정모드를 종료함
     */
    EndEditModeObj(): void;
    SetSceneSize(innerWidth: number, innerHeight: number): void;
    /**
     * 오브젝트를 클릭가능하도록 클릭가능 목록에 추가
     * @param obj 클릭할 오브젝트
     * @returns
     */
    AddClickableObj(obj: THREE.Object3D): boolean;
    private Animate;
}
