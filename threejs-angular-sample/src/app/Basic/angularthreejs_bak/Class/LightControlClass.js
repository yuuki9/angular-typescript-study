"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightControlClass = void 0;
const THREE = require("three");
class LightControlClass {
    constructor(threeJsLib, globalLight) {
        this.lightList = [];
        this.threeJsLib = threeJsLib;
        this.globalLight = globalLight;
    }
    /**
     * 그림자 옵션 설정
     * @param isOn 그림자를 표시하도록 설정
     * @param radius 선명도 기본:1 낮을수록 선명해지고 멀수로 흐려짐
     */
    SetShadowOption(isOn, radius) {
        this.globalLight.castShadow = isOn;
        if (radius != undefined)
            this.globalLight.shadow.radius = radius;
    }
    /**
     * 라이트 설정 옵션
     * @param position 라이트의 위치
     * @param intensity 라이트의 세기
     * @param color 라이트의 색상
     */
    SetGlobalLightOption(position, intensity, color) {
        this.globalLight.position.set(position.x, position.y, position.z);
        if (intensity != undefined)
            this.globalLight.intensity = intensity;
        if (color != undefined)
            this.globalLight.color = color;
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
    AddSpotLight(layerName, objName, position, targetPosition, attachObj, castShadow = true, resolution = 1024, near = 12, far = 25, bias = 0.01, returnObj) {
        //스포트라이트 오브젝트 생성
        const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 5, 0.3);
        spotLight.position.set(position.x, position.y, position.z);
        spotLight.target.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
        spotLight.name = objName;
        //스포트라이트 옵션정보
        spotLight.castShadow = castShadow;
        spotLight.shadow.camera.near = near;
        spotLight.shadow.camera.far = far;
        spotLight.shadow.bias = bias;
        //조명&그림자 해상도 처리
        spotLight.shadow.mapSize.width = resolution;
        spotLight.shadow.mapSize.height = resolution;
        //레이어가 있으면 모델을 그룹에 추가
        let targetLayer = this.threeJsLib.GetLayer(layerName);
        if (targetLayer != undefined) {
            //레이어 오브젝트 그룹에 모델 추가
            if (attachObj != undefined)
                attachObj.children.push(spotLight);
            else
                targetLayer.objGrp.add(spotLight);
            //이벤트처리
            if (this.threeJsLib.AddObjectEvent != undefined)
                this.threeJsLib.AddObjectEvent(objName, spotLight); //오브젝트가 생긴것을 이벤트 처리
        }
        else {
            //신규레이어생성
            let newLayer = this.threeJsLib.CreateLayer(layerName);
            //레이어 오브젝트 그룹에 모델 추가
            newLayer.objGrp.add(spotLight);
            if (this.threeJsLib.AddObjectEvent != undefined)
                this.threeJsLib.AddObjectEvent(objName, spotLight); //오브젝트가 생긴것을 이벤트 처리
        }
        //조명리스트에 추가
        this.lightList.push(spotLight);
        //오브젝트 반환
        if (returnObj != undefined)
            returnObj(spotLight);
    }
    AddPointLight(layerName, objName, position, attachObj, castShadow = true, color = new THREE.Color(255, 255, 255), intensity = 1, distance = 20, bias = -0.005, returnObj) {
        //포인트라이트 오브젝트 생성
        const pointLight = new THREE.PointLight(color, intensity, distance);
        pointLight.castShadow = castShadow;
        pointLight.shadow.bias = bias;
        //조명위치설정
        pointLight.position.set(position.x, position.y, position.z);
        pointLight.name = objName;
        //레이어가 있으면 모델을 그룹에 추가
        let targetLayer = this.threeJsLib.GetLayer(layerName);
        if (targetLayer != undefined) {
            //레이어 오브젝트 그룹에 모델 추가
            if (attachObj != undefined)
                attachObj.children.push(pointLight);
            else
                targetLayer.objGrp.add(pointLight);
            //이벤트처리
            if (this.threeJsLib.AddObjectEvent != undefined)
                this.threeJsLib.AddObjectEvent(objName, pointLight); //오브젝트가 생긴것을 이벤트 처리
        }
        else {
            //신규레이어생성
            let newLayer = this.threeJsLib.CreateLayer(layerName);
            //레이어 오브젝트 그룹에 모델 추가
            newLayer.objGrp.add(pointLight);
            if (this.threeJsLib.AddObjectEvent != undefined)
                this.threeJsLib.AddObjectEvent(objName, pointLight); //오브젝트가 생긴것을 이벤트 처리
        }
        //조명리스트에 추가
        this.lightList.push(pointLight);
        //오브젝트 반환
        if (returnObj != undefined)
            returnObj(pointLight);
    }
    /**
     * 조명 오브젝트 모두 초기화
     */
    ClearALL() {
        this.lightList.forEach((obj) => {
            this.threeJsLib.RemoveLayerInObject(obj);
        });
        this.lightList = [];
    }
}
exports.LightControlClass = LightControlClass;
