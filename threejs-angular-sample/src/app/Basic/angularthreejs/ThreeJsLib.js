"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeJSLib = void 0;
//클래스를 외부에서 접근 할 수 있도록 처리
__exportStar(require("./Class/CameraControlClass"), exports);
__exportStar(require("./Class/GISControlClass"), exports);
__exportStar(require("./Class/LightControlClass"), exports);
__exportStar(require("./Class/ObjectControlClass"), exports);
//threejs
const THREE = require("three");
const stats_module_js_1 = require("three/examples/jsm/libs/stats.module.js");
//controls
const OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
const TransformControls_1 = require("three/examples/jsm/controls/TransformControls");
const CSS2DRenderer_js_1 = require("three/examples/jsm/renderers/CSS2DRenderer.js");
//animation
const tween_js_1 = require("@tweenjs/tween.js");
const Utils_1 = require("./Utils");
//구조정보불러오기
const Struct = require("./Struct");
//라이브러리 클래스 정의
const GISControlClass_1 = require("./Class/GISControlClass");
const LightControlClass_1 = require("./Class/LightControlClass");
const CameraControlClass_1 = require("./Class/CameraControlClass");
const ObjectControlClass_1 = require("./Class/ObjectControlClass");
const rxjs_1 = require("rxjs");
class ThreeJSLib {
    ;
    /**
     * THREEJS를 표시하는 라이브러리
     * @param divElement 표시될 DIV를 입력
     * @param camPosition 카메라의 초기 위치 지정
     * @param cam2DMode 2D모드로 사용할 경우
     * @param rate2D 2D모드의 배율을 지정 (1 = 원본 해상도 배율) 기본값 : 5
     * @param viewStats 리소스 모니터링 처리
     */
    constructor(divElement, camPosition = new THREE.Vector3(5, -10, 5), renderDistanceMin = 0.001, renderDistanceMax = 1000000, cam2DMode = false, rate2D = 5) {
        //콜백함수
        this.AnimateEvent = new rxjs_1.Subject();
        this.AddLayerEvent = new rxjs_1.Subject();
        this.AddObjectEvent = new rxjs_1.Subject();
        this.AddPOIEvent = new rxjs_1.Subject();
        this.AddLineEvent = new rxjs_1.Subject();
        this.AddPolygonEvent = new rxjs_1.Subject();
        this.ClickObjectEvent = new rxjs_1.Subject();
        this.clock = new THREE.Clock();
        this._tempDeltaTime = 0;
        this.camLookatEvent = true;
        //머지기능 변수
        this.mergeIconPath = "assets/resources/texture/mergePOI/";
        this.mergeIconName = "";
        this.mergeIconType = ".png";
        //2D 모드에 사용하는 변수
        this.cam2DMode = false;
        this.rate2D = 5;
        //인터렉션 기능
        this.raycaster = new THREE.Raycaster();
        this.mouse = { x: 0, y: 0 };
        //하나의 오브젝트를 타겟팅해서 보여줄 때 처리
        this.isModelTargeting = false;
        this.targetingObj = undefined;
        this.targetingLengh = 50;
        //씬에 등록된 모델들을 관리하는 그룹변수
        this.layerGrp = [];
        this.clickableObj = [];
        //뷰잉기능변수
        this.cameraGrp = new THREE.Group(); //카메라 그룹
        this.enableRenderMode = true;
        //컨테이너 불러오기
        this.container = divElement;
        //2D카메라 모드인지 확인
        this.cam2DMode = cam2DMode;
        this.rate2D = rate2D;
        //씬초기화
        this.scene = new THREE.Scene();
        //카메라모드처리
        if (!this.cam2DMode) {
            //3D 카메라모드
            this.camera = new THREE.PerspectiveCamera(60, this.container.scrollWidth / this.container.scrollHeight, renderDistanceMin, renderDistanceMax);
        }
        else {
            //2D형 카메라
            const sizeLR = this.container.scrollWidth / this.rate2D;
            const sizeTD = this.container.scrollHeight / this.rate2D;
            const aspect = this.container.scrollWidth / this.container.scrollHeight;
            this.camera = new THREE.OrthographicCamera(sizeLR * aspect / -2, sizeLR * aspect / 2, sizeTD * aspect / 2, sizeTD * aspect / -2, renderDistanceMin, renderDistanceMax);
        }
        this.camera.up.set(0, 0, 1); //z축을 높이로 사용
        this.camera.position.set(camPosition.x, camPosition.y, camPosition.z);
        //카메라를 그룹에 넣어야 LookAt이 가능함
        this.cameraGrp.add(this.camera);
        //라이트추가
        this.globalLight = new THREE.DirectionalLight();
        this.globalLight.position.set(0, 0, 100);
        this.scene.add(this.globalLight);
        //라벨렌더러
        this.labelRenderer = new CSS2DRenderer_js_1.CSS2DRenderer();
        this.container.appendChild(this.labelRenderer.domElement);
        this.labelRenderer.setSize(this.container.scrollWidth, this.container.scrollHeight);
        this.labelRenderer.domElement.style.position = 'absolute';
        //this.labelRenderer.domElement.style.top = this.container.style.top+'px';
        this.labelRenderer.domElement.id = "labelRenderer";
        //렌더러설정
        this.renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.scrollWidth, this.container.scrollHeight);
        this.renderer.domElement.id = "renderer";
        this.renderer.shadowMap.enabled = true; //그림자표시처리확인
        this.container.appendChild(this.renderer.domElement);
        if (this.cam2DMode)
            this.renderer.setClearColor(0x353535, 1);
        //맵 컨트롤러설정
        this.mapControl = new OrbitControls_1.MapControls(this.camera, this.labelRenderer.domElement);
        this.cam2DMode ? this.mapControl.maxPolarAngle = 0 : this.mapControl.maxPolarAngle = Math.PI / 2;
        this.mapControl.screenSpacePanning = false;
        //(3D기능) 카메라 기준 마커 생성 
        if (!this.cam2DMode) {
            const geometry = new THREE.SphereGeometry(0.5, 20, 10);
            const material = new THREE.MeshLambertMaterial({
                color: new THREE.Color().setHSL(0.3, 0.3, 0.3),
                side: THREE.DoubleSide,
                opacity: 0.5,
                transparent: true,
            });
            this.camBenchmarkObj = new THREE.Mesh(geometry, material);
            this.camBenchmarkObj.position.set(this.mapControl.target.x, this.mapControl.target.y, this.mapControl.target.z);
            this.scene.add(this.camBenchmarkObj);
        }
        //오브젝트 편집 컨트롤러
        this.editControls = new TransformControls_1.TransformControls(this.camera, this.labelRenderer.domElement);
        this.editControls.addEventListener('change', () => {
            this.renderer.render(this.scene, this.camera);
        });
        this.editControls.addEventListener('dragging-changed', (event) => {
            this.mapControl.enabled = !event.value;
        });
        this.scene.add(this.editControls);
        //마우스 이동에 대한 처리
        this.container.addEventListener('mousemove', (event) => {
            event.preventDefault();
            this.mouse.x = ((event.clientX - this.container.getBoundingClientRect().left) / this.container.scrollWidth) * 2 - 1;
            this.mouse.y = -((event.clientY - this.container.getBoundingClientRect().top) / this.container.scrollHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.camera);
        });
        //마우스 클릭에 대한 처리
        this.container.addEventListener("click", (event) => {
            event.preventDefault();
            this.mouse.x = ((event.clientX - this.container.getBoundingClientRect().left) / this.container.scrollWidth) * 2 - 1;
            this.mouse.y = -((event.clientY - this.container.getBoundingClientRect().top) / this.container.scrollHeight) * 2 + 1;
            console.log(this.mouse.x, this.mouse.y);
            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.clickableObj, true);
            if (intersects.length > 0) {
                const intersect = intersects[0];
                const data = Utils_1.ThreeUtils.GetFirstParents(intersect.object);
                if (this.ClickObjectEvent != undefined && intersect.object.visible)
                    this.ClickObjectEvent.next({ object: data, point: intersect.point });
                this.renderer.render(this.scene, this.camera);
            }
        });
        //컨트롤 이벤트가 발생할때마다처리
        this.mapControl.addEventListener("change", (event) => {
            this.LayerRefresh();
        });
        //스페이스바를 누르면 Lookat이벤트가 정지되도록 설정
        this.container.onkeydown = ((e) => {
            if (e.keyCode == 32)
                this.camLookatEvent = false;
        });
        this.container.onkeyup = ((e) => {
            if (e.keyCode == 32)
                this.camLookatEvent = true;
        });
        //각 기능의 클래스를 초기화
        this.LightControl = new LightControlClass_1.LightControlClass(this, this.globalLight);
        this.CameraControl = new CameraControlClass_1.CameraControlClass(this, this.camera, this.mapControl);
        this.ObjectControl = new ObjectControlClass_1.ObjectControlClass(this);
        this.GISControl = new GISControlClass_1.GISControlClass(this);
        //랜더링 시작하기
        this.Animate(this);
    }
    /**
     * POI 아이콘이 머지될 때 쓰이는 아이콘 경로 지정 (아이콘이 있는 폴더의 경로를 지정)
     * 총 아이콘의 갯수에 따라 아이콘 불러오는 파일명이 "[갯수].png"로 정의됨
     * @param mergeIconPath 파일이 있는 폴더의 경로
     * @param mergeIconName 아이콘의 네임 규칙 숫자를 제외한 파일의 이름 정의 (특문포함)
     * @param mergeIconType 파일의 확장자 정의
     */
    SetMergeIconPath(mergeIconPath, mergeIconName = "", mergeIconType = ".png") {
        //경로 포맷확인
        if (mergeIconPath[mergeIconPath.length - 1] == "/")
            this.mergeIconPath = mergeIconPath;
        else
            this.mergeIconPath = mergeIconPath + "/";
        //이름 포맷확인
        if (mergeIconName != "")
            this.mergeIconName = mergeIconName;
        //확장자 포맷확인
        if (mergeIconType != ".png" && mergeIconType.includes('.'))
            this.mergeIconPath = mergeIconType;
        else if (mergeIconType != ".png")
            this.mergeIconType = "." + mergeIconType;
    }
    /**
     * 랜더링 되는 처리를 시작/정지함
     * @param value
     */
    SetEnableRendering(value) { this.enableRenderMode = value; }
    /**
     * 화면의 클릭좌표를 기준으로 클릭가능한 오브젝트들의 목록을 리턴함
     * @param ThreejsScreenPosX 콘테이너 기준의 상대적인 화면좌표(X)
     * @param ThreejsScreenPosY 콘테이너 기준의 상대적인 화면좌표(Y)
     * @returns 클릭좌표에 걸리는 모든 오브젝트 (클릭속성 있어야함)
     */
    GetWindowPosToObjects(ThreejsScreenPosX, ThreejsScreenPosY) {
        let resultObjectList = [];
        const posx = ((ThreejsScreenPosX - this.container.getBoundingClientRect().left) / this.container.scrollWidth) * 2 - 1;
        const posy = -((ThreejsScreenPosY - this.container.getBoundingClientRect().top) / this.container.scrollHeight) * 2 + 1;
        this.raycaster.setFromCamera({ x: posx, y: posy }, this.camera);
        const intersectList = this.raycaster.intersectObjects(this.clickableObj, true);
        intersectList.forEach((intersect) => {
            if (intersect.object.visible)
                resultObjectList.push(intersect.object);
        });
        return resultObjectList;
    }
    /**
     * 마우스 포인트 좌표를 입력하면 해당 마우스 좌표에 걸리는 오브젝트가 있는지 확인하고 오브젝트가 닿은 포인트좌표를 리턴함
     * @param mPosX 마우스 좌표X
     * @param mPosY 마우스 좌표Y
     */
    GetWindowPosToObjectpoint(ThreejsScreenPosX, ThreejsScreenPosY) {
        const posx = ((ThreejsScreenPosX - this.container.getBoundingClientRect().left) / this.container.scrollWidth) * 2 - 1;
        const posy = -((ThreejsScreenPosY - this.container.getBoundingClientRect().top) / this.container.scrollHeight) * 2 + 1;
        this.raycaster.setFromCamera({ x: posx, y: posy }, this.camera);
        const intersects = this.raycaster.intersectObjects(this.clickableObj, true);
        intersects.forEach(intersect => {
            this.renderer.render(this.scene, this.camera);
            if (intersect.object.visible)
                return intersect.point;
            else
                return undefined;
        });
        return undefined;
    }
    SetViewStats() {
        this.stats = (0, stats_module_js_1.default)();
        this.container.appendChild(this.stats.dom);
    }
    SetAxesHelper() {
        // 축 헬퍼
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
    }
    LayerRefresh() {
        this.layerGrp.forEach((layer) => {
            if (layer.visible != undefined && layer.visible && layer.viewDistanceMin != undefined && layer.viewDistanceMax != undefined) {
                //console.log(layer.objGrp.children.filter(value => value instanceof THREE.Sprite && value.name != "MERGE_POI_OBJECT").length);
                //머지 기능이 있는 레이어는 전체를 기준으로 처리
                const POIObjs = layer.objGrp.children.filter(value => value instanceof THREE.Sprite && value.name != "MERGE_POI_OBJECT");
                if (layer.isPOIMerge != undefined && layer.isPOIMerge && POIObjs.length > 0) {
                    const labelObj = layer.objGrp.children.filter(value => value instanceof CSS2DRenderer_js_1.CSS2DObject && value.name != "MERGE_POI_OBJECT");
                    const mergePOILabel = layer.objGrp.children.filter(value => value instanceof CSS2DRenderer_js_1.CSS2DObject && value.name == "MERGE_POI_OBJECT");
                    //중앙좌표 구하기
                    let posx = 0, posy = 0, posz = 0;
                    POIObjs.forEach(poi => {
                        posx += poi.position.x;
                        posy += poi.position.y;
                        posz += poi.position.z;
                    });
                    posx /= POIObjs.length;
                    posy /= POIObjs.length;
                    posz /= POIObjs.length;
                    const centerPosition = new THREE.Vector3(posx, posy, posz);
                    const distanceToObj = this.cam2DMode ? this.camera.position.distanceTo(centerPosition) / this.CameraControl.GetZoomValue() : this.camera.position.distanceTo(centerPosition);
                    if (distanceToObj < layer.viewDistanceMax) {
                        POIObjs.forEach(poi => { poi.visible = true; });
                        labelObj.forEach(poi => { poi.visible = true; });
                        if (layer.mergePOIObj != undefined)
                            layer.mergePOIObj.visible = false;
                        if (mergePOILabel.length > 0)
                            mergePOILabel[0].visible = false;
                    }
                    else {
                        POIObjs.forEach(poi => { poi.visible = false; });
                        labelObj.forEach(poi => { poi.visible = false; });
                        //머지오브젝트가 없으면 처리
                        if (layer.mergePOIObj == undefined && !layer.isCreatingPOIObj) {
                            layer.isCreatingPOIObj = true;
                            const basicIconSize = this.cam2DMode ? 10 : 0.05;
                            this.GISControl.AddPOI(layer.name, "MERGE_POI_OBJECT", true, this.mergeIconPath + this.mergeIconName + POIObjs.length + this.mergeIconType, new THREE.Vector3(posx, posy, posz), basicIconSize, "", "POI_OBJECT_LIST", POIObjs, layer.viewDistanceMin, layer.viewDistanceMax, (returnObj) => {
                                layer.mergePOIObj = returnObj;
                                layer.isCreatingPOIObj = false;
                            });
                        }
                        //머지오브젝트가 있으면 처리
                        else if (layer.mergePOIObj != undefined) {
                            layer.mergePOIObj.visible = true;
                            layer.mergePOIObj.position.set(posx, posy, posz);
                            if (mergePOILabel.length > 0) {
                                mergePOILabel[0].visible = true;
                                mergePOILabel[0].position.set(posx, posy, posz);
                                const mergePoiText = layer.mergePOIText == undefined ? layer.name : layer.mergePOIText;
                                mergePOILabel[0].element.textContent = mergePoiText;
                            }
                            this.ObjectControl.SetObjTexture(layer.mergePOIObj, this.mergeIconPath + this.mergeIconName + POIObjs.length + this.mergeIconType);
                        }
                    }
                }
                else {
                    layer.objGrp.children.forEach((obj) => {
                        const distanceToObj = this.cam2DMode ? this.camera.position.distanceTo(obj.position) / this.CameraControl.GetZoomValue() : this.camera.position.distanceTo(obj.position);
                        //확대 축소로 
                        if (distanceToObj > layer.viewDistanceMin && distanceToObj < layer.viewDistanceMax)
                            obj.visible = true;
                        else
                            obj.visible = false;
                    });
                }
            }
            else if (!layer.visible) {
                layer.objGrp.children.forEach((obj) => {
                    obj.visible = layer.visible;
                });
            }
        });
    }
    /** 백그라운드 컬러를 지정 */
    SetBackgroundColor(color) { this.renderer.setClearColor(color, 1); }
    /**
     * THREE에 할당된 씬정보를 가저옴
     * @returns THREE에 할당된 씬정보
     */
    GetScene() { return this.scene; }
    //#region 레이어파트
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //레이러를 생성하고 삭제를 관리하는 함수들을 정의
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    /**
     * 지정한 이름으로 레이어를 생성
     * @param LayerName 레이어그룹에 등록된 레이어명
     * @returns 생성된 레이어 오브젝트
     */
    CreateLayer(layerName) {
        if (!this.IsExistLayer(layerName)) {
            //신규레이어생성
            let newLayer = { name: layerName, objGrp: new THREE.Group(), isCreatingPOIObj: false };
            //씬에 추가
            this.scene.add(newLayer.objGrp);
            //레이어 그룹에 추가
            this.layerGrp.push(newLayer);
            if (this.AddLayerEvent != undefined)
                this.AddLayerEvent.next(newLayer); //레이어가 생성된것을 내보냄
            return newLayer;
        }
        return this.GetLayer(layerName);
    }
    /**
     * 오브젝트가 이미 있으면 이미 있는 오브젝트를 가져오고 없으면 새로 빈 오브젝트를 만듬
     * @param layerName 레이어 이름
     * @param objName 오브젝트 이름
     * @returns 생성된 오브젝트
     */
    CreateObject(layerName, objName) {
        if (!this.IsExistLayerInObjectName(layerName, objName)) {
            //새로운 오브젝트 설정
            let newObject = new THREE.Object3D();
            newObject.name = objName;
            //레이어 검사후 가져오기
            const layer = this.CreateLayer(layerName);
            //레이어에 오브젝트 추가
            layer.objGrp.add(newObject);
            return newObject;
        }
        return this.GetLayerInObject(layerName, objName);
    }
    /**
     * 할달된 레이어를 이름으로 찾아 제거함
     * @param LayerName 레이어그룹에 등록된 레이어명
     * @returns 할달된 레이어가 있어서 제거가 된 경우 True
     */
    RemoveLayerFromName(layerName) {
        let returnValue = false;
        const layer = this.GetLayer(layerName);
        if (layer != undefined) {
            //그룹안에 있는 오브젝트 할당 해제
            for (let i = 0, maxi = layer.objGrp.children.length; i < maxi; i++) {
                this.DisposeThreejsObject(layer.objGrp.children[i]);
                this.RemoveClickableObject(layer.objGrp.children[i]);
                layer.objGrp.children = layer.objGrp.children.filter(item => item !== layer.objGrp.children[i]);
            }
            //씬에서제거
            this.scene.remove(layer.objGrp);
            //레이어그룹에서 제거
            this.layerGrp = this.layerGrp.filter(item => item !== layer);
            returnValue = true;
        }
        return returnValue;
    }
    /**
     * 레이어 그룹에 등록된 모든 레이어이름을 가져옴
     * @returns 레이어의 이름 리스트
     */
    GetLayerGrpInNames() {
        let layerName = [];
        this.layerGrp.forEach((layer) => {
            layerName.push(layer.name);
        });
        return layerName;
    }
    /**
     * 레이어 그룹에 등록된 레이어를 가져옴
     * @param layerName 레이어그룹에 등록된 레이어명
     * @returns 레이어 그룹에 있으면 반환값을 반환하고 없으면 undefined를 반환
     */
    GetLayer(layerName) {
        for (let i = 0, maxi = this.layerGrp.length; i < maxi; i++) {
            if (this.layerGrp[i].name == layerName) {
                return this.layerGrp[i];
            }
        }
        return undefined;
    }
    /**
     * 레이어안에 들어 있는 오브젝트의 모든 이름을 가져옴
     * @param layerName 레이어그룹에 등록된 레이어명
     * @returns 레이어에 등록된 오브젝트의 이름 리스트
     */
    GetLayerInObjectNames(layerName) {
        let objectNames = [];
        this.layerGrp.forEach((item) => {
            if (item.name == layerName) {
                item.objGrp.children.forEach(obj => {
                    objectNames.push(obj.name);
                });
                return;
            }
        });
        return objectNames;
    }
    /**
     * 레이어 안에 있는 오브젝트를 이름으로 찾아서 오브젝트를 가져옴
     * @param layerName 레이어그룹에 등록된 레이어명
     * @param objName 레이어에 등록된 오브젝트명
     * @returns 찾은 오브젝트가 있을 경우 반환값을 반환하고 없으면 undefined를 반환
     */
    GetLayerInObject(layerName, objName) {
        const layer = this.GetLayer(layerName);
        if (layer != undefined) {
            for (let i = 0, maxi = layer.objGrp.children.length; i < maxi; i++) {
                if (layer.objGrp.children[i].name == objName) {
                    return layer.objGrp.children[i];
                }
            }
        }
        return undefined;
    }
    /**
     * 레이어에 할당된 오브젝트를 이름으로 찾아서 제거함
     * @param layerName 레이어그룹에 등록된 레이어명
     * @param objName 레이어에 등록된 오브젝트명
     * @returns 있을 경우 제거하고 True를 반환 없을 경우 False를 반환
     */
    RemoveLayerInObjectFromName(layerName, objName) {
        //레이어의 그룹에서 제거
        const layer = this.GetLayer(layerName);
        if (layer != undefined) {
            for (let i = 0, maxi = layer.objGrp.children.length; i < maxi; i++) {
                if (layer.objGrp.children[i].name == objName) {
                    if (layer.objGrp.children[i] instanceof THREE.Sprite)
                        layer.objGrp.remove(layer.objGrp.children[i].userData["CSS_LABEL"]); //POI인 경우에 처리
                    layer.objGrp.remove(layer.objGrp.children[i]);
                    this.RemoveClickableObject(layer.objGrp.children[i]); //선택가능 오브젝트 목록에서 지움
                    this.DisposeThreejsObject(layer.objGrp.children[i]); //오브젝트를 완전 지움
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * 레이어에 할당된 오브젝트를 찾아서 제거함
     * @param targetObj 삭제할 오브젝트
     * @returns 있을 경우 제거하고 True를 반환 없을 경우 False를 반환
     */
    RemoveLayerInObject(targetObj) {
        let returnValue = false;
        const objGrp = targetObj.parent;
        if (objGrp != undefined) {
            objGrp.remove(targetObj);
            this.RemoveClickableObject(targetObj); //선택가능 오브젝트 목록에서 지움
            this.DisposeThreejsObject(targetObj); //오브젝트를 완전 지움
            return true;
        }
        return false;
    }
    RemoveClickableObject(targetObj) {
        this.clickableObj = this.clickableObj.filter(item => item !== targetObj);
    }
    DisposeThreejsObject(obj) {
        if (obj == undefined)
            return;
        switch (obj.type) {
            case 'Mesh':
                obj.geometry.dispose();
                obj.material.dispose();
                break;
            case 'Points':
                obj.geometry.dispose();
                obj.material.dispose();
                break;
            case 'Line':
                //(<THREE.Line>obj).geometry.dispose();
                //(<THREE.Material>(<THREE.Line>obj).material).dispose();
                break;
            case 'Sprite':
                obj.geometry.dispose();
                obj.material.dispose();
                //글씨도 같이 지우기
                obj.children.forEach((obj) => {
                    obj.element.remove();
                });
                break;
            case 'Group':
                obj.children.forEach(childs => {
                    this.DisposeThreejsObject(childs);
                });
                break;
            case 'Object3D':
                const tempObj = obj;
                if (tempObj.geometry != undefined)
                    tempObj.geometry.dispose();
                if (tempObj.material != undefined)
                    tempObj.material.dispose();
                break;
            case 'Line2':
                obj.geometry.dispose();
                obj.material.dispose();
                break;
            default:
                console.log("오브젝트 제거 미구현 타입 >> " + obj.type);
                break;
        }
    }
    /**
     * 레이어 그룹에 레이어가 있는지 확인하고 레이어를 반환
     * @param layerName 레이어그룹에 등록된 레이어명
     * @returns 레이어 그룹에 있으면 반환값을 반환하고 없으면 undefined를 반환
     */
    IsExistLayer(layerName) {
        let returnValue = false;
        for (let i = 0, max = this.layerGrp.length; i < max; i++) {
            if (this.layerGrp[i].name == layerName) {
                returnValue = true;
                break;
            }
        }
        return returnValue;
    }
    /**
     * 레이어 안에 오브젝트가 있는지 확인
     * @param layerName 레이어그룹에 등록된 레이어명
     * @param objName 레이어에 등록된 오브젝트명
     * @returns true/false
     */
    IsExistLayerInObjectName(layerName, objName) {
        const layer = this.GetLayer(layerName);
        if (layer != undefined) {
            for (let j = 0, maxj = layer.objGrp.children.length; j < maxj; j++) {
                if (layer.objGrp.children[j].name == objName) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * 레이어 안에 오브젝트가 있는지 확인
     * @param object 찾을 오브젝트
     * @returns true/false
     */
    IsExistLayerInObject(object) {
        let returnValue = false;
        for (let i = 0, maxi = this.layerGrp.length; i < maxi; i++) {
            for (let j = 0, maxj = this.layerGrp[i].objGrp.children.length; j < maxj; j++) {
                if (this.layerGrp[i].objGrp.children[j] == object) {
                    returnValue = true;
                    break;
                }
            }
            if (returnValue)
                break;
        }
        return false;
    }
    SetDistanceVisibleWithObject(basicObj, targetObj, minViewDistance = 50, maxViewDistance = 500) {
        this.mapControl.addEventListener("change", (event) => {
            //확대 축소로 
            if (basicObj.position.distanceTo(targetObj.position) > minViewDistance && basicObj.position.distanceTo(targetObj.position) < maxViewDistance)
                targetObj.visible = true;
            else
                targetObj.visible = false;
        });
    }
    //#endregion
    /**
     * 수정모드를 변경함
     * @param mode 수정모드에 대한 속성을 지정함
     * @param swich enable, show_xyz의 on/off를 위해 사용
     */
    SetEditMode(mode, swich = true) {
        switch (mode) {
            case Struct.TransfromControlSetMode.enabled:
                this.editControls.enabled = swich;
                break;
            case Struct.TransfromControlSetMode.space_world:
                this.editControls.setSpace('world');
                break;
            case Struct.TransfromControlSetMode.space_local:
                this.editControls.setSpace('local');
                break;
            case Struct.TransfromControlSetMode.translate:
                this.editControls.setMode('translate');
                break;
            case Struct.TransfromControlSetMode.rotate:
                this.editControls.setMode('rotate');
                break;
            case Struct.TransfromControlSetMode.scale:
                this.editControls.setMode('scale');
                break;
            case Struct.TransfromControlSetMode.show_x:
                this.editControls.showX = swich;
                break;
            case Struct.TransfromControlSetMode.show_y:
                this.editControls.showY = swich;
                break;
            case Struct.TransfromControlSetMode.show_z:
                this.editControls.showZ = swich;
                break;
            default:
                break;
        }
    }
    /**
     * 수정모드를 사용할 오브젝트를 추가
     * @param obj 적용할 오브젝트
     */
    SetEditModeObj(obj) {
        this.editControls.attach(obj);
    }
    /**
     * 수정모드를 종료함
     */
    EndEditModeObj() {
        this.editControls.detach();
    }
    //#endregion
    SetSceneSize(innerWidth, innerHeight) {
        if (this.camera.type == "PerspectiveCamera") {
            this.camera.aspect = innerWidth / innerHeight;
            this.camera.updateProjectionMatrix();
        }
        else if (this.camera.type == "OrthographicCamera") {
            const aspect = innerWidth / innerHeight;
            this.camera.left = (innerWidth / this.rate2D) * aspect / -2;
            this.camera.right = (innerWidth / this.rate2D) * aspect / 2;
            this.camera.top = (innerHeight / this.rate2D) * aspect / 2;
            this.camera.bottom = (innerHeight / this.rate2D) * aspect / -2;
            this.camera.updateProjectionMatrix();
        }
        this.renderer.setSize(innerWidth, innerHeight);
        this.labelRenderer.setSize(innerWidth, innerHeight);
    }
    /**
     * 오브젝트를 클릭가능하도록 클릭가능 목록에 추가
     * @param obj 클릭할 오브젝트
     * @returns
     */
    AddClickableObj(obj) {
        if (!this.clickableObj.includes(obj)) {
            this.clickableObj.push(obj);
            return true;
        }
        return false;
    }
    Animate(tjlib) {
        requestAnimationFrame(() => { tjlib.Animate(tjlib); });
        //랜더링 처리를 넘어감
        if (!this.enableRenderMode)
            return;
        //실시간 처리
        tjlib.mapControl.update();
        tjlib.renderer.render(tjlib.scene, tjlib.camera);
        tjlib.labelRenderer.render(tjlib.scene, tjlib.camera);
        //상태확인
        if (tjlib.stats != undefined)
            tjlib.stats.update();
        //3D 맵모드인지 확인
        if (!this.cam2DMode) {
            //타겟팅카메라일경우
            if (tjlib.isModelTargeting && tjlib.targetingObj != undefined) {
                if (this.camLookatEvent)
                    tjlib.camera.lookAt(tjlib.targetingObj.position);
                tjlib.camera.position.set(tjlib.targetingObj.position.x, tjlib.targetingObj.position.y + tjlib.targetingLengh, tjlib.targetingObj.position.z + tjlib.targetingLengh);
            }
            tween_js_1.default.update();
            //카메라 기준점 처리하기
            if (tjlib.camBenchmarkObj != undefined) {
                tjlib.camBenchmarkObj.position.set(tjlib.mapControl.target.x, tjlib.mapControl.target.y, tjlib.mapControl.target.z);
                const camDistance = tjlib.camBenchmarkObj.position.distanceTo(tjlib.camera.position);
                tjlib.camBenchmarkObj.scale.set(camDistance / 30, camDistance / 30, camDistance / 30);
            }
            //애니메이션 이벤트이미터 처리
            tjlib._tempDeltaTime += tjlib.clock.getDelta();
            if (tjlib._tempDeltaTime >= 0.1) {
                tjlib._tempDeltaTime = 0;
                if (this.AnimateEvent != undefined)
                    this.AnimateEvent.next();
            }
        }
    }
    Destory() {
        this.scene.clear();
        this.AddLayerEvent.unsubscribe();
        this.AddLineEvent.unsubscribe();
        this.AddObjectEvent.unsubscribe();
        this.AddPOIEvent.unsubscribe();
        this.AddPolygonEvent.unsubscribe();
        this.AnimateEvent.unsubscribe();
    }
}
exports.ThreeJSLib = ThreeJSLib;
