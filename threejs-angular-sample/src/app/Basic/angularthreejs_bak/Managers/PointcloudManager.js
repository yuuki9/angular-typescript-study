"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointcloudRender = exports.PointcloudStreamRender = void 0;
const THREE = require("three");
/**
 * 기준 위치로 부터 정해진 위치까지 주변의 데이터를 스트리밍으로 가져오는 모듈
 */
class PointcloudStreamRender {
    /**
     * (스트리밍) 포인트 클라우드 초기화
     * @param pointCloudAPI RestAPI 모듈 속성
     */
    constructor(pointCloudAPI, threeJsLib, layerName, position, targetObj = undefined, viewDistance, maxLevel = 10, pointSize = 0.01, isLocal = false) {
        this.pc_cd = "";
        this.pc_idx = 0;
        this.maxX = 0;
        this.minX = 0;
        this.maxY = 0;
        this.minY = 0;
        this.maxZ = 0;
        this.minZ = 0;
        this.interX = 0;
        this.interY = 0;
        this.interZ = 0;
        this.splitLevel = 1;
        //위의 저보로 나뉜 격자의 갯수 확인
        this.splitCntX = 0;
        this.splitCntY = 0;
        this.splitCntZ = 0;
        //최근 타겟이 위치한 격자의 번호 저장
        this.curTargetPosX = 0;
        this.curTargetPosY = 0;
        this.curTargetPosZ = 0;
        //타일 정의
        this.mkObject = [];
        this.dataQueue = [];
        this.loadWaitCnt = 0;
        this.pointSize = 0.01;
        //클릭속성정보를 처리함
        this.isClickable = false;
        this.pointCloudAPI = pointCloudAPI;
        this.threeJsLib = threeJsLib;
        this.layerName = layerName;
        threeJsLib.CreateLayer(this.layerName).objGrp.position.set(position.x, position.y, position.z);
        if (targetObj != undefined)
            this.targetObj = targetObj;
        else if (threeJsLib.camBenchmarkObj != undefined)
            this.targetObj = threeJsLib.camBenchmarkObj;
        this.viewDistance = viewDistance;
        this.maxLevel = maxLevel;
        this.pointSize = pointSize;
        this.isLocal = isLocal;
        this.locOriginPos = new THREE.Vector3(0, 0, 0);
    }
    dispose(delTime = 5000) {
        if (this.interval != undefined)
            clearInterval(this.interval);
        this.interval == undefined;
        this.dataQueue = [];
        setTimeout(() => {
            var _a;
            ((_a = this.threeJsLib.GetLayer(this.layerName)) === null || _a === void 0 ? void 0 : _a.objGrp).children.forEach((obj) => {
                this.threeJsLib.RemoveLayerInObject(obj);
            });
            this.threeJsLib.RemoveLayerFromName(this.layerName);
        }, delTime);
    }
    Init(pc_cd, pc_idx, loadBaseLevel = false, isClickable = false) {
        this.isClickable = isClickable; //클릭속성정보를 초기화함
        this.pc_cd = pc_cd;
        this.pc_idx = pc_idx;
        this.pointCloudAPI.PostRequest("PointCloudData/Info", { 'pc_cd': this.pc_cd, 'pc_idx': this.pc_idx }, (data) => {
            if (data.result == "SUCCESS") {
                //불러온 정보처리
                this.minX = data.data.minx;
                this.maxX = data.data.maxx;
                this.minY = data.data.miny;
                this.maxY = data.data.maxy;
                this.minZ = data.data.minz;
                this.maxZ = data.data.maxz;
                this.interX = data.data.interx;
                this.interY = data.data.intery;
                this.interZ = data.data.interz;
                this.splitLevel = data.data.lod;
                const state = data.data.state; //상태가 필요할 때 쓰기
                this.isLocal ? this.locOriginPos = new THREE.Vector3(this.minX, this.minY, this.minZ) : this.locOriginPos = new THREE.Vector3(0, 0, 0);
                //나눠진 갯수
                this.splitCntX = this.interX == 0 ? 1 : parseInt(((this.maxX - this.minX) / this.interX).toString()) + (parseFloat(((this.maxX - this.minX) / this.interX).toString()) % 1 == 0 ? 0 : 1);
                this.splitCntY = this.interY == 0 ? 1 : parseInt(((this.maxY - this.minY) / this.interY).toString()) + (parseFloat(((this.maxY - this.minY) / this.interY).toString()) % 1 == 0 ? 0 : 1);
                this.splitCntZ = this.interZ == 0 ? 1 : parseInt(((this.maxZ - this.minZ) / this.interZ).toString()) + (parseFloat(((this.maxZ - this.minZ) / this.interZ).toString()) % 1 == 0 ? 0 : 1);
                //랜더링 인터벌
                this.interval = setInterval(() => {
                    this.render();
                    const waitCnt = 100;
                    if (this.dataQueue.length > 0 && this.loadWaitCnt <= waitCnt) {
                        for (let i = this.loadWaitCnt; i <= waitCnt; i++) {
                            this.loadWaitCnt++;
                            this.RequestPointCloudData(this.dataQueue.shift());
                        }
                    }
                }, 10);
                //1레벨 모두 불러오기
                if (this.splitLevel > 1 && loadBaseLevel) {
                    for (let xpos = 0; xpos < this.splitCntX; xpos++) {
                        for (let ypos = 0; ypos < this.splitCntY; ypos++) {
                            for (let zpos = 0; zpos < this.splitCntZ; zpos++) {
                                const objectName = this.pc_cd + "_" + xpos + "_" + ypos + "_" + zpos + "_1";
                                this.threeJsLib.CreateObject(this.layerName, objectName);
                                let data = {
                                    'pc_cd': this.pc_cd,
                                    'pc_idx': this.pc_idx,
                                    'numx': xpos,
                                    'numy': ypos,
                                    'numz': zpos,
                                    'lod': 1
                                };
                                this.dataQueue.push(data);
                                //this.RequestPointCloudData(data);
                            }
                        }
                    }
                }
            }
        }, () => { }, () => { });
    }
    SetTargetObj(obj) {
        this.targetObj = obj;
    }
    RequestPointCloudData(reqData) {
        //API가 초기화 안됐는지 확인
        if (this.pointCloudAPI == undefined)
            return;
        //포인트클라우드 데이터 요청
        this.pointCloudAPI.PostRequest("PointCloudData", reqData, (data) => {
            if (data.result == "SUCCESS" && this.interval != undefined) {
                const pc_cd = data.pc_cd;
                const x = reqData.numx;
                const y = reqData.numy;
                const z = reqData.numz;
                const lod = reqData.lod;
                const objectName = pc_cd + "_" + x + "_" + y + "_" + z + "_" + lod;
                this.threeJsLib.ObjectControl.AddXYZRawData(this.layerName, pc_cd, this.pointSize, this.isClickable, data.data, this.locOriginPos);
                this.mkObject.push(objectName);
            }
        }, (err) => {
            //에러발생
        }, () => {
            this.loadWaitCnt--;
        });
    }
    render() {
        if (this.pc_cd == "" || this.targetObj == undefined)
            return;
        //타겟의 현재 격자 번호 위치
        const targetPosXNum = this.interX == 0 ? 0 : parseInt(((this.targetObj.position.x - (this.isLocal ? 0 : this.minX)) / this.interX).toString());
        const targetPosYNum = this.interY == 0 ? 0 : parseInt(((this.targetObj.position.y - (this.isLocal ? 0 : this.minY)) / this.interY).toString());
        const targetPosZNum = this.interZ == 0 ? 0 : parseInt(((this.targetObj.position.z - (this.isLocal ? 0 : this.minZ)) / this.interZ).toString());
        //새로운 위치로 이동을 하였다.
        if (this.curTargetPosX != targetPosXNum || this.curTargetPosY != targetPosYNum || this.curTargetPosZ != targetPosZNum) {
            //현재 위치를 저장
            this.curTargetPosX = targetPosXNum;
            this.curTargetPosY = targetPosYNum;
            this.curTargetPosZ = targetPosZNum;
            //최대레벨정의
            const chkMaxLevel = this.maxLevel > this.splitLevel ? this.splitLevel : this.maxLevel;
            //범위 조정
            const plusRangeValue = 5;
            const rangeMinX = targetPosXNum - chkMaxLevel - plusRangeValue < 0 ? 0 : targetPosXNum - chkMaxLevel - plusRangeValue;
            const rangeMinY = targetPosYNum - chkMaxLevel - plusRangeValue < 0 ? 0 : targetPosYNum - chkMaxLevel - plusRangeValue;
            const rangeMinZ = targetPosZNum - chkMaxLevel - plusRangeValue < 0 ? 0 : targetPosZNum - chkMaxLevel - plusRangeValue;
            const rangeMaxX = targetPosXNum + chkMaxLevel + plusRangeValue >= this.splitCntX ? this.splitCntX : targetPosXNum + chkMaxLevel + plusRangeValue;
            const rangeMaxY = targetPosYNum + chkMaxLevel + plusRangeValue >= this.splitCntY ? this.splitCntY : targetPosYNum + chkMaxLevel + plusRangeValue;
            const rangeMaxZ = targetPosZNum + chkMaxLevel + plusRangeValue >= this.splitCntY ? this.splitCntZ : targetPosZNum + chkMaxLevel + plusRangeValue;
            //확인하여 레이어 제거하기
            for (let xpos = rangeMinX; xpos < rangeMaxX; xpos++) {
                for (let ypos = rangeMinY; ypos < rangeMaxY; ypos++) {
                    for (let zpos = rangeMinZ; zpos < rangeMaxZ; zpos++) {
                        for (let slevel = 2; slevel <= chkMaxLevel; slevel++) //2레벨부터 지움
                         {
                            try {
                                const totalViewDistance = this.viewDistance * this.splitLevel;
                                const LevelViewDistance = totalViewDistance - slevel * this.viewDistance;
                                const objectName = this.pc_cd + "_" + xpos + "_" + ypos + "_" + zpos + "_" + slevel;
                                if (this.mkObject.includes(objectName) && (Math.abs(this.curTargetPosX - xpos) >= LevelViewDistance || Math.abs(this.curTargetPosY - ypos) >= LevelViewDistance || Math.abs(this.curTargetPosZ - zpos) >= LevelViewDistance)) {
                                    this.mkObject = this.mkObject.filter(item => item !== objectName);
                                    this.threeJsLib.RemoveLayerInObjectFromName(this.layerName, objectName);
                                }
                            }
                            catch (err) { }
                        }
                    }
                }
            }
            let stDis = 0;
            //최고레벨 위치부터 확인
            for (let chkLevel = chkMaxLevel; chkLevel > 0; chkLevel--) {
                //거리확인하기 거리만큼 체크레벨을 반복
                for (let distance = 1; distance <= this.viewDistance; distance++) {
                    //맨아랫줄부터 확인하기
                    for (let chkX = -stDis; chkX <= stDis; chkX++) {
                        for (let chkY = -stDis; chkY <= stDis; chkY++) {
                            for (let chkZ = -stDis; chkZ <= stDis; chkZ++) {
                                //위치값 구하기
                                let getDataPosX = this.interX == 0 ? 0 : (this.curTargetPosX - chkX < 0 ? 0 : this.curTargetPosX - chkX);
                                let getDataPosY = this.interY == 0 ? 0 : (this.curTargetPosY - chkY < 0 ? 0 : this.curTargetPosY - chkY);
                                let getDataPosZ = this.interZ == 0 ? 0 : (this.curTargetPosZ - chkZ < 0 ? 0 : this.curTargetPosZ - chkZ);
                                //처음과 끝을 확인하기
                                if (chkY == -stDis || chkY == stDis || chkZ == -stDis || chkZ == stDis) {
                                    try {
                                        let data = {
                                            'pc_cd': this.pc_cd,
                                            'pc_idx': this.pc_idx,
                                            'numx': getDataPosX,
                                            'numy': getDataPosY,
                                            'numz': getDataPosZ,
                                            'lod': chkLevel
                                        };
                                        this.dataQueue.push(data);
                                    }
                                    catch (err) { }
                                }
                            }
                        }
                    }
                    //시작거리는 늘리기
                    stDis++;
                }
            }
        }
    }
    SetPointSize(pointSize) {
        var _a;
        this.pointSize = pointSize;
        (_a = this.threeJsLib.GetLayer(this.layerName)) === null || _a === void 0 ? void 0 : _a.objGrp.children.forEach((object) => {
            const material = object.material;
            if (material != undefined)
                object.material = new THREE.PointsMaterial({ size: pointSize, vertexColors: material.vertexColors });
        });
    }
}
exports.PointcloudStreamRender = PointcloudStreamRender;
/**
 * 서버에 있는 포인트 클라우드를 저레벨부터 지정한 레벨까지 모두 렌더링 하는 모듈
 */
