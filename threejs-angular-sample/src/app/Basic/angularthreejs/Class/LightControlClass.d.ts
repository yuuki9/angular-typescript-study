import * as THREE from 'three';
import { ThreeJSLib } from "../ThreeJsLib";
export declare class LightControlClass {
    private threeJsLib;
    private globalLight;
    private lightList;
    constructor(threeJsLib: ThreeJSLib, globalLight: THREE.DirectionalLight);
    /**
     * 그림자 옵션 설정
     * @param isOn 그림자를 표시하도록 설정
     * @param radius 선명도 기본:1 낮을수록 선명해지고 멀수로 흐려짐
     */
    SetShadowOption(isOn: boolean, radius?: number): void;
    /**
     * 라이트 설정 옵션
     * @param position 라이트의 위치
     * @param intensity 라이트의 세기
     * @param color 라이트의 색상
     */
    SetGlobalLightOption(position: THREE.Vector3, intensity?: number, color?: THREE.Color): void;
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
    AddSpotLight(layerName: string, objName: string, position: THREE.Vector3, targetPosition: THREE.Vector3, attachObj: THREE.Object3D, castShadow?: boolean, resolution?: number, near?: number, far?: number, bias?: number, returnObj?: Function): void;
    AddPointLight(layerName: string, objName: string, position: THREE.Vector3, attachObj: THREE.Object3D, castShadow?: boolean, color?: THREE.Color, intensity?: number, distance?: number, bias?: number, returnObj?: Function): void;
    /**
     * 조명 오브젝트 모두 초기화
     */
    ClearALL(): void;
}
