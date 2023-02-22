import * as angularthreejs from './angularthreejs';

export class ObjectControlClass {
    private threeJsLib: angularthreejs.ThreeJSLib;

    constructor(ThreeJSLib: angularthreejs.ThreeJSLib) {
        this.threeJsLib = ThreeJSLib;
    }
    
    SetObjectPosition(layerName: string, objName: string, positionX: number, positionY: number, positionZ: number): boolean {
        return this.threeJsLib.ObjectControl.SetObjectPosition(layerName, objName, positionX, positionY, positionZ);
    }

    SetObjectRotation(modelName: string, objName: string, rotaitionX: number, rotaitionY: number, rotaitionZ: number): boolean {
        return this.threeJsLib.ObjectControl.SetObjectRotation(modelName, objName, rotaitionX, rotaitionY, rotaitionZ);
    }

    AddPanel(layerName: string, objName: string, clickable: boolean = false, position: angularthreejs.THREE.Vector3, rotate: angularthreejs.THREE.Vector3, width: number, height: number, txturePath: string = "", minViewDistance: number = 0.1, maxViewDistance: number = 500) {
        this.threeJsLib.ObjectControl.AddPanel(layerName, objName, clickable, position, rotate, width, height, txturePath, minViewDistance, maxViewDistance);
    }
    /**
     * Circle을 그려주는 함수
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName  추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param position 원점의 XYZ좌표 (lon, alt, lat)
     * @param lineWidth 원의 굵기
     * @param radius 원의 반지름
     * @param color 원의 색상
     * @param minViewDistance 최소 뷰 거리
     * @param maxViewDistance 최대 뷰 거리
     */
    AddCircle(layerName: string, objName: string, clickable: boolean = false, position: angularthreejs.THREE.Vector3, lineWidth: number, radius: number, color: angularthreejs.THREE.Color = new angularthreejs.THREE.Color(255, 0, 0), minViewDistance: number = 0.1, maxViewDistance: number = 500) {
        this.threeJsLib.ObjectControl.AddCircle(layerName, objName, clickable, position, lineWidth, radius, color, minViewDistance, maxViewDistance);
    }
    /**
     * 3DS모델을 추가하는 함수
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param position 지점의 XYZ좌표 (lon, alt, lat)
     * @param rotate 모델의 회전값
     * @param size 오브젝트의 크기
     * @param filePath 오브젝트의 원본 파일이 있는 경로
     * @param txturePath 오브젝트의 텍스쳐 파일이 있는 경로
     */
    Add3DS(layerName: string, objName: string, clickable: boolean = false, position: angularthreejs.THREE.Vector3, rotate: angularthreejs.THREE.Vector3, size: number, filePath: string = '/resource/models/3DS/djim600.3ds', txturePath: string = "", minViewDistance: number = 0.1, maxViewDistance: number = 500, returnObj?: Function) {
        this.threeJsLib.ObjectControl.Add3DS(layerName, objName, clickable, position, rotate, size, filePath, txturePath, minViewDistance, maxViewDistance, returnObj)
    }
    /**
     * OBJ모델을 추가하는 함수
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param position 지점의 XYZ좌표 (lon, alt, lat)
     * @param rotate 모델의 회전값
     * @param size 오브젝트의 크기
     * @param filePath 오브젝트의 원본 파일이 있는 경로
     * @param txturePath 오브젝트의 텍스쳐 파일이 있는 경로
     */
    AddOBJ(layerName: string, objName: string, clickable: boolean = false, position: THREE.Vector3, rotate: THREE.Vector3, size: number, filePath: string = '/resource/models/3DS/djim600.3ds', txturePath: string = '/resource/models/3DS/djim600.jpg', minViewDistance: number = 0.1, maxViewDistance: number = 500) {
        this.threeJsLib.ObjectControl.AddOBJ(layerName, objName, clickable, position, rotate, size, filePath, txturePath, minViewDistance, maxViewDistance);
    }
    /**
     *
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param position 지점의 XYZ좌표 (lon, alt, lat)
     * @param rotate 모델의 회전값
     * @param size 오브젝트의 크기
     * @param filePath
     * @param isPoint 포인트클라우드 데이터인 경우에 처리
     * @param minViewDistance 최소 뷰 거리
     * @param maxViewDistance 최대 뷰 거리
     */
    AddPLY(layerName: string, objName: string, clickable: boolean = false, position: angularthreejs.THREE.Vector3, rotate: angularthreejs.THREE.Vector3, size: number, filePath: string = '/resource/models/3DS/djim600.3ds', isPoint: boolean = false, minViewDistance: number = 0.1, maxViewDistance: number = 500) {
        this.threeJsLib.ObjectControl.AddPLY(layerName, objName, clickable, position, rotate, size, filePath, isPoint, minViewDistance, maxViewDistance);
    }