class PointcloudRender {
    /**
     * 서버에 있는 포인트 클라우드를 저레벨부터 지정한 레벨까지 모두 렌더링 하는 모듈
     * @param pointCloudAPI RestAPI 모듈 속성
     */
    constructor(pointCloudAPI, threeJsLib, layerName, position, maxLevel = 3, pointSize = 0.05, isLocal = false) {
        this.pc_cd = "";
        this.pc_idx = 0;
        this.maxX = 0;
        this.minX = 0;
        this.maxY = 0;
        this.minY = 0;
        this.maxZ = 0;
        this.minZ = 0;
        this.interX = 0;
        this.interY = 0;
        this.interZ = 0;
        this.splitLevel = 1;
        //위의 저보로 나뉜 격자의 갯수 확인
        this.splitCntX = 0;
        this.splitCntY = 0;
        this.splitCntZ = 0;
        //타일 정의
        //private tiles:boolean[][][][] = [];
        this.dataQueue = [];
        this.loadWaitCnt = 0;
        this.pointSize = 0.05;
        //클릭옵션 정보
        this.isClickable = false;
        this.pointCloudAPI = pointCloudAPI;
        this.threeJsLib = threeJsLib;
        this.layerName = layerName;
        this.maxLevel = maxLevel;
        this.pointSize = pointSize;
        this.isLocal = isLocal;
        this.locOriginPos = new THREE.Vector3(0, 0, 0);
    }
    dispose(finish, delTime = 5000) {
        if (this.interval != undefined)
            clearInterval(this.interval);
        this.dataQueue = [];
        this.interval == undefined;
        setTimeout(() => {
            var _a;
            ((_a = this.threeJsLib.GetLayer(this.layerName)) === null || _a === void 0 ? void 0 : _a.objGrp).children.forEach((obj) => {
                this.threeJsLib.RemoveLayerInObject(obj);
            });
            this.threeJsLib.RemoveLayerFromName(this.layerName);
            if (finish != undefined)
                finish();
        }, delTime);
    }
    Init(pc_cd, pc_idx, loadBaseLevel = false, isClickable = false, locColors) {
        this.isClickable = isClickable; //클릭옵션 초기화
        this.pc_cd = pc_cd;
        this.pc_idx = pc_idx;
        this.locColors = locColors;
        this.pointCloudAPI.PostRequest("PointCloudData/Info", { 'pc_cd': this.pc_cd, 'pc_idx': this.pc_idx }, (data) => {
            if (data.result == "SUCCESS") {
                //불러온 정보처리
                this.minX = data.data.minx;
                this.maxX = data.data.maxx;
                this.minY = data.data.miny;
                this.maxY = data.data.maxy;
                this.minZ = data.data.minz;
                this.maxZ = data.data.maxz;
                this.interX = data.data.interx;
                this.interY = data.data.intery;
                this.interZ = data.data.interz;
                this.splitLevel = data.data.lod;
                this.isLocal ? this.locOriginPos = new THREE.Vector3(this.minX, this.minY, this.minZ) : this.locOriginPos = new THREE.Vector3(0, 0, 0);
                //나눠진 갯수
                this.splitCntX = this.interX == 0 ? 1 : parseInt(((this.maxX - this.minX) / this.interX).toString()) + (parseFloat(((this.maxX - this.minX) / this.interX).toString()) % 1 == 0 ? 0 : 1);
                this.splitCntY = this.interY == 0 ? 1 : parseInt(((this.maxY - this.minY) / this.interY).toString()) + (parseFloat(((this.maxY - this.minY) / this.interY).toString()) % 1 == 0 ? 0 : 1);
                this.splitCntZ = this.interZ == 0 ? 1 : parseInt(((this.maxZ - this.minZ) / this.interZ).toString()) + (parseFloat(((this.maxZ - this.minZ) / this.interZ).toString()) % 1 == 0 ? 0 : 1);
                //랜더링 인터벌
                this.interval = setInterval(() => {
                    const waitCnt = 100;
                    if (this.dataQueue.length > 0 && this.loadWaitCnt <= waitCnt) {
                        for (let i = this.loadWaitCnt; i <= waitCnt; i++) {
                            this.loadWaitCnt++;
                            const data = this.dataQueue.shift();
                            this.RequestPointCloudData(data);
                        }
                    }
                }, 100);
                //Max레벨까지 모두 불러오기
                for (let level = 1; level <= this.maxLevel; level++) {
                    for (let xpos = 0; xpos < this.splitCntX; xpos++) {
                        for (let ypos = 0; ypos < this.splitCntY; ypos++) {
                            for (let zpos = 0; zpos < this.splitCntZ; zpos++) {
                                let data = {
                                    'pc_cd': this.pc_cd,
                                    'pc_idx': this.pc_idx,
                                    'numx': xpos,
                                    'numy': ypos,
                                    'numz': zpos,
                                    'lod': level
                                };
                                this.dataQueue.push(data);
                            }
                        }
                    }
                }
            }
        });
    }
    /**
     * 로딩을 일시 정지함
     */
    PauseLoading() {
        if (this.interval != undefined) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    }
    /**
     * 로딩을 다시 시작함
     */
    ResumeLoading() {
        if (this.interval == undefined) {
            this.interval = setInterval(() => {
                const waitCnt = 100;
                if (this.dataQueue.length > 0 && this.loadWaitCnt <= waitCnt) {
                    for (let i = this.loadWaitCnt; i <= waitCnt; i++) {
                        this.loadWaitCnt++;
                        const data = this.dataQueue.shift();
                        this.RequestPointCloudData(data);
                    }
                }
            }, 100);
        }
    }
    RequestPointCloudData(reqData) {
        //API가 초기화 안됐는지 확인
        if (this.pointCloudAPI == undefined)
            return;
        //포인트클라우드 데이터 요청
        this.pointCloudAPI.PostRequest("PointCloudData", reqData, (data) => {
            if (data.result == "SUCCESS" && this.interval != undefined) {
                const objName = data.filename;
                const x = reqData.numx;
                const y = reqData.numy;
                this.threeJsLib.ObjectControl.AddXYZRawData(this.layerName, objName, this.pointSize, this.isClickable, data.data, this.locOriginPos, this.locColors);
            }
        }, (err) => {
            //에러발생
        }, () => {
            this.loadWaitCnt--;
        });
    }
    SetPointSize(pointSize) {
        var _a;
        this.pointSize = pointSize;
        (_a = this.threeJsLib.GetLayer(this.layerName)) === null || _a === void 0 ? void 0 : _a.objGrp.children.forEach((object) => {
            const material = object.material;
            if (material != undefined)
                object.material = new THREE.PointsMaterial({ size: pointSize, vertexColors: material.vertexColors });
        });
    }
}
exports.PointcloudRender = PointcloudRender;
