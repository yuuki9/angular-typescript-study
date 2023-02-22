import * as THREE from 'three';
import { ThreeJSLib } from "../ThreeJsLib";
export declare class GISControlClass {
    private threeJsLib;
    constructor(threeJsLib: ThreeJSLib);
    /**
     * 지면의 가이드를 보기 위해서 그라운드를 초기화
     * @param clickable 그라운드가 클릭가능한 속성으로 처리할지 선택
     */
    InitGound(clickable: boolean, size?: number): void;
    private surveyLayerName;
    private surveyCurrentPosition;
    private surveyObjNum;
    private surveyTempPointList;
    /**
     * 해당 모드를 실행하면 클릭 될 때마다 길이를 구하는 함수
     * 측량모드를 종료할 때는 CancelClacMode()를 사용하요 종료함
     * @param dotResourcePath 선과 선사이의 점의 POI를 만들 이미지
     */
    SetCalcDistanceMode(dotResourcePath?: string): void;
    /**
     * 해당 모드를 실행하면 클릭 될 때마다 도형을 그려 넓이를 구함
     * 도형을 그릴때 시계 또는 시계 반대 방향으로 통일해서 클릭해야함
     * 측량모드를 종료할 때는 CancelClacMode()를 사용하요 종료함
     */
    SetCalcMultiAreaMode(): void;
    /**
     * 측량모드를 종료함
     */
    CancelClacMode(): void;
    /**
     * (GIS기능) POI생성
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param imgPath 이미지의 경로
     * @param position 지점의 XYZ좌표 (lon, alt, lat)
     * @param size POI사이즈 지정
     * @param text POI의 텍스트를 지정
     */
    AddPOI(layerName: string, objName: string, clickable: boolean | undefined, imgPath: string | undefined, position: THREE.Vector3, size?: number, text?: string, dataKey?: string, dataValue?: any, minViewDistance?: number, maxViewDistance?: number, returnObj?: Function): void;
    /**
     * POI 오브젝트의 이미지를 변경하는 함수
     * @param POI POI 오브젝트
     * @param imgPath 변경 할 이미지 경로
     */
    ChangePOIImage(POI: THREE.Object3D, imgPath: string): void;
    /**
     * POI 오브젝트의 사이즈를 변경하는 함수
     * @param POI POI 오브젝트
     * @param size 변경할 사이즈
     */
    ChangePOISize(POI: THREE.Object3D, size: number): void;
    private SetCSSLabel;
    /**
     * (GIS기능) 라인생성
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param positions XYZ좌표를 가진 포인트 리스트 (첫점부터 연결된 라인으로 구성)
     * @param lineWidth 라인의 두께 지정
     * @param color 라인색상지정
     */
    AddLine(layerName: string, objName: string, clickable: boolean | undefined, positions: Array<THREE.Vector3>, lineWidth?: number, color?: THREE.Color, minViewDistance?: number, maxViewDistance?: number): boolean;
    /**
     * (GIS기능) 폴리곤(면)을 생성
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param meshPositions 면을 생성할 때 사용되는 점들의 위치 (순서 중요)
     * @param color 매쉬 색상 지정
     * @param opacity 매쉬 투명도 지정 (0~1) : default 1
     */
    AddPolygon(layerName: string, objName: string, clickable: boolean | undefined, meshPositions: Array<THREE.Vector3>, color?: THREE.Color, opacity?: number, minViewDistance?: number, maxViewDistance?: number): void;
    /**
     * AddPolygon을 사용한 오브젝트에 추가로 포지션을 추가할 때 사용
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param meshPositions 추가할 점위치 리스트 (끝점에 추가됨)
     * @returns AddPolygon으로 생성되지 않은 오브젝트일 경우에 false로 리턴함
     */
    AddPolygonPlusPosition(layerName: string, objName: string, meshPositions: Array<THREE.Vector3>): boolean;
    AddTerain(layerName: string, objName: string, clickable: boolean, position: THREE.Vector3, rotate: THREE.Vector3, widthSize: number, heightSize: number, segWidth: number, segHeight: number, altitudes: Float32Array, texturePath?: string): void;
    /** 텍스쳐가 없을 때 고도에 따른 색상변화로 텍스쳐로 표현할 때 */
    private generateTexture;
    /**
     * 지오펜스를 만드는 모듈 (현재 뷰로만 보이도록 되어있음)
     * @param layerName 레이어 이름
     * @param objName 오브젝트명 (홀수는 결합부위 짝수는 라인으로 처리됨)
     * @param linePaths 만들어지는 라인들의 포인트 정보
     * @param width 지오펜스트 두께
     * @param height 지오펜스의 높이
     * @param color 지오펜스틔 색
     * @param opacity 지오펜스의 투명도
     */
    AddGeoFence(layerName: string, objName: string, position: THREE.Vector3, linePaths: THREE.Vector3[], width: number, height: number, color: THREE.Color, opacity: number): THREE.Group | undefined;
}