    AddPCD(layerName: string, objName: string, clickable: boolean = false, position: angularthreejs.THREE.Vector3, rotate: THREE.Vector3, size: number, filePath: string = '/resource/models/3DS/djim600.3ds', pointSize: number = 0.05, minViewDistance: number = 0.1, maxViewDistance: number = 500) {
        this.threeJsLib.ObjectControl.AddPCD(layerName, objName, clickable, position, rotate, size, filePath, pointSize, minViewDistance, maxViewDistance);
    }
    /**
     * FBX모델을 추가하는 함수
     * @param layerName
     * @param objName
     * @param clickable 클릭 가능한 속성을 가짐
     * @param position 지점의 XYZ좌표 (lon, alt, lat)
     * @param rotate 모델의 회전값
     * @param size 오브젝트의 크기
     * @param filePath 오브젝트의 원본 파일이 있는 경로
     */
    AddFBX(layerName: string, objName: string, clickable: boolean = false, position: angularthreejs.THREE.Vector3, rotate: THREE.Vector3, size: number, filePath: string = '/resource/models/3DS/djim600.3ds', txturePath = "", minViewDistance: number = 0.1, maxViewDistance: number = 500) {
        this.threeJsLib.ObjectControl.AddFBX(layerName, objName, clickable, position, rotate, size, filePath, txturePath, minViewDistance, maxViewDistance);
    }
    /**
     * 포인트클라우드(.XYZ)을 추가하는 함수
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param position 지점의 XYZ좌표 (lon, alt, lat)
     * @param rotate 모델의 회전값
     * @param filePath 오브젝트의 원본 파일이 있는 경로
     */
    AddXYZ(layerName: string, objName: string, clickable: boolean = false, position: THREE.Vector3, rotate: THREE.Vector3, pointSize: number, filePath: string = '/resource/models/XYZ/VILLA_DONDI.xyz') {
        this.threeJsLib.ObjectControl.AddXYZ(layerName, objName, clickable, position, rotate, pointSize, filePath);
    }
     /**
     * XYZ파일 형식으로 된 파일을 읽어 Polygon을 만듬
     * 주의) 외각선이 순서되로 되어 있어야 만들 수 있음
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param filePath 파일 경로
     * @param clickable 클릭 가능한 속성을 가짐
     * @param position 지점의 XYZ좌표 (lon, alt, lat)
     * @param rotate 모델의 회전값
     * @param color 도형의 색상
     * @param opacity 도형의 투명도
     * @param minViewDistance 가시거리
     * @param maxViewDistance 가시거리
     */
    AddXYZtoPolygon(layerName: string, objName: string, filePath: string, clickable: boolean = false, position: THREE.Vector3 = new angularthreejs.THREE.Vector3(0, 0, 0), rotate: THREE.Vector3 = new angularthreejs.THREE.Vector3(0, 0, 0), color: angularthreejs.THREE.Color = new angularthreejs.THREE.Color(1, 1, 0), opacity: number = 1, minViewDistance: number = 0.1, maxViewDistance: number = 100000) {
        this.threeJsLib.ObjectControl.AddXYZtoPolygon(layerName, objName, filePath, clickable, position, rotate, color, opacity, minViewDistance, maxViewDistance);
    }
    /**
     * 포인트클라우드(.XYZ)를 RAW데이터로 받아서 처리하는 함수 (실시간 랜더링)
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param xyzText XYZ파일의 양식이 적용된 string 문자 (raw)
     * @param swichAngle 정상적인 모델은 90도 정도 돌아가 있는 상태로 되어 있어 돌리는 작업을 한 경우에는 false로 지정 필요 (defalut : true)
     */
    AddXYZRawData(layerName: string, objName: string, pointSize: number = 1, clickable: boolean = false, xyzText: string, locOriginPos: THREE.Vector3 = new angularthreejs.THREE.Vector3(0, 0, 0), locColors?: angularthreejs.LocationColor[]) {
        this.threeJsLib.ObjectControl.AddXYZRawData(layerName, objName, pointSize, clickable, xyzText, locOriginPos, locColors);
    }

    AddTexture(layerName: string, objName: string, position: THREE.Vector3, size: THREE.Vector3, texturePath: string, clickable: boolean = false) {
        this.threeJsLib.ObjectControl.AddTexture(layerName, objName, position, size, texturePath, clickable);
    }

    AddCylinder(layerName: string, objName: string, position: THREE.Vector3, size: number, height: number, color: THREE.Color, opacity: number = 1, clickable: boolean = false) {
        this.threeJsLib.ObjectControl.AddCylinder(layerName, objName, position, size, height, color, opacity, clickable);
    }

    AddLineToBox(layerName: string, objName: string, stPoint: THREE.Vector3, edPoint: THREE.Vector3, thick: number, height: number, color: THREE.Color, opacity: number = 1, clickable: boolean = false) {
        this.threeJsLib.ObjectControl.AddLineToBox(layerName, objName, stPoint, edPoint, thick, height, color, opacity, clickable);
    }
    /**
     * 오브젝트의 텍스쳐를 변경함
     * @param obj 타겟 오브젝트 (Mesh타입의 오브젝트만 가능)
     * @param texturePath 텍스쳐 경로
     * @returns
     */
    SetObjTexture(targetObj: THREE.Object3D, texturePath: string): boolean {
        return this.threeJsLib.ObjectControl.SetObjTexture(targetObj, texturePath);
    }
}