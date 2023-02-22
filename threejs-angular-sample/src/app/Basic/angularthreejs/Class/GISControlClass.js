"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GISControlClass = void 0;
const THREE = require("three");
const BufferGeometryUtils = require("three/examples/jsm/utils/BufferGeometryUtils.js");
const Line2_1 = require("three/examples/jsm/lines/Line2");
const LineGeometry_1 = require("three/examples/jsm/lines/LineGeometry");
const LineMaterial_1 = require("three/examples/jsm/lines/LineMaterial");
const CSS2DRenderer_1 = require("three/examples/jsm/renderers/CSS2DRenderer");
const Utils_1 = require("../Utils");
class GISControlClass {
    constructor(threeJsLib) {
        //#region GIS 측량기능
        //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        //지도의 거리 및 넓이를 측량하는 기능
        //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        this.surveyLayerName = "ENGINE_SURVEY_LAYER";
        this.surveyCurrentPosition = undefined;
        this.surveyObjNum = 0;
        this.surveyTempPointList = [];
        this.threeJsLib = threeJsLib;
    }
    /**
     * 지면의 가이드를 보기 위해서 그라운드를 초기화
     * @param clickable 그라운드가 클릭가능한 속성으로 처리할지 선택
     */
    InitGound(clickable, size = 1600, texturePath = "/assets/resources/texture/terrain/grasslight-big.jpg") {

        //GROUND
        const gt = new THREE.TextureLoader().load(texturePath);
        const gg = new THREE.PlaneGeometry(size, size);
        const gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });
        const ground = new THREE.Mesh(gg, gm);
        //note that because the ground does not cast a shadow, .castShadow is left false
        ground.castShadow = false;
        ground.receiveShadow = true;
        this.threeJsLib.GetScene().add(ground);
        if (clickable)
            this.threeJsLib.AddClickableObj(ground); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
    }
    /**
     * 해당 모드를 실행하면 클릭 될 때마다 길이를 구하는 함수
     * 측량모드를 종료할 때는 CancelClacMode()를 사용하요 종료함
     * @param dotResourcePath 선과 선사이의 점의 POI를 만들 이미지
     */
    SetCalcDistanceMode(dotResourcePath = "assets/resources/geometry/dot.png") {
        //모드를 시작하면 포인트에 대한 리스트를 정리함
        this.surveyTempPointList = [];
        this.surveyObjNum++;
        //클릭된 점에 대한 좌표를 클릭함
        const tempSub = this.threeJsLib.ClickObjectEvent.subscribe((event) => {
            tempSub.unsubscribe();
            this.surveyTempPointList.push(event.point);
            let distance = 0;
            for (let i = 1; i < this.surveyTempPointList.length; i++) {
                distance += this.surveyTempPointList[i - 1].distanceTo(this.surveyTempPointList[i]);
            }
            this.AddPOI(this.surveyLayerName, "POI" + this.surveyObjNum, false, dotResourcePath, event.point, 0.01, distance.toFixed(2) + "m", "", "", 0.1, 1000000);
            if (this.surveyCurrentPosition != undefined)
                this.AddLine(this.surveyLayerName, "Line" + this.surveyObjNum, false, [this.surveyCurrentPosition, event.point], 100, new THREE.Color(1, 1, 0), 0.01, 1000000);
            this.surveyCurrentPosition = event.point;
        });
    }
    /**
     * 해당 모드를 실행하면 클릭 될 때마다 도형을 그려 넓이를 구함
     * 도형을 그릴때 시계 또는 시계 반대 방향으로 통일해서 클릭해야함
     * 측량모드를 종료할 때는 CancelClacMode()를 사용하요 종료함
     */
    SetCalcMultiAreaMode() {
        //모드를 시작하면 포인트에 대한 리스트를 정리함
        this.surveyTempPointList = [];
        this.surveyObjNum++;
        //클릭된 점에 대한 좌표를 클릭함
        let minPos = new THREE.Vector3(), maxPos = new THREE.Vector3();
        const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
        const tempSub = this.threeJsLib.ClickObjectEvent.subscribe((event) => {
            //tempSub.unsubscribe();
            this.surveyTempPointList.push(event.point);
            //중앙점 구하기 위한 처리
            if (event.point.x < minPos.x)
                minPos.x = event.point.x;
            if (event.point.y < minPos.y)
                minPos.y = event.point.y;
            if (event.point.z < minPos.z)
                minPos.z = event.point.z;
            if (event.point.x > maxPos.x)
                maxPos.x = event.point.x;
            if (event.point.y > maxPos.y)
                maxPos.y = event.point.y;
            if (event.point.z > maxPos.z)
                maxPos.z = event.point.z;
            //도형그리기
            if (this.surveyCurrentPosition != undefined)
                this.AddLine(this.surveyLayerName, "Line" + this.surveyObjNum, false, [this.surveyCurrentPosition, event.point], 100, new THREE.Color(1, 1, 0), 0.01, 1000000);
            if (this.surveyTempPointList.length >= 3) {
                this.threeJsLib.RemoveLayerInObjectFromName(this.surveyLayerName, "Polygon" + this.surveyObjNum);
                this.threeJsLib.RemoveLayerInObjectFromName(this.surveyLayerName, "POI" + this.surveyObjNum);
                this.AddPolygon(this.surveyLayerName, "Polygon" + this.surveyObjNum, false, this.surveyTempPointList, randomColor, 0.8, 0.001, 1000000);
                this.AddPOI(this.surveyLayerName, "POI" + this.surveyObjNum, false, "", new THREE.Vector3((minPos.x + maxPos.x) / 2, (minPos.y + maxPos.y) / 2, (minPos.z + maxPos.z) / 2), 0.01, THREE.ShapeUtils.area(this.surveyTempPointList).toFixed(2) + "m²", "", "", 0.1, 1000000);
            }
            this.surveyCurrentPosition = event.point;
        });
    }
    /**
     * 측량모드를 종료함
     */
    CancelClacMode() {
        //모드를 종료하면 포인트에 대한 리스트를 초기화함
        this.surveyTempPointList = [];
        this.surveyObjNum = 0;
        //레이어의 모든 오브젝트를 삭제함
        this.threeJsLib.RemoveLayerFromName(this.surveyLayerName);
    }
    //#endregion
    //#region GIS엔진기능
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //POI생성, (점, 라인, 폴리곤) 그리기
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
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
    AddPOI(layerName, objName, clickable = false, imgPath = '/resources/POI/b1.png', position, size = 5, text = "", dataKey, dataValue, minViewDistance = 50, maxViewDistance = 500, returnObj) {
        //POI이미지 뿌리기
        const map = new THREE.TextureLoader().load(imgPath);
        const material = new THREE.SpriteMaterial({ map: map, sizeAttenuation: false });
        const POI = new THREE.Sprite(material);
        //POI설정
        POI.scale.set(size, size, size);
        POI.position.set(position.x, position.y, position.z);
        POI.name = objName; //생성된 오브젝트 네임을 정의
        if (dataKey != undefined && dataKey != '' && dataKey != null && dataValue != undefined && dataValue != '' && dataValue != null)
            POI.userData[dataKey] = dataValue; //POI에 사용자 정보 추가
        //레이어가 있으면 모델을 그룹에 추가
        let targetLayer = this.threeJsLib.GetLayer(layerName);
        if (targetLayer != undefined) {
            //레이어 오브젝트 그룹에 모델 추가
            targetLayer.objGrp.add(POI);
            if (clickable)
                this.threeJsLib.AddClickableObj(POI); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
            if (this.threeJsLib.AddPOIEvent != undefined)
                this.threeJsLib.AddPOIEvent.next({ objectName: objName, object: POI }); //오브젝트가 생긴것을 이벤트 처리
        }
        else {
            //신규레이어생성
            targetLayer = this.threeJsLib.CreateLayer(layerName);
            //레이어 오브젝트 그룹에 모델 추가
            targetLayer.objGrp.add(POI);
            if (clickable)
                this.threeJsLib.AddClickableObj(POI); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
            if (this.threeJsLib.AddPOIEvent != undefined)
                this.threeJsLib.AddPOIEvent.next({ objectName: objName, object: POI }); //오브젝트가 생긴것을 이벤트 처리
        }
        //오브젝트 생성 콜백처리
        if (returnObj != undefined)
            returnObj(POI);
        //2D모드일 때 줌 크기에 따라서 오브젝트의 크기가 결정되도록 설정
        if (this.threeJsLib.cam2DMode) {
            const tempInterval = setInterval(() => {
                const getSprit = this.threeJsLib.GetLayerInObject(layerName, objName);
                if (getSprit == undefined)
                    clearInterval(tempInterval);
                POI.scale.set(size / this.threeJsLib.CameraControl.GetZoomValue(), size / this.threeJsLib.CameraControl.GetZoomValue(), size / this.threeJsLib.CameraControl.GetZoomValue());
            }, 100);
        }
        //거리에 따른 랜더링 기능처리(아이콘)
        targetLayer.visible = true;
        targetLayer.viewDistanceMin = minViewDistance;
        targetLayer.viewDistanceMax = maxViewDistance;
        //거리에 따른 랜더링 기능처리(라벨)
        const earthLabel = this.SetCSSLabel(text, size, POI);
        targetLayer.objGrp.add(earthLabel);
        POI.userData["CSS_LABEL"] = earthLabel; //나중에 지우기 위해서 저장함
    }
    /**
     * POI 오브젝트의 이미지를 변경하는 함수
     * @param POI POI 오브젝트
     * @param imgPath 변경 할 이미지 경로
     */
    ChangePOIImage(POI, imgPath) {
        const map = new THREE.TextureLoader().load(imgPath);
        POI.material.map = map;
    }
    /**
     * POI 오브젝트의 사이즈를 변경하는 함수
     * @param POI POI 오브젝트
     * @param size 변경할 사이즈
     */
    ChangePOISize(POI, size) {
        POI.scale.set(size, size, size);
    }
    SetCSSLabel(text, size, Obj) {
        const earthDiv = document.createElement('div');
        earthDiv.className = 'label';
        earthDiv.textContent = text;
        earthDiv.style.marginLeft = '0em';
        earthDiv.style.marginTop = (30 * size).toString() + 'em';
        const earthLabel = new CSS2DRenderer_1.CSS2DObject(earthDiv);
        earthLabel.name = Obj.name;
        earthLabel.position.set(Obj.position.x, Obj.position.y, Obj.position.z);
        return earthLabel;
    }
    /**
     * (GIS기능) 라인생성
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param clickable 클릭 가능한 속성을 가짐
     * @param positions XYZ좌표를 가진 포인트 리스트 (첫점부터 연결된 라인으로 구성)
     * @param lineWidth 라인의 두께 지정
     * @param color 라인색상지정
     */
    AddLine(layerName, objName, clickable = false, positions, lineWidth = 1, color = new THREE.Color(1, 1, 0), minViewDistance = 0.1, maxViewDistance = 500) {
        if (positions.length <= 1)
            return false;
        let setPosition = [];
        positions.forEach((point) => {
            setPosition.push(point.x, point.y, point.z);
        });
        const geometry = new LineGeometry_1.LineGeometry();
        geometry.setPositions(setPosition);
        geometry.setColors([color.r, color.g, color.b]);
        const material = new LineMaterial_1.LineMaterial({
            color: new THREE.Color(color.r, color.g, color.b).getHex(),
            linewidth: lineWidth / 10000, // in pixels
            //vertexColors:true
        });
        let newLine = new Line2_1.Line2(geometry, material);
        newLine.name = objName;
        //레이어가 있으면 모델을 그룹에 추가
        let targetLayer = this.threeJsLib.GetLayer(layerName);
        if (targetLayer != undefined) {
            //레이어 오브젝트 그룹에 모델 추가
            targetLayer.objGrp.add(newLine);
            if (clickable)
                this.threeJsLib.AddClickableObj(newLine); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
            if (this.threeJsLib.AddLineEvent != undefined)
                this.threeJsLib.AddLineEvent.next({ objectName: objName, object: newLine }); //오브젝트가 생긴것을 이벤트 처리
        }
        else {
            //신규레이어생성
            targetLayer = this.threeJsLib.CreateLayer(layerName);
            //레이어 오브젝트 그룹에 모델 추가
            targetLayer.objGrp.add(newLine);
            if (clickable)
                this.threeJsLib.AddClickableObj(newLine); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
            if (this.threeJsLib.AddLineEvent != undefined)
                this.threeJsLib.AddLineEvent.next({ objectName: objName, object: newLine }); //오브젝트가 생긴것을 이벤트 처리
        }
        //거리에 따른 랜더링 기능처리(아이콘)
        targetLayer.visible = true;
        targetLayer.viewDistanceMin = minViewDistance;
        targetLayer.viewDistanceMax = maxViewDistance;
        return true;
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
    AddPolygon(layerName, objName, clickable = false, meshPositions, color = new THREE.Color(1, 1, 0), opacity = 1, minViewDistance = 50, maxViewDistance = 500) {
        //메테리얼 속성
        const material = new THREE.MeshBasicMaterial({});
        material.side = THREE.DoubleSide;
        material.color = color;
        material.transparent = true;
        material.opacity = opacity;
        //material.wireframe = true;
        //라인그리기
        const geometry = new THREE.BufferGeometry();
        let points = [];
        for (let index = 2; index < meshPositions.length; index++) {
            points.push(meshPositions[index - 1].x);
            points.push(meshPositions[index - 1].y);
            points.push(meshPositions[index - 1].z);
            points.push(meshPositions[0].x);
            points.push(meshPositions[0].y);
            points.push(meshPositions[0].z);
            points.push(meshPositions[index].x);
            points.push(meshPositions[index].y);
            points.push(meshPositions[index].z);
        }
        let vertices = new Float32Array(points);
        let buffer = new THREE.BufferAttribute(vertices, 3);
        geometry.setAttribute('position', buffer);
        let newMesh = new THREE.Mesh(geometry, material);
        newMesh.name = objName;
        //레이어가 있으면 모델을 그룹에 추가
        let targetLayer = this.threeJsLib.GetLayer(layerName);
        if (targetLayer != undefined) {
            //이미 같은 이름의 오브젝트가 있는 경우 해당 오브젝트에 중첩으로 생성
            if (this.threeJsLib.IsExistLayerInObjectName(layerName, objName)) {
                //오브젝트 중첩처리
                let targetObj = this.threeJsLib.GetLayerInObject(layerName, objName);
                if (targetObj.geometry == undefined)
                    targetLayer.objGrp.add(newMesh); //레이어 오브젝트 그룹에 모델 추가
                else {
                    const newMergeGeometry = BufferGeometryUtils.mergeBufferGeometries([targetObj.geometry, geometry]);
                    targetObj.geometry.dispose();
                    targetObj.geometry = newMergeGeometry;
                    newMergeGeometry.dispose();
                }
            }
            else { //새로운 오브젝트를 레이어에 넣기
                targetLayer.objGrp.add(newMesh); //레이어 오브젝트 그룹에 모델 추가
                if (clickable)
                    this.threeJsLib.AddClickableObj(newMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
                if (this.threeJsLib.AddObjectEvent != undefined)
                    this.threeJsLib.AddObjectEvent.next({ objectName: objName, object: newMesh }); //오브젝트가 생긴것을 이벤트 처리
            }
            /*
            //기존레이어를 가져옴
            let targetLayer = this.threeJsLib.GetLayer(layerName);

            //레이어 오브젝트 그룹에 모델 추가
            targetLayer!.objGrp.add(newMesh)
            if (clickable) this.threeJsLib.AddClickableObj(newMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
            if (this.threeJsLib.AddPolygonEvent != undefined) this.threeJsLib.AddPolygonEvent(objName, newMesh); //오브젝트가 생긴것을 이벤트 처리
            */
        }
        else {
            //신규레이어생성
            targetLayer = this.threeJsLib.CreateLayer(layerName);
            //레이어 오브젝트 그룹에 모델 추가
            targetLayer.objGrp.add(newMesh);
            if (clickable)
                this.threeJsLib.AddClickableObj(newMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
            if (this.threeJsLib.AddPolygonEvent != undefined)
                this.threeJsLib.AddPolygonEvent.next({ objectName: objName, object: newMesh }); //오브젝트가 생긴것을 이벤트 처리
        }
        //거리에 따른 랜더링 기능처리
        targetLayer.visible = true;
        targetLayer.viewDistanceMin = minViewDistance;
        targetLayer.viewDistanceMax = maxViewDistance;
    }
    /**
     * AddPolygon을 사용한 오브젝트에 추가로 포지션을 추가할 때 사용
     * @param layerName 레이어 이름 (기존에 있는 경우 자동으로 추가로 처리됨)
     * @param objName 추가할 오브젝트의 이름
     * @param meshPositions 추가할 점위치 리스트 (끝점에 추가됨)
     * @returns AddPolygon으로 생성되지 않은 오브젝트일 경우에 false로 리턴함
     */
    AddPolygonPlusPosition(layerName, objName, meshPositions) {
        let targetObj = this.threeJsLib.GetLayerInObject(layerName, objName);
        if (targetObj == undefined)
            return false;
        let getMesh = targetObj;
        let getBufferAttr = getMesh.geometry.getAttribute('position');
        //포인트 재정의
        let newPoints = [];
        for (let index = 0; index < getBufferAttr.array.length; index++) {
            newPoints.push(getBufferAttr.array[index]);
        }
        //신규포인트 추가하기
        meshPositions.forEach(point => {
            newPoints.push(newPoints[newPoints.length - 6]);
            newPoints.push(newPoints[newPoints.length - 6]);
            newPoints.push(newPoints[newPoints.length - 6]);
            newPoints.push(newPoints[newPoints.length - 6]);
            newPoints.push(newPoints[newPoints.length - 6]);
            newPoints.push(newPoints[newPoints.length - 6]);
            newPoints.push(point.x);
            newPoints.push(point.y);
            newPoints.push(point.z);
        });
        let newVertices = new Float32Array(newPoints);
        let newbuffer = new THREE.BufferAttribute(newVertices, 3);
        getMesh.geometry.setAttribute('position', newbuffer);
        targetObj = new THREE.Mesh(getMesh.geometry, getMesh.material);
        return true;
    }
    AddTerain(layerName, objName, clickable, position, rotate, widthSize, heightSize, segWidth, segHeight, altitudes, texturePath = '') {
        const size = segWidth * segHeight;
        const geometry = new THREE.PlaneGeometry(widthSize, heightSize, segWidth - 1, segHeight - 1);
        const vertices = geometry.attributes['position'].array;
        for (let i = 0; i < size; i++) {
            vertices[i * 3 + 2] = altitudes[i];
        }
        //텍스쳐처리
        let texture;
        if (texture != '') {
            texture = new THREE.TextureLoader().load('assets/resources/texture/terrain/geoImg.PNG');
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
            texture.anisotropy = 16;
            texture.encoding = THREE.sRGBEncoding;
        }
        else {
            texture = new THREE.CanvasTexture(this.generateTexture(altitudes, segWidth - 1, segHeight - 1));
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
        }
        //오브젝트 생성
        const newMesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }));
        //레이어가 있으면 모델을 그룹에 추가
        let targetLayer = this.threeJsLib.GetLayer(layerName);
        //신규레이어생성 (기존레이어가 없으면)
        if (targetLayer == undefined)
            targetLayer = this.threeJsLib.CreateLayer(layerName);
        //레이어 오브젝트 그룹에 모델 추가
        targetLayer.objGrp.add(newMesh);
        if (clickable)
            this.threeJsLib.AddClickableObj(newMesh); //클릭가능 속성이 있으면 클릭가능 오브젝트에 넣음
        if (this.threeJsLib.AddObjectEvent != undefined)
            this.threeJsLib.AddObjectEvent.next({ objectName: objName, object: newMesh }); //오브젝트가 생긴것을 이벤트 처리
    }
    /** 텍스쳐가 없을 때 고도에 따른 색상변화로 텍스쳐로 표현할 때 */
    generateTexture(data, width, height) {
        // bake lighting into texture
        let context, image, imageData, shade;
        const vector3 = new THREE.Vector3(0, 0, 0);
        const sun = new THREE.Vector3(1, 1, 1);
        sun.normalize();
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0, 0, width, height);
        image = context.getImageData(0, 0, canvas.width, canvas.height);
        imageData = image.data;
        for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
            vector3.x = data[j - 2] - data[j + 2];
            vector3.y = 2;
            vector3.z = data[j - width * 2] - data[j + width * 2];
            vector3.normalize();
            shade = vector3.dot(sun);
            imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
            imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
            imageData[i + 2] = (shade * 96) * (0.5 + data[j] * 0.007);
        }
        context.putImageData(image, 0, 0);
        // Scaled 4x
        const canvasScaled = document.createElement('canvas');
        canvasScaled.width = width * 4;
        canvasScaled.height = height * 4;
        context = canvasScaled.getContext('2d');
        context.scale(4, 4);
        context.drawImage(canvas, 0, 0);
        image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
        imageData = image.data;
        for (let i = 0, l = imageData.length; i < l; i += 4) {
            const v = ~~(Math.random() * 5);
            imageData[i] += v;
            imageData[i + 1] += v;
            imageData[i + 2] += v;
        }
        context.putImageData(image, 0, 0);
        return canvasScaled;
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
    AddGeoFence(layerName, objName, position, linePaths, width, height, color, opacity) {
        var _a, _b;
        //점을 2개 이하를 가지면 만들지 않음
        if (linePaths.length < 2)
            return;
        //펜스 경로 구축 (업다운)
        let getUpFencePos = [];
        let getDownFencePos = [];
        for (let i = 1; i < linePaths.length; i++) {
            const getPos = Utils_1.ThreeUtils.GetUpDownLineNewPos(new THREE.Vector3(linePaths[i - 1].x, linePaths[i - 1].y, linePaths[i - 1].z), new THREE.Vector3(linePaths[i].x, linePaths[i].y, linePaths[i].z), width);
            //윗쪽 벽좌표 구하기
            if (getUpFencePos.length > 1) {
                const currentStartPos = getPos[0];
                const currentEndPos = getPos[1];
                const leastStartPos = getUpFencePos[getUpFencePos.length - 2];
                const leastEndPos = getUpFencePos[getUpFencePos.length - 1];
                const crossPos = Utils_1.ThreeUtils.GetIntersectionPoint(leastStartPos, leastEndPos, currentStartPos, currentEndPos);
                if (crossPos != undefined) {
                    getUpFencePos[getUpFencePos.length - 1] = crossPos;
                    getUpFencePos.push(currentEndPos);
                }
                else
                    getUpFencePos.push(currentStartPos, currentEndPos);
            }
            else
                getUpFencePos.push(getPos[0], getPos[1]);
            //아래쪽 벽좌표 구하기
            if (getDownFencePos.length > 1) {
                const currentStartPos = getPos[2];
                const currentEndPos = getPos[3];
                const leastStartPos = getDownFencePos[getDownFencePos.length - 2];
                const leastEndPos = getDownFencePos[getDownFencePos.length - 1];
                const crossPos = Utils_1.ThreeUtils.GetIntersectionPoint(leastStartPos, leastEndPos, currentStartPos, currentEndPos);
                if (crossPos != undefined) {
                    getDownFencePos[getDownFencePos.length - 1] = crossPos;
                    getDownFencePos.push(currentEndPos);
                }
                else
                    getDownFencePos.push(currentStartPos, currentEndPos);
            }
            else
                getDownFencePos.push(getPos[2], getPos[3]);
        }
        //윗쪽 벽만들기
        for (let i = 1; i < getUpFencePos.length; i++)
            this.threeJsLib.ObjectControl.AddLineToBox(layerName, objName + "_UpBox" + (i - 1), new THREE.Vector3(getUpFencePos[i - 1].x, getUpFencePos[i - 1].y, getUpFencePos[i - 1].z), new THREE.Vector3(getUpFencePos[i].x, getUpFencePos[i].y, getUpFencePos[i].z), 0.1, height, color, opacity);
        //아래쪽 벽만들기
        for (let i = 1; i < getDownFencePos.length; i++)
            this.threeJsLib.ObjectControl.AddLineToBox(layerName, objName + "_DownBox" + (i - 1), new THREE.Vector3(getDownFencePos[i - 1].x, getDownFencePos[i - 1].y, getDownFencePos[i - 1].z), new THREE.Vector3(getDownFencePos[i].x, getDownFencePos[i].y, getDownFencePos[i].z), 0.1, height, color, opacity);
        //레이어 전체 위치 이동
        (_a = this.threeJsLib.GetLayer(layerName)) === null || _a === void 0 ? void 0 : _a.objGrp.position.set(position.x, position.y, position.z);
        //오브젝트들의 그룹을 내보냄
        return (_b = this.threeJsLib.GetLayer(layerName)) === null || _b === void 0 ? void 0 : _b.objGrp;
    }
}
exports.GISControlClass = GISControlClass;
