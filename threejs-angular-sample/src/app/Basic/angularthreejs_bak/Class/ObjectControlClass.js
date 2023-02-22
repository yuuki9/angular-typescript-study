"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectControlClass = void 0;
const THREE = require("three");
const BufferGeometryUtils = require("three/examples/jsm/utils/BufferGeometryUtils.js");
const OBJLoader_1 = require("three/examples/jsm/loaders/OBJLoader");
const PLYLoader_1 = require("three/examples/jsm/loaders/PLYLoader");
const PCDLoader_1 = require("three/examples/jsm/loaders/PCDLoader");
const FBXLoader_1 = require("three/examples/jsm/loaders/FBXLoader");
const XYZLoader_1 = require("three/examples/jsm/loaders/XYZLoader");
const TDSLoader_1 = require("three/examples/jsm/loaders/TDSLoader");
const three_1 = require("three");
class ObjectControlClass {
    constructor(threeJsLib) {
        this.threeJsLib = threeJsLib;
    }
    //선택한 모델의 포지션을 변경함
    SetObjectPosition(layerName, objName, positionX, positionY, positionZ) {
        if (!this.threeJsLib.IsExistLayerInObjectName(layerName, objName))
            return false;
        let targetingObj = this.threeJsLib.GetLayerInObject(layerName, objName);
        targetingObj.position.setX(positionX);
        targetingObj.position.setY(positionY);
        targetingObj.position.setZ(positionZ);
        return true;
    }
    //선택한 모델의 회전값을 변경함
    SetObjectRotation(modelName, objName, rotaitionX, rotaitionY, rotaitionZ) {
        if (!this.threeJsLib.IsExistLayerInObjectName(modelName, objName))
            return false;
        let targetingObj = this.threeJsLib.GetLayerInObject(modelName, objName);
        targetingObj.rotateX(rotaitionX);
        targetingObj.rotateY(rotaitionY);
        targetingObj.rotateZ(rotaitionZ);
        return true;
    }
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //3D와 포인트 클라우드 오브젝트을 생성하고 관리하는 파트
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    AddPanel(layerName, objName, clickable = false, position, rotate, width, height, txturePath = "", minViewDistance = 0.1, maxViewDistance = 500) {
        //오브젝트 테스트
        const pnlGeometry = new THREE.PlaneGeometry(width, height);
        const texture = new THREE.TextureLoader().load(txturePath);
        const pnlMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(pnlGeometry, pnlMaterial);
        plane.position.set(position.x + width / 2, position.y + height / 2, position.z);
        plane.rotation.set(THREE.MathUtils.degToRad(rotate.x), THREE.MathUtils.degToRad(rotate.y), THREE.MathUtils.degToRad(rotate.z));
        plane.name = objName; //생성된 오브젝트 네임을 정의
        const tempThreeJsLib = this.threeJsLib;
        //기존레이어를 가져옴
        let targetLayer = tempThreeJsLib.GetLayer(layerName);
        if (targetLayer != undefined) {
            let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
            //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
            if (targetObj != undefined)
                targetObj === null || targetObj === void 0 ? void 0 : targetObj.add(plane); //오브젝트안에 오브젝트 중첩
            else { //새로운 오브젝트를 레이어에 넣기
                targetLayer.objGrp.add(plane); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(plane); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, plane); //오브젝트가 생긴것을 이벤트 처리
            }
        }
        else {
            //신규레이어생성
            targetLayer = tempThreeJsLib.CreateLayer(layerName);
            targetLayer.objGrp.add(plane); //레이어 오브젝트 그룹에 모델 추가
            if (clickable)
                tempThreeJsLib.AddClickableObj(plane); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
            if (tempThreeJsLib.AddObjectEvent != undefined)
                tempThreeJsLib.AddObjectEvent(objName, plane); //오브젝트가 생긴것을 이벤트 처리
        }
        //거리에 따른 랜더링 기능처리(아이콘)
        targetLayer.visible = true;
        targetLayer.viewDistanceMin = minViewDistance;
        targetLayer.viewDistanceMax = maxViewDistance;
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
    AddCircle(layerName, objName, clickable = false, position, lineWidth, radius, color = new THREE.Color(255, 0, 0), minViewDistance = 0.1, maxViewDistance = 500) {
        let positions = [new THREE.Vector3(position.x + (Math.sin(0) * radius), position.y + Math.cos(0) * radius)];
        for (let i = 1; i <= 360; i++) {
            const nowPointX = Math.sin(i * (Math.PI / 180)) * 5;
            const nowPointY = Math.cos(i * (Math.PI / 180)) * 5;
            positions.push(new THREE.Vector3(position.x + nowPointX, position.y + nowPointY));
        }
        this.threeJsLib.GISControl.AddLine(layerName, objName, clickable, positions, lineWidth, color, minViewDistance, maxViewDistance);
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
    Add3DS(layerName, objName, clickable = false, position, rotate, size, filePath = '/resource/models/3DS/djim600.3ds', txturePath = "", minViewDistance = 0.1, maxViewDistance = 500, returnObj) {
        const loader = new TDSLoader_1.TDSLoader();
        //리소스 경로 처리
        let paths = filePath.split('/');
        let resourcePath = "/";
        for (let index = 1; index < paths.length - 1; index++) {
            resourcePath += paths[index] + '/';
        }
        ;
        loader.setResourcePath(resourcePath);
        //3DS모델 
        const tempThreeJsLib = this.threeJsLib;
        loader.load(filePath, (objects) => {
            objects.position.set(position.x, position.y, position.z);
            objects.rotation.set((Math.PI / 2) * (rotate.x / 90), (Math.PI / 2) * (rotate.y / 90), (Math.PI / 2) * (rotate.z / 90));
            objects.scale.set(size, size, size);
            if (txturePath != "") {
                const texture = new THREE.TextureLoader().load(txturePath);
                objects.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshPhongMaterial({ map: texture });
                        child.castShadow = true;
                    }
                });
            }
            objects.name = objName; //생성된 오브젝트 네임을 정의
            objects.castShadow = true;
            objects.receiveShadow = true;
            //기존레이어를 가져옴
            let targetLayer = tempThreeJsLib.GetLayer(layerName);
            if (targetLayer != undefined) {
                let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
                //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
                if (targetObj != undefined)
                    targetObj === null || targetObj === void 0 ? void 0 : targetObj.add(objects); //오브젝트안에 오브젝트 중첩
                else { //새로운 오브젝트를 레이어에 넣기
                    targetLayer.objGrp.add(objects); //레이어 오브젝트 그룹에 모델 추가
                    if (clickable)
                        tempThreeJsLib.AddClickableObj(objects); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                    if (tempThreeJsLib.AddObjectEvent != undefined)
                        tempThreeJsLib.AddObjectEvent(objName, objects); //오브젝트가 생긴것을 이벤트 처리
                }
            }
            else {
                //신규레이어생성
                targetLayer = tempThreeJsLib.CreateLayer(layerName);
                targetLayer.objGrp.add(objects); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(objects); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, objects); //오브젝트가 생긴것을 이벤트 처리
            }
            //거리에 따른 랜더링 기능처리(아이콘)
            targetLayer.visible = true;
            targetLayer.viewDistanceMin = minViewDistance;
            targetLayer.viewDistanceMax = maxViewDistance;
            //오브젝트 콜백
            if (returnObj != undefined)
                returnObj(objects);
        });
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
    AddOBJ(layerName, objName, clickable = false, position, rotate, size, filePath = '/resource/models/3DS/djim600.3ds', txturePath = '/resource/models/3DS/djim600.jpg', minViewDistance = 0.1, maxViewDistance = 500) {
        const loader = new OBJLoader_1.OBJLoader();
        //리소스 경로 처리
        let paths = filePath.split('/');
        let resourcePath = "/";
        for (let index = 1; index < paths.length - 1; index++) {
            resourcePath += paths[index] + '/';
        }
        ;
        loader.setResourcePath(resourcePath);
        //OBJ모델 불러오기
        const tempThreeJsLib = this.threeJsLib;
        loader.load(filePath, function (objects) {
            objects.position.set(position.x, position.y, position.z);
            objects.rotation.set((Math.PI / 2) * (rotate.x / 90), (Math.PI / 2) * (rotate.y / 90), (Math.PI / 2) * (rotate.z / 90));
            objects.scale.set(size, size, size);
            if (txturePath != "") {
                const texture = new THREE.TextureLoader().load(txturePath);
                objects.traverse(function (child) {
                    if (child.isMesh)
                        child.material = new THREE.MeshPhongMaterial({ map: texture });
                });
            }
            objects.name = objName; //생성된 오브젝트 네임을 정의
            //기존레이어를 가져옴
            let targetLayer = tempThreeJsLib.GetLayer(layerName);
            if (targetLayer != undefined) {
                let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
                //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
                if (targetObj != undefined)
                    targetObj === null || targetObj === void 0 ? void 0 : targetObj.add(objects); //오브젝트안에 오브젝트 중첩
                else { //새로운 오브젝트를 레이어에 넣기
                    targetLayer.objGrp.add(objects); //레이어 오브젝트 그룹에 모델 추가
                    if (clickable)
                        tempThreeJsLib.AddClickableObj(objects); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                    if (tempThreeJsLib.AddObjectEvent != undefined)
                        tempThreeJsLib.AddObjectEvent(objName, objects); //오브젝트가 생긴것을 이벤트 처리
                }
            }
            else {
                //신규레이어생성
                targetLayer = tempThreeJsLib.CreateLayer(layerName);
                targetLayer.objGrp.add(objects); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(objects); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, objects); //오브젝트가 생긴것을 이벤트 처리
            }
            //거리에 따른 랜더링 기능처리(아이콘)
            targetLayer.visible = true;
            targetLayer.viewDistanceMin = minViewDistance;
            targetLayer.viewDistanceMax = maxViewDistance;
        });
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
    AddPLY(layerName, objName, clickable = false, position, rotate, size, filePath = '/resource/models/3DS/djim600.3ds', isPoint = false, minViewDistance = 0.1, maxViewDistance = 500) {
        const leader = new PLYLoader_1.PLYLoader();
        //3DS모델 
        const tempThreeJsLib = this.threeJsLib;
        leader.load(filePath, (geometry) => {
            geometry.computeVertexNormals();
            const vertexColors = (geometry.hasAttribute('color') === true);
            let meshObj, material;
            if (isPoint) {
                material = new THREE.PointsMaterial({ size: 0.001, vertexColors: vertexColors });
                meshObj = new THREE.Points(geometry, material);
            }
            else {
                material = new THREE.MeshStandardMaterial({ vertexColors: vertexColors });
                meshObj = new THREE.Mesh(geometry, material);
            }
            meshObj.position.set(position.x, position.y, position.z);
            meshObj.rotation.set((Math.PI / 2) * (rotate.x / 90), (Math.PI / 2) * (rotate.y / 90), (Math.PI / 2) * (rotate.z / 90));
            meshObj.scale.set(size, size, size);
            meshObj.name = objName; //생성된 오브젝트 네임을 정의
            meshObj.castShadow = true;
            meshObj.receiveShadow = true;
            //기존레이어를 가져옴
            let targetLayer = tempThreeJsLib.GetLayer(layerName);
            if (targetLayer != undefined) {
                let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
                //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
                if (targetObj != undefined)
                    targetObj === null || targetObj === void 0 ? void 0 : targetObj.add(meshObj); //오브젝트안에 오브젝트 중첩
                else { //새로운 오브젝트를 레이어에 넣기
                    targetLayer.objGrp.add(meshObj); //레이어 오브젝트 그룹에 모델 추가
                    if (clickable)
                        tempThreeJsLib.AddClickableObj(meshObj); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                    if (tempThreeJsLib.AddObjectEvent != undefined)
                        tempThreeJsLib.AddObjectEvent(objName, meshObj); //오브젝트가 생긴것을 이벤트 처리
                }
            }
            else {
                //신규레이어생성
                targetLayer = tempThreeJsLib.CreateLayer(layerName);
                targetLayer.objGrp.add(meshObj); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(meshObj); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, meshObj); //오브젝트가 생긴것을 이벤트 처리
            }
            //거리에 따른 랜더링 기능처리(아이콘)
            targetLayer.visible = true;
            targetLayer.viewDistanceMin = minViewDistance;
            targetLayer.viewDistanceMax = maxViewDistance;
        });
    }
    AddPCD(layerName, objName, clickable = false, position, rotate, size, filePath = '/resource/models/3DS/djim600.3ds', pointSize = 0.05, minViewDistance = 0.1, maxViewDistance = 500) {
        const leader = new PCDLoader_1.PCDLoader();
        //3DS모델 
        const tempThreeJsLib = this.threeJsLib;
        leader.load(filePath, (points) => {
            points.material.size = pointSize; //포인트 사이즈 변경
            points.position.set(position.x, position.y, position.z);
            points.rotation.set((Math.PI / 2) * (rotate.x / 90), (Math.PI / 2) * (rotate.y / 90), (Math.PI / 2) * (rotate.z / 90));
            points.scale.set(size, size, size);
            points.name = objName; //생성된 오브젝트 네임을 정의
            //기존레이어를 가져옴
            let targetLayer = tempThreeJsLib.GetLayer(layerName);
            if (targetLayer != undefined) {
                let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
                //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
                if (targetObj != undefined)
                    targetObj === null || targetObj === void 0 ? void 0 : targetObj.add(points); //오브젝트안에 오브젝트 중첩
                else { //새로운 오브젝트를 레이어에 넣기
                    targetLayer.objGrp.add(points); //레이어 오브젝트 그룹에 모델 추가
                    if (clickable)
                        tempThreeJsLib.AddClickableObj(points); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                    if (tempThreeJsLib.AddObjectEvent != undefined)
                        tempThreeJsLib.AddObjectEvent(objName, points); //오브젝트가 생긴것을 이벤트 처리
                }
            }
            else {
                //신규레이어생성
                targetLayer = tempThreeJsLib.CreateLayer(layerName);
                targetLayer.objGrp.add(points); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(points); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, points); //오브젝트가 생긴것을 이벤트 처리
            }
            //거리에 따른 랜더링 기능처리(아이콘)
            targetLayer.visible = true;
            targetLayer.viewDistanceMin = minViewDistance;
            targetLayer.viewDistanceMax = maxViewDistance;
        });
    }
    /**
     * GLTF모델을 추가하는 함수
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param position 지점의 XYZ좌표 (lon, alt, lat)
     * @param rotate 모델의 회전값
     * @param size 오브젝트의 크기
     * @param filePath 오브젝트의 원본 파일이 있는 경로
     */
    /*
    AddGLTF(layerName: string, objName: string, clickable: boolean = false, position: THREE.Vector3,rotate: THREE.Vector3, size: number, filePath: string = '/resource/models/GLTF/futatsugoya_tunnel_abandoned_road_japan/scene.gltf') {
        //GLTF모델 불러오기
        const loader = new GLTFLoader();
        loader.load(filePath, (objects: GLTF) => {
            objects.scene.position.set(position.x,position.y,position.z);
            objects.scene.scale.set((Math.PI / 2) * (rotate.x / 90), (Math.PI / 2) * (rotate.y / 90), (Math.PI / 2) * (rotate.z / 90));
            objects.scene.scale.set(size,size,size);
            objects.scene.name = objName;

            if (this.IsExistLayer(layerName) != undefined) {
                //기존레이어를 가져옴
                let targetLayer = this.IsExistLayer(layerName);
                //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
                if(this.IsExistLayerInObject(layerName, objName) != undefined)
                {
                    let targetObj:THREE.Object3D|undefined = this.GetLayerInObject(layerName, objName);
                    targetObj?.add(objects.scene); //오브젝트안에 오브젝트 중첩
                }
                else{ //새로운 오브젝트를 레이어에 넣기
                    targetLayer!.objGrp.add(objects.scene); //레이어 오브젝트 그룹에 모델 추가
                    if (clickable) this.clickableObj.push(objects.scene); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                    this.emitter.emit(ThreeJSEventList.AddObject.toString(), objName, objects); //오브젝트가 생긴것을 이벤트 처리
                }
            }
            else {
                //신규레이어생성
                let newLayer = this.CreateLayer(layerName);

                newLayer!.objGrp.add(objects.scene); //레이어 오브젝트 그룹에 모델 추가
                if (clickable) this.clickableObj.push(objects.scene); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                this.emitter.emit(ThreeJSEventList.AddObject.toString(), objName, objects); //오브젝트가 생긴것을 이벤트 처리
            }
        });
    }
    */
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
    AddFBX(layerName, objName, clickable = false, position, rotate, size, filePath = '/resource/models/3DS/djim600.3ds', txturePath = "", minViewDistance = 0.1, maxViewDistance = 500) {
        //GLTF모델 불러오기
        const loader = new FBXLoader_1.FBXLoader();
        const tempThreeJsLib = this.threeJsLib;
        loader.load(filePath, (objects) => {
            objects.position.set(position.x, position.y, position.z);
            objects.rotation.set((Math.PI / 2) * (rotate.x / 90), (Math.PI / 2) * (rotate.y / 90), (Math.PI / 2) * (rotate.z / 90));
            objects.scale.set(size, size, size);
            objects.name = objName;
            if (txturePath != "") {
                const texture = new THREE.TextureLoader().load(txturePath);
                objects.traverse(function (child) {
                    if (child.isMesh) {
                        child.material = new THREE.MeshPhongMaterial({ map: texture });
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
            }
            //기존레이어를 가져옴
            let targetLayer = tempThreeJsLib.GetLayer(layerName);
            if (targetLayer != undefined) {
                let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
                //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
                if (targetObj != undefined)
                    targetObj === null || targetObj === void 0 ? void 0 : targetObj.add(objects); //오브젝트안에 오브젝트 중첩
                else { //새로운 오브젝트를 레이어에 넣기
                    targetLayer.objGrp.add(objects); //레이어 오브젝트 그룹에 모델 추가
                    if (clickable)
                        tempThreeJsLib.AddClickableObj(objects); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                    if (tempThreeJsLib.AddObjectEvent != undefined)
                        tempThreeJsLib.AddObjectEvent(objName, objects); //오브젝트가 생긴것을 이벤트 처리
                }
            }
            else {
                //신규레이어생성
                targetLayer = tempThreeJsLib.CreateLayer(layerName);
                targetLayer.objGrp.add(objects); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(objects); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, objects); //오브젝트가 생긴것을 이벤트 처리
            }
            //거리에 따른 랜더링 기능처리(아이콘)
            targetLayer.visible = true;
            targetLayer.viewDistanceMin = minViewDistance;
            targetLayer.viewDistanceMax = maxViewDistance;
        });
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
    AddXYZ(layerName, objName, clickable = false, position, rotate, pointSize, filePath = '/resource/models/XYZ/VILLA_DONDI.xyz') {
        //XYZ모델 불러오기
        const loader = new XYZLoader_1.XYZLoader();
        const tempThreeJsLib = this.threeJsLib;
        loader.load(filePath, function (geometry) {
            //geometry.center(); 
            const vertexColors = (geometry.hasAttribute('color') === true);
            const material = new THREE.PointsMaterial({ size: pointSize, vertexColors: vertexColors });
            const Points = new THREE.Points(geometry, material);
            //오브젝트의 정의
            Points.name = objName; //생성된 오브젝트 네임을 정의
            Points.position.set(position.x, position.y, position.z); //위치지정
            Points.rotation.set((Math.PI / 2) * (rotate.x / 90), (Math.PI / 2) * (rotate.y / 90), (Math.PI / 2) * (rotate.z / 90));
            //레이어가 있으면 모델을 그룹에 추가
            let targetLayer = tempThreeJsLib.GetLayer(layerName);
            if (targetLayer != undefined) {
                let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
                //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
                if (targetObj != undefined)
                    targetObj === null || targetObj === void 0 ? void 0 : targetObj.add(Points); //오브젝트안에 오브젝트 중첩
                else { //새로운 오브젝트를 레이어에 넣기
                    targetLayer.objGrp.add(Points); //레이어 오브젝트 그룹에 모델 추가
                    if (clickable)
                        tempThreeJsLib.AddClickableObj(Points); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                    if (tempThreeJsLib.AddObjectEvent != undefined)
                        tempThreeJsLib.AddObjectEvent(objName, Points); //오브젝트가 생긴것을 이벤트 처리
                }
            }
            else {
                //신규레이어생성
                let newLayer = tempThreeJsLib.CreateLayer(layerName);
                newLayer.objGrp.add(Points); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(Points); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, Points); //오브젝트가 생긴것을 이벤트 처리
            }
        });
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
    AddXYZtoPolygon(layerName, objName, filePath, clickable = false, position = new THREE.Vector3(0, 0, 0), rotate = new THREE.Vector3(0, 0, 0), color = new THREE.Color(1, 1, 0), opacity = 1, minViewDistance = 0.1, maxViewDistance = 100000) {
        //XYZ모델 불러오기
        const loader = new XYZLoader_1.XYZLoader();
        const tempThreeJsLib = this.threeJsLib;
        loader.load(filePath, function (geometry) {
            //메테리얼 속성
            const material = new THREE.MeshBasicMaterial({});
            material.side = THREE.DoubleSide;
            material.color = color;
            material.transparent = true;
            material.opacity = opacity;
            //라인그리기
            const getPoints = geometry.getAttribute('position').array;
            let shape = new THREE.Shape();
            shape.moveTo(getPoints[0], getPoints[1]);
            for (let index = 3; index < getPoints.length; index += 3) {
                shape.lineTo(getPoints[index], getPoints[index + 1]);
            }
            shape.lineTo(getPoints[0], getPoints[1]);
            var geometryBuf = new THREE.ShapeGeometry(shape);
            //메시그리기
            let newMesh = new THREE.Mesh(geometryBuf, material);
            newMesh.name = objName;
            //오브젝트의 정의
            newMesh.name = objName; //생성된 오브젝트 네임을 정의
            newMesh.position.set(position.x, position.y, position.z); //위치지정
            newMesh.rotation.set((Math.PI / 2) * (rotate.x / 90), (Math.PI / 2) * (rotate.y / 90), (Math.PI / 2) * (rotate.z / 90));
            //레이어가 있으면 모델을 그룹에 추가
            let targetLayer = tempThreeJsLib.GetLayer(layerName);
            if (targetLayer != undefined) {
                let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
                //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
                if (targetObj != undefined)
                    targetObj === null || targetObj === void 0 ? void 0 : targetObj.add(newMesh); //오브젝트안에 오브젝트 중첩
                else { //새로운 오브젝트를 레이어에 넣기
                    targetLayer.objGrp.add(newMesh); //레이어 오브젝트 그룹에 모델 추가
                    if (clickable)
                        tempThreeJsLib.AddClickableObj(newMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                    if (tempThreeJsLib.AddObjectEvent != undefined)
                        tempThreeJsLib.AddObjectEvent(objName, newMesh); //오브젝트가 생긴것을 이벤트 처리
                }
            }
            else {
                //신규레이어생성
                targetLayer = tempThreeJsLib.CreateLayer(layerName);
                targetLayer.objGrp.add(newMesh); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(newMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, newMesh); //오브젝트가 생긴것을 이벤트 처리
            }
            //거리에 따른 랜더링 기능처리
            targetLayer.visible = true;
            targetLayer.viewDistanceMin = minViewDistance;
            targetLayer.viewDistanceMax = maxViewDistance;
        });
    }
    //.XYZ Raw 데이터의 구조를 변환하는 함수
    XYZRawDataTOBufferGeometry(xyzText, locOriginPos, locColors) {
        const lines = xyzText.split('\n');
        let vertices = [];
        let colors = [];
        for (let line of lines) {
            line = line.trim();
            if (line.charAt(0) === '#')
                continue; // skip comments
            const lineValues = line.split(/\s+/);
            if (lineValues.length >= 3) {
                const posx = parseFloat(lineValues[0]) - locOriginPos.x;
                const posy = parseFloat(lineValues[1]) - locOriginPos.y;
                const posz = parseFloat(lineValues[2]) - locOriginPos.z;
                // XYZ
                vertices.push(posx);
                vertices.push(posy);
                vertices.push(posz);
                //RGB 색상처리
                if (locColors != undefined) {
                    locColors.forEach(locColor => {
                        if (locColor.x1 <= posx && locColor.x2 >= posx && locColor.y1 <= posy && locColor.y2 >= posy) {
                            colors.push(locColor.r);
                            colors.push(locColor.g);
                            colors.push(locColor.b);
                        }
                    });
                }
                else if (lineValues.length >= 6) {
                    colors.push(parseFloat(lineValues[3]) / 255);
                    colors.push(parseFloat(lineValues[4]) / 255);
                    colors.push(parseFloat(lineValues[5]) / 255);
                }
                else {
                    colors.push(0);
                    colors.push(0);
                    colors.push(0);
                }
            }
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        if (colors.length > 0) {
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        }
        return geometry;
    }
    /**
     * 포인트클라우드(.XYZ)를 RAW데이터로 받아서 처리하는 함수 (실시간 랜더링)
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param xyzText XYZ파일의 양식이 적용된 string 문자 (raw)
     * @param swichAngle 정상적인 모델은 90도 정도 돌아가 있는 상태로 되어 있어 돌리는 작업을 한 경우에는 false로 지정 필요 (defalut : true)
     */
    AddXYZRawData(layerName, objName, pointSize = 1, clickable = false, xyzText, locOriginPos = new THREE.Vector3(0, 0, 0), locColors) {
        //XYZ신호를 geometry신호로 변경
        const geometry = this.XYZRawDataTOBufferGeometry(xyzText, locOriginPos, locColors);
        //XYZ모델 불러오기
        const vertexColors = (geometry.hasAttribute('color') === true);
        const material = new THREE.PointsMaterial({ size: pointSize, vertexColors: vertexColors });
        const Points = new THREE.Points(geometry, material);
        Points.name = objName; //생성된 오브젝트 네임을 정의
        //라이브러리 임시 저장
        const tempThreeJsLib = this.threeJsLib;
        //기존레이어를 가져옴
        let targetLayer = tempThreeJsLib.GetLayer(layerName);
        if (targetLayer != undefined) {
            //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
            let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
            if (targetObj != undefined) {
                if (targetObj.geometry == undefined)
                    targetLayer.objGrp.add(Points); //레이어 오브젝트 그룹에 모델 추가
                else {
                    const newMergeGeometry = BufferGeometryUtils.mergeBufferGeometries([targetObj.geometry, geometry]);
                    targetObj.geometry.dispose();
                    targetObj.geometry = newMergeGeometry;
                    newMergeGeometry.dispose();
                }
            }
            else { //새로운 오브젝트를 레이어에 넣기
                targetLayer.objGrp.add(Points); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(Points); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, Points); //오브젝트가 생긴것을 이벤트 처리
            }
        }
        else {
            //신규레이어생성
            let newLayer = tempThreeJsLib.CreateLayer(layerName);
            newLayer.objGrp.add(Points); //레이어 오브젝트 그룹에 모델 추가
            if (clickable)
                tempThreeJsLib.AddClickableObj(Points); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
            if (tempThreeJsLib.AddObjectEvent != undefined)
                tempThreeJsLib.AddObjectEvent(objName, Points); //오브젝트가 생긴것을 이벤트 처리
        }
        geometry.dispose();
        material.dispose();
    }
    AddTexture(layerName, objName, position, size, texturePath, clickable = false) {
        const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshBasicMaterial({ map: loader.load(texturePath) });
        const textureMesh = new THREE.Mesh(geometry, material);
        textureMesh.name = objName;
        textureMesh.position.set(position.x, position.y, position.z);
        //레이어가 있으면 모델을 그룹에 추가
        const tempThreeJsLib = this.threeJsLib;
        //레이어가 있으면 모델을 그룹에 추가
        let targetLayer = tempThreeJsLib.GetLayer(layerName);
        if (targetLayer != undefined) {
            //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
            if (tempThreeJsLib.IsExistLayerInObjectName(layerName, objName)) {
                let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
                targetObj === null || targetObj === void 0 ? void 0 : targetObj.add(textureMesh); //오브젝트안에 오브젝트 중첩
            }
            else { //새로운 오브젝트를 레이어에 넣기
                targetLayer.objGrp.add(textureMesh); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(textureMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, textureMesh); //오브젝트가 생긴것을 이벤트 처리
            }
        }
        else {
            //신규레이어생성
            let newLayer = tempThreeJsLib.CreateLayer(layerName);
            newLayer.objGrp.add(textureMesh); //레이어 오브젝트 그룹에 모델 추가
            if (clickable)
                tempThreeJsLib.AddClickableObj(textureMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
            if (tempThreeJsLib.AddObjectEvent != undefined)
                tempThreeJsLib.AddObjectEvent(objName, textureMesh); //오브젝트가 생긴것을 이벤트 처리
        }
    }
    AddCylinder(layerName, objName, position, size, height, color, opacity = 1, clickable = false) {
        const geometry = new THREE.CylinderGeometry(size, size, height, 30, 1);
        const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity, side: three_1.FrontSide });
        geometry.rotateX(THREE.MathUtils.degToRad(90));
        const textureMesh = new THREE.Mesh(geometry, material);
        textureMesh.name = objName;
        textureMesh.position.set(position.x, position.y, position.z);
        //레이어가 있으면 모델을 그룹에 추가
        const tempThreeJsLib = this.threeJsLib;
        //레이어가 있으면 모델을 그룹에 추가
        let targetLayer = tempThreeJsLib.GetLayer(layerName);
        if (targetLayer != undefined) {
            //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
            if (tempThreeJsLib.IsExistLayerInObjectName(layerName, objName)) {
                let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
                targetObj === null || targetObj === void 0 ? void 0 : targetObj.add(textureMesh); //오브젝트안에 오브젝트 중첩
            }
            else { //새로운 오브젝트를 레이어에 넣기
                targetLayer.objGrp.add(textureMesh); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(textureMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, textureMesh); //오브젝트가 생긴것을 이벤트 처리
            }
        }
        else {
            //신규레이어생성
            let newLayer = tempThreeJsLib.CreateLayer(layerName);
            newLayer.objGrp.add(textureMesh); //레이어 오브젝트 그룹에 모델 추가
            if (clickable)
                tempThreeJsLib.AddClickableObj(textureMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
            if (tempThreeJsLib.AddObjectEvent != undefined)
                tempThreeJsLib.AddObjectEvent(objName, textureMesh); //오브젝트가 생긴것을 이벤트 처리
        }
    }
    AddLineToBox(layerName, objName, stPoint, edPoint, thick, height, color, opacity = 1, clickable = false) {
        //라인의 기울기를 구하는 공식
        const lineInclinationZ = Math.atan2(stPoint.y - edPoint.y, stPoint.x - edPoint.x);
        const lineInclinationY = Math.atan2(stPoint.z - edPoint.z, stPoint.x - edPoint.x);
        //라인의 길이를 구하는공식
        const lineDistance = stPoint.distanceTo(edPoint);
        //라인의 중앙점을 구하는 공식
        const centerPoint = new THREE.Vector3((stPoint.x + edPoint.x) / 2, (stPoint.y + edPoint.y) / 2, (stPoint.z + edPoint.z) / 2);
        //오브젝트만들기
        const geometry = new THREE.BoxGeometry(lineDistance, thick, height, 1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity, side: three_1.FrontSide });
        const boxMesh = new THREE.Mesh(geometry, material);
        boxMesh.position.set(centerPoint.x, centerPoint.y, centerPoint.z);
        geometry.rotateY(lineInclinationY);
        geometry.rotateZ(lineInclinationZ);
        boxMesh.name = objName;
        //레이어가 있으면 모델을 그룹에 추가
        const tempThreeJsLib = this.threeJsLib;
        //레이어가 있으면 모델을 그룹에 추가
        let targetLayer = tempThreeJsLib.GetLayer(layerName);
        if (targetLayer != undefined) {
            //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
            if (tempThreeJsLib.IsExistLayerInObjectName(layerName, objName)) {
                let targetObj = tempThreeJsLib.GetLayerInObject(layerName, objName);
                targetObj === null || targetObj === void 0 ? void 0 : targetObj.add(boxMesh); //오브젝트안에 오브젝트 중첩
            }
            else { //새로운 오브젝트를 레이어에 넣기
                targetLayer.objGrp.add(boxMesh); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    tempThreeJsLib.AddClickableObj(boxMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (tempThreeJsLib.AddObjectEvent != undefined)
                    tempThreeJsLib.AddObjectEvent(objName, boxMesh); //오브젝트가 생긴것을 이벤트 처리
            }
        }
        else {
            //신규레이어생성
            let newLayer = tempThreeJsLib.CreateLayer(layerName);
            newLayer.objGrp.add(boxMesh); //레이어 오브젝트 그룹에 모델 추가
            if (clickable)
                tempThreeJsLib.AddClickableObj(boxMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
            if (tempThreeJsLib.AddObjectEvent != undefined)
                tempThreeJsLib.AddObjectEvent(objName, boxMesh); //오브젝트가 생긴것을 이벤트 처리
        }
    }
    /**
     * 오브젝트의 텍스쳐를 변경함
     * @param obj 타겟 오브젝트 (Mesh타입의 오브젝트만 가능)
     * @param texturePath 텍스쳐 경로
     * @returns
     */
    SetObjTexture(targetObj, texturePath) {
        if (targetObj.type == "Mesh") {
            const loader = new THREE.TextureLoader();
            targetObj.material.map = loader.load(texturePath);
            return true;
        }
        else if (targetObj.type == "Sprite") {
            const loader = new THREE.TextureLoader();
            targetObj.material.map = loader.load(texturePath);
            return true;
        }
        return false;
    }
}
exports.ObjectControlClass = ObjectControlClass;
