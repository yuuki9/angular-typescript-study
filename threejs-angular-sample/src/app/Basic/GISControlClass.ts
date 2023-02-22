import { ThreeJSLib } from './angularthreejs/ThreeJsLib';
import * as THREE from 'three';
export class GISControlClass {
    private threeJSLib: ThreeJSLib;
    constructor(threeJSLib: ThreeJSLib) {
      this.threeJSLib = threeJSLib;
    }
    /**
     * 지면의 가이드를 보기 위해서 그라운드를 초기화
     * @param clickable 그라운드가 클릭가능한 속성으로 처리할지 선택
     */
    InitGround(clickable: boolean, size?: number, texturePath?: string): void{
      this.threeJSLib.GISControl.InitGound(clickable, size, texturePath);
    };
    /**
     * 해당 모드를 실행하면 클릭 될 때마다 길이를 구하는 함수
     * 측량모드를 종료할 때는 CancelClacMode()를 사용하요 종료함
     * @param dotResourcePath 선과 선사이의 점의 POI를 만들 이미지
     */
     SetCalcDistanceMode(dotResourcePath?: string): void{
      this.threeJSLib.GISControl.SetCalcDistanceMode(dotResourcePath);
     }
     /**
      * 해당 모드를 실행하면 클릭 될 때마다 도형을 그려 넓이를 구함
      * 도형을 그릴때 시계 또는 시계 반대 방향으로 통일해서 클릭해야함
      * 측량모드를 종료할 때는 CancelClacMode()를 사용하여 종료함
      */
     SetCalcMultiAreaMode(): void{
      this.threeJSLib.GISControl.SetCalcMultiAreaMode();
     }
     /**
      * 측량모드를 종료함
      */
     CancelClacMode(): void{

     }
    /**
     * (GIS기능) POI생성
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param imgPath 이미지의 경로
     * @param position 지점의 XYZ좌표 (lon, alt, lat)
     * @param size POI사이즈 지정
     * @param text POI의 텍스트를 지정
     * @param returnObj 콜백함수
     */ 
    AddPOI(layerName: string, objName: string, clickable: boolean = false, imgPath: string = '/resources/POI/b1.png', position: THREE.Vector3, size: number = 5, text: string = "", dataKey?: string, dataValue?: any, minViewDistance: number = 50, maxViewDistance: number = 500, returnObj?: Function) {
      this.threeJSLib.GISControl.AddPOI(layerName, objName, clickable, imgPath, position, size, text, dataKey, dataValue, minViewDistance, maxViewDistance, returnObj)
    }
    /**
     * POI 오브젝트의 이미지를 변경하는 함수
     * @param POI POI 오브젝트
     * @param imgPath 변경 할 이미지 경로
     */
    ChangePOIImage(POI: THREE.Object3D, imgPath: string): void{
      this.threeJSLib.GISControl.ChangePOIImage(POI, imgPath);
    }
    /**
     * POI 오브젝트의 크기를 변경하는 함수
     * @param POI POI 오브젝트
     * @param imgPath 변경 할 이미지 경로
     */
    ChangePOISize(POI: THREE.Object3D, size: number): void{
      this.threeJSLib.GISControl.ChangePOISize(POI, size);
    };
    /**
     * (GIS기능) 라인생성
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param positions XYZ좌표를 가진 포인트 리스트 (첫점부터 연결된 라인으로 구성)
     * @param lineWidth 라인의 두께 지정
     * @param color 라인색상지정
     */
    AddLine(layerName: string, objName: string, clickable: boolean = false, positions: Array<THREE.Vector3>, lineWidth: number = 1, color: THREE.Color = new THREE.Color(1, 1, 0), minViewDistance: number = 0.1, maxViewDistance: number = 500): boolean {
      return this.threeJSLib.GISControl.AddLine(layerName , objName, clickable, positions, lineWidth, color , minViewDistance, maxViewDistance);
    } 
    /**
     * (GIS기능) 폴리곤(면)을 생성
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param meshPositions 면을 생성할 때 사용되는 점들의 위치 (순서 중요)
     * @param color 매쉬 색상 지정
     * @param opacity 매쉬 투명도 지정 (0~1) : default 1
     */
    AddPolygon(layerName: string, objName: string, clickable: boolean = false, meshPositions: Array<THREE.Vector3>, color: THREE.Color = new THREE.Color(1, 1, 0), opacity: number = 1, minViewDistance: number = 50, maxViewDistance: number = 500) {
      return this.threeJSLib.GISControl.AddPolygon(layerName, objName, clickable , meshPositions, color, opacity, minViewDistance, maxViewDistance)
    }  
    /**
     * AddPolygon을 사용한 오브젝트에 추가로 포지션을 추가할 때 사용
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param meshPositions 추가할 점위치 리스트 (끝점에 추가됨)
     * @returns AddPolygon으로 생성되지 않은 오브젝트일 경우에 false로 리턴함
     */
    AddPolygonPlusPosition(layerName: string, objName: string, meshPositions: Array<THREE.Vector3>): boolean{
      return this.threeJSLib.GISControl.AddPolygonPlusPosition(layerName, objName, meshPositions);
    }

    AddTerain(layerName: string, objName: string, clickable: boolean, position: THREE.Vector3, rotate: THREE.Vector3, widthSize: number, heightSize: number, segWidth: number, segHeight: number, altitudes: Float32Array, texturePath?: string): void{
      return this.threeJSLib.GISControl.AddTerain(layerName, objName, clickable, position,rotate, widthSize, heightSize,  segWidth, segHeight, altitudes , texturePath )
    }
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
    AddGeoFence(layerName: string, objName: string, position: THREE.Vector3, linePaths: THREE.Vector3[], width: number, height: number, color: THREE.Color, opacity: number): THREE.Group | undefined {
      return this.threeJSLib.GISControl.AddGeoFence(layerName, objName, position, linePaths, width, height, color, opacity)
    };


  }
  