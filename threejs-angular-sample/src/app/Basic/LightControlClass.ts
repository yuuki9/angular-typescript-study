import * as angularthreejs from './angularthreejs';

export class LightControlClass {
    private threeJsLib : angularthreejs.ThreeJSLib;
    
    constructor(threeJsLib: angularthreejs.ThreeJSLib) {
        this.threeJsLib = threeJsLib;
    }
    /**
     * 그림자 옵션 설정
     * @param isOn 그림자를 표시하도록 설정
     * @param radius 선명도 기본:1 낮을수록 선명해지고 멀수로 흐려짐
     */
    SetShadowOption(isOn: boolean, radius?: number) {
        this.threeJsLib.LightControl.SetShadowOption(isOn, radius);       
    }
    /**
     * 라이트 설정 옵션
     * @param position 라이트의 위치
     * @param intensity 라이트의 세기
     * @param color 라이트의 색상
     */
    SetGlobalLightOption(position: angularthreejs.THREE.Vector3, intensity?: number, color?: THREE.Color) {
        this.threeJsLib.LightControl.SetGlobalLightOption(position, intensity , color);
    }
    /**
     * 지점조명추가 (스탠드조명)
     * @param layerName 레이어명
     * @param objName 오브젝트명
     * @param position 조명위치
     * @param targetPosition 조명이 비추는 타겟 위치
     * @param castShadow 그림자를 표시할지 확인
     * @param resolution 그림자의 해상도
     * @param near 그림자 최소 랜더범위
     * @param far 그림자 최대 랜더범위
     * @param bias 명도
     * @param returnObj 만들어진 오브젝트 리턴
     */
    AddSpotLight(layerName: string, objName: string, position: angularthreejs.THREE.Vector3, targetPosition: angularthreejs.THREE.Vector3, attachObj: angularthreejs.THREE.Object3D, castShadow: boolean = true, resolution: number = 1024, near: number = 12, far: number = 25, bias: number = 0.01, returnObj?: Function) {
        this.threeJsLib.LightControl.AddSpotLight(layerName, objName, position, targetPosition, attachObj, castShadow, resolution, near, far, bias, returnObj);
    }

    AddPointLight(layerName: string, objName: string, position: angularthreejs.THREE.Vector3, attachObj: angularthreejs.THREE.Object3D, castShadow: boolean = true, color: angularthreejs.THREE.Color = new angularthreejs.THREE.Color(255, 255, 255), intensity: number = 1, distance: number = 20, bias: number = -0.005, returnObj?: Function) {
        this.threeJsLib.LightControl.AddPointLight(layerName, objName, position, attachObj, castShadow, color, intensity, distance, bias, returnObj);
    }
    /**
     * 조명 오브젝트 모두 초기화
     */
    ClearALL() {
        this.threeJsLib.LightControl.ClearALL();
    }
}