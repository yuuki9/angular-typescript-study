"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniMapManager = exports.MiniMapManager2 = void 0;
//ThreeJS
const THREE = require("three");
const Utils_1 = require("../Utils");
//ThrrjsLib
const ThreeJsLib_1 = require("../ThreeJsLib");
class RestAPI {
    constructor(http, serverIP = "39.115.113.230", serverPort = 4660) {
        this.http = http;
        this.serverIP = serverIP;
        this.serverPort = serverPort;
    }
    /**
     * 서버 정보 재설정
     * @param serverIP 서버아이피
     * @param serverPort 서버포트
     */
    Set(serverIP, serverPort) {
        this.serverIP = serverIP;
        this.serverPort = serverPort;
    }
    GetRequest(apiUrl = "", dataRes, errRes, finish) {
        this.http.get('http://' + this.serverIP + ":" + this.serverPort + "/" + apiUrl).subscribe((data) => {
            if (dataRes != undefined)
                dataRes(data);
        }, (err) => {
            if (errRes != undefined)
                errRes(err);
        }, () => {
            if (finish != undefined)
                finish();
        });
    }
    PostRequest(apiUrl = "", reqData, dataRes, errRes, finish) {
        this.http.post('http://' + this.serverIP + ":" + this.serverPort + "/" + apiUrl, reqData).subscribe((data) => {
            if (dataRes != undefined)
                dataRes(data);
        }, (err) => {
            if (errRes != undefined)
                errRes(err);
        }, () => {
            if (finish != undefined)
                finish();
        });
    }
    PostRequestOption(apiUrl = "", reqData, options, dataRes, errRes, finish) {
        this.http.post('http://' + this.serverIP + ":" + this.serverPort + "/" + apiUrl, reqData, options).subscribe((data) => {
            if (dataRes != undefined)
                dataRes(data);
        }, (err) => {
            if (errRes != undefined)
                errRes(err);
        }, () => {
            if (finish != undefined)
                finish();
        });
    }
}
class MiniMapManager2 {
    constructor(pointCloudAPI, threeJsLib, targetObj, mapPosition = new THREE.Vector3(0, 0, 0), targetImgPath = "/assets/resources/texture/POI/b1.png") {
        this.minPosX = 0;
        this.minPosY = 0;
        this.widthSize = 0;
        this.heightSize = 0;
        this.isSyncTarget = false;
        this.threeJsLib = threeJsLib;
        this.pointCloudAPI = pointCloudAPI;
        this.mapPosition = mapPosition;
        this.targetObj = targetObj;
        //미니맵 콘테이너 생성
        this.mapContainer = document.createElement('div');
        this.mapContainer.style.position = 'absolute';
        this.mapContainer.style.width = this.threeJsLib.container.style.width + "px";
        this.mapContainer.style.height = this.threeJsLib.container.style.height + "px";
        this.threeJsLib.container.appendChild(this.mapContainer);
        //미니맵을 초기화
        this.miniThreeJsLib = new ThreeJsLib_1.ThreeJSLib(this.mapContainer, new THREE.Vector3(0, 10, 0), 0.01, 100000, true);
        const tempEvent = this.miniThreeJsLib.AddPOIEvent.subscribe((event) => {
            tempEvent.unsubscribe();
            if (event.objectName == "TargetPOI")
                this.targetPoi = event.object;
        });
        this.miniThreeJsLib.GISControl.AddPOI("Target", "TargetPOI", true, targetImgPath, targetObj.position, 0.2, "", "", "", 0, 1000000);
        this.miniThreeJsLib.CameraControl.SetLockCamControl(true);
        //타겟오브젝트 위치 실시간 처리
        setInterval(() => {
            if (this.targetPoi != undefined) {
                this.targetPoi.position.set(targetObj.position.x, targetObj.position.y + 0.1, targetObj.position.z);
                if (this.isSyncTarget && this.targetObj != undefined) {
                    this.miniThreeJsLib.CameraControl.SetCamPosition(new THREE.Vector3(this.targetObj.position.x, 0, this.targetObj.position.z));
                }
            }
        }, 100);
    }
    MiniMapLoadAPI(pc_cd, pc_idx) {
        //기존의 미니맵이 있으면 미니맵 삭제진행
        if (this.miniThreeJsLib.IsExistLayer("MiniMap"))
            this.miniThreeJsLib.RemoveLayerFromName("MiniMap");
        //API가 초기화 안됐는지 확인
        if (this.pointCloudAPI == undefined)
            return;
        //새로운 미니맵 불러옴
        let reqData = { 'pc_cd': pc_cd, 'pc_idx': pc_idx };
        //포인트클라우드 데이터 요청
        this.pointCloudAPI.PostRequest("PointCloudData/MiniMap", reqData, (data) => {
            if (data.result == "SUCCESS") {
                this.minPosX = data.info.minx;
                const maxX = data.info.maxx;
                this.minPosY = data.info.miny;
                const maxY = data.info.maxy;
                const interX = data.info.interx;
                const interY = data.info.intery;
                this.widthSize = maxX - this.minPosX;
                this.heightSize = maxY - this.minPosY;
                this.SetSize();
                //미니맵 띄우기
                const blocks = this.BlocksMerge(data.data, interX / 10, interY / 10);
                blocks.forEach((size, point) => {
                    const x = parseInt(point.split("_")[0]);
                    const y = parseInt(point.split("_")[1]);
                    this.SetMiniMapBlock(this.minPosX, this.minPosY, x / 10, y / 10, size[0], size[1]);
                });
                // 아웃라인이 현재 잘 안잡히는 현상이 있음 
                // 알고리즘 개선 필요
                // const minX = data.info.minx;
                // const minY = data.info.miny;
                // this.SetMiniMapOutline(minX, minY, this.BlocksOutline(data.data));
                // 갯수가 많은것은 뻗음
                // const minX = data.info.minx;
                // const minY = data.info.miny;
                // const interX = data.info.interx;
                // const interY = data.info.intery;
                // for (let index = 0; index < data.data.length; index++) {
                //     const strPath = data.data[index];
                //     const paths: string[] = strPath.split('/');
                //     const intXsize = interX / 10.0;
                //     const intYsize = interY / 10.0;
                //     this.SetMiniMapBlock(minX, minY, parseInt(paths[paths.length - 2]) * intXsize, parseInt(paths[paths.length - 1]) * intYsize, intXsize, intYsize);
                // }
            }
        }, (err) => {
            //에러발생
        }, () => {
            //완료
        });
    }
    SetCenterPosition() {
        this.miniThreeJsLib.CameraControl.SetCamPosition(new THREE.Vector3(this.minPosX + (this.widthSize / 2), 0, -(this.minPosY + (this.heightSize / 2))));
    }
    SetSize() {
        if (this.widthSize > this.heightSize) {
            const rate = this.widthSize / (this.threeJsLib.container.scrollWidth / 2.5);
            const width = this.widthSize / rate < this.threeJsLib.container.scrollWidth / 5 ? this.threeJsLib.container.scrollWidth / 5 : this.widthSize / rate;
            const height = this.heightSize / rate < this.threeJsLib.container.scrollHeight / 5 ? this.threeJsLib.container.scrollHeight / 5 : this.heightSize / rate;
            //크기설정
            this.mapContainer.style.width = width + "px";
            this.mapContainer.style.height = height + "px";
            this.mapContainer.style.position = 'absolute';
            this.mapContainer.style.bottom = '0px';
            this.mapContainer.style.right = '0px';
            this.threeJsLib.container.appendChild(this.mapContainer);
            this.miniThreeJsLib.SetSceneSize(width, height);
        }
        else {
            const rate = this.heightSize / (this.threeJsLib.container.scrollHeight / 2.5);
            const width = this.widthSize / rate < this.threeJsLib.container.scrollWidth / 5 ? this.threeJsLib.container.scrollWidth / 5 : this.widthSize / rate;
            const height = this.heightSize / rate < this.threeJsLib.container.scrollHeight / 5 ? this.threeJsLib.container.scrollHeight / 5 : this.heightSize / rate;
            //크기설정
            this.mapContainer.style.width = width + "px";
            this.mapContainer.style.height = height + "px";
            this.mapContainer.style.position = 'absolute';
            this.mapContainer.style.bottom = '0px';
            this.mapContainer.style.right = '0px';
            this.threeJsLib.container.appendChild(this.mapContainer);
            this.miniThreeJsLib.SetSceneSize(width, height);
        }
    }
    BlocksOutline(strPaths) {
        let xBlockMinMax = new Map();
        let yBlockMinMax = new Map();
        let xPoints = new Array();
        let yPoints = new Array();
        for (let index = 0; index < strPaths.length; index++) {
            const strPath = strPaths[index];
            const paths = strPath.split('/');
            const x = parseInt(paths[paths.length - 2]);
            const y = parseInt(paths[paths.length - 1]);
            //구성된 x와 y의 정보들으 모두 저장
            if (!xPoints.includes(x))
                xPoints.push(x);
            if (!yPoints.includes(y))
                yPoints.push(y);
            //x블록검사
            if (!xBlockMinMax.has(x))
                xBlockMinMax.set(x, [y, y]);
            else {
                const minmax = xBlockMinMax.get(x);
                const chkNum = y;
                if (minmax[0] > chkNum)
                    minmax[0] = chkNum;
                if (minmax[1] < chkNum)
                    minmax[1] = chkNum;
            }
            //y블록검사
            if (!yBlockMinMax.has(y))
                yBlockMinMax.set(y, [x, x]);
            else {
                const minmax = yBlockMinMax.get(y);
                const chkNum = x;
                if (minmax[0] > chkNum)
                    minmax[0] = chkNum;
                if (minmax[1] < chkNum)
                    minmax[1] = chkNum;
            }
        }
        //x,y좌표 정렬
        xPoints.sort(function (a, b) { return a - b; });
        yPoints.sort(function (a, b) { return a - b; });
        //외곽선경로 처리하기
        let outLineBlock = new Array();
        //Y의 min처리 (정방향)
        for (let i = 0; i < yPoints.length; i++) {
            const minmax = yBlockMinMax.get(yPoints[i]);
            const point = new THREE.Vector2(minmax[0], i);
            // if(outLineBlock.includes(point)) outLineBlock = outLineBlock.filter(vec2 => vec2 != point);
            // outLineBlock.push(point);
            if (!outLineBlock.includes(point))
                outLineBlock.push(point);
        }
        // x의 max처리 (정방향)
        for (let i = 0; i < xPoints.length; i++) {
            const minmax = xBlockMinMax.get(xPoints[i]);
            const point = new THREE.Vector2(i, minmax[1]);
            // if(outLineBlock.includes(point)) outLineBlock = outLineBlock.filter(vec2 => vec2 != point);
            // outLineBlock.push(point);
            if (!outLineBlock.includes(point))
                outLineBlock.push(point);
        }
        // y의 max처리 (역방향)
        for (let i = yPoints.length - 1; i >= 0; i--) {
            const minmax = yBlockMinMax.get(yPoints[i]);
            const point = new THREE.Vector2(minmax[1], i);
            // if(outLineBlock.includes(point)) outLineBlock = outLineBlock.filter(vec2 => vec2 != point);
            // outLineBlock.push(point);
            if (!outLineBlock.includes(point))
                outLineBlock.push(point);
        }
        //x의 min처리 (역방향)
        for (let i = xPoints.length - 1; i >= 0; i--) {
            const minmax = xBlockMinMax.get(xPoints[i]);
            const point = new THREE.Vector2(i, minmax[0]);
            // if(outLineBlock.includes(point)) outLineBlock = outLineBlock.filter(vec2 => vec2 != point);
            // outLineBlock.push(point);
            if (!outLineBlock.includes(point))
                outLineBlock.push(point);
        }
        //결과물 리턴
        return outLineBlock;
    }
    BlocksMerge(strPaths, sizeX, sizeY) {
        //let allPoints = new Array<THREE.Vector2>(); //모든포인트 저장공간
        let blocks = new Map(); //블록들을 저장공간
        let minX = 99999999, minY = 99999999, maxX = -99999999, maxY = -99999999;
        for (let index = 0; index < strPaths.length; index++) {
            const strPath = strPaths[index];
            const paths = strPath.split('/');
            const x = parseInt(paths[paths.length - 2]);
            const y = parseInt(paths[paths.length - 1]);
            const point = new THREE.Vector2(x, y);
            //allPoints.push(point); //모든포인트 저장
            if (x < minX)
                minX = x;
            if (y < minY)
                minY = y;
            if (x > maxX)
                maxX = x;
            if (y > maxY)
                maxY = y;
            blocks.set(x + "_" + y, [sizeX, sizeY, 1]); //사이즈정보 저장
        }
        //머지 진행하기
        let mergeCntChk = 0;
        let tempMergeCnt = 0;
        while (tempMergeCnt != blocks.size) {
            //현재 블록개수를 확인
            tempMergeCnt = blocks.size;
            //병합처리
            for (let xcnt = minX; xcnt <= maxX; xcnt++) {
                for (let ycnt = minY; ycnt <= maxY; ycnt++) {
                    //기준점이 존재하는지 확인
                    const basicPoint = xcnt + "_" + ycnt;
                    if (blocks.has(basicPoint)) {
                        let size = blocks.get(basicPoint);
                        const width = size[0];
                        const height = size[1];
                        const MergeCnt = size[2];
                        const point2 = (xcnt + MergeCnt) + "_" + ycnt;
                        const point3 = xcnt + "_" + (ycnt + MergeCnt);
                        const point4 = (xcnt + MergeCnt) + "_" + (ycnt + MergeCnt);
                        if (blocks.has(point2) && blocks.has(point3) && blocks.has(point4)) {
                            if (MergeCnt == blocks.get(point2)[2] && MergeCnt == blocks.get(point3)[2] && MergeCnt == blocks.get(point4)[2]) {
                                //사이즈를 2배로 늘리고 저장하기
                                blocks.set(basicPoint, [width * 2, height * 2, MergeCnt * 2]);
                                //나머지 지점을 제거하기
                                blocks.delete(point2);
                                blocks.delete(point3);
                                blocks.delete(point4);
                            }
                        }
                    }
                }
            }
            console.log((mergeCntChk++) + "차 >> " + blocks.size);
        }
        return blocks;
    }
    /**
     * 지도 기능을 숨김
     * @param bool
     */
    SetVisible(bool) {
        this.mapContainer.hidden = !bool;
    }
    SetMiniMapBlock(originMinXPos, originMinYPos, xPos, yPos, xSize, ySize) {
        //왼쪽 아래부터 시계방향으로
        let box = [];
        box.push(new THREE.Vector3(originMinXPos + xPos - this.mapPosition.x, -1, -originMinYPos + -yPos + this.mapPosition.z));
        box.push(new THREE.Vector3(originMinXPos + xPos - this.mapPosition.x, -1, -originMinYPos - yPos + ySize + this.mapPosition.z));
        box.push(new THREE.Vector3(originMinXPos + xPos + xSize - this.mapPosition.x, -1, -originMinYPos - yPos + ySize + this.mapPosition.z));
        box.push(new THREE.Vector3(originMinXPos + xPos + xSize - this.mapPosition.x, -1, -originMinYPos - yPos + this.mapPosition.z));
        this.miniThreeJsLib.GISControl.AddPolygon("MiniMap", "block", false, box, new THREE.Color(1, 1, 1), 1, 1, 10000);
    }
    SetMiniMapOutline(originMinXPos, originMinYPos, linePoints) {
        let box = [];
        linePoints.forEach((point) => {
            box.push(new THREE.Vector3(originMinXPos + point.x / 10, -1, -originMinYPos + -point.y / 10));
        });
        this.miniThreeJsLib.GISControl.AddPolygon("MiniMap", "block", false, box, new THREE.Color(1, 1, 1), 1, 1, 10000);
    }
    MiniMapPositionSync(value = true) {
        if (this.miniThreeJsLib != undefined)
            this.isSyncTarget = value;
    }
}
exports.MiniMapManager2 = MiniMapManager2;
class MiniMapManager {
    constructor(mainDiv, mapThreeJsLib, pointCloudAPI) {
        this.mapPosition = new THREE.Vector3(0, 0, 0); //포인트클라우드 같은 배경의 조정이 있을 경우 해당 정보를 수정하여 이동 시킴
        //미니맵 크기정보
        this.minPosX = 0;
        this.minPosY = 0;
        this.mainDiv = mainDiv;
        this.mapThreeJsLib = mapThreeJsLib;
        this.pointCloudAPI = pointCloudAPI;
        this.mainDiv.appendChild(this.mapThreeJsLib.container);
    }
    MiniMapLoadAPI(pc_cd, pc_idx) {
        //기존의 미니맵이 있으면 미니맵 삭제진행
        if (this.mapThreeJsLib.IsExistLayer("MiniMap"))
            this.mapThreeJsLib.RemoveLayerFromName("MiniMap");
        //API가 초기화 안됐는지 확인
        if (this.pointCloudAPI == undefined)
            return;
        //새로운 미니맵 불러옴
        let reqData = { 'pc_cd': pc_cd, 'pc_idx': pc_idx };
        //포인트클라우드 데이터 요청
        this.pointCloudAPI.PostRequest("PointCloudData/MiniMap", reqData, (data) => {
            if (data.result == "SUCCESS") {
                this.minPosX = data.info.minx;
                const maxX = data.info.maxx;
                this.minPosY = data.info.miny;
                const maxY = data.info.maxy;
                const interX = data.info.interx;
                const interY = data.info.intery;
                const widthSize = maxX - this.minPosX;
                const heightSize = maxY - this.minPosY;
                const divSize = Utils_1.ThreeUtils.GetMiniMapSize(this.mainDiv, widthSize, heightSize);
                //미니맵 띄우기
                const blocks = this.BlocksMerge(data.data, interX / 10, interY / 10);
                blocks.forEach((size, point) => {
                    const x = parseInt(point.split("_")[0]);
                    const y = parseInt(point.split("_")[1]);
                    this.SetMiniMapBlock(this.minPosX, this.minPosY, x / 10, y / 10, size[0], size[1]);
                });
                //크기설정
                this.mapThreeJsLib.container.style.width = divSize.x + "px";
                this.mapThreeJsLib.container.style.height = divSize.y + "px";
                this.mapThreeJsLib.container.style.position = 'absolute';
                this.mapThreeJsLib.container.style.bottom = '0px';
                this.mapThreeJsLib.container.style.right = '0px';
                this.mapThreeJsLib.SetSceneSize(divSize.x, divSize.y);
            }
        }, (err) => {
            //에러발생
        }, () => {
            //완료
        });
    }
    BlocksMerge(strPaths, sizeX, sizeY) {
        //let allPoints = new Array<THREE.Vector2>(); //모든포인트 저장공간
        let blocks = new Map(); //블록들을 저장공간
        let minX = 99999999, minY = 99999999, maxX = -99999999, maxY = -99999999;
        for (let index = 0; index < strPaths.length; index++) {
            const strPath = strPaths[index];
            const paths = strPath.split('/');
            const x = parseInt(paths[paths.length - 2]);
            const y = parseInt(paths[paths.length - 1]);
            const point = new THREE.Vector2(x, y);
            //allPoints.push(point); //모든포인트 저장
            if (x < minX)
                minX = x;
            if (y < minY)
                minY = y;
            if (x > maxX)
                maxX = x;
            if (y > maxY)
                maxY = y;
            blocks.set(x + "_" + y, [sizeX, sizeY, 1]); //사이즈정보 저장
        }
        //머지 진행하기
        let mergeCntChk = 0;
        let tempMergeCnt = 0;
        while (tempMergeCnt != blocks.size) {
            //현재 블록개수를 확인
            tempMergeCnt = blocks.size;
            //병합처리
            for (let xcnt = minX; xcnt <= maxX; xcnt++) {
                for (let ycnt = minY; ycnt <= maxY; ycnt++) {
                    //기준점이 존재하는지 확인
                    const basicPoint = xcnt + "_" + ycnt;
                    if (blocks.has(basicPoint)) {
                        let size = blocks.get(basicPoint);
                        const width = size[0];
                        const height = size[1];
                        const MergeCnt = size[2];
                        const point2 = (xcnt + MergeCnt) + "_" + ycnt;
                        const point3 = xcnt + "_" + (ycnt + MergeCnt);
                        const point4 = (xcnt + MergeCnt) + "_" + (ycnt + MergeCnt);
                        if (blocks.has(point2) && blocks.has(point3) && blocks.has(point4)) {
                            if (MergeCnt == blocks.get(point2)[2] && MergeCnt == blocks.get(point3)[2] && MergeCnt == blocks.get(point4)[2]) {
                                //사이즈를 2배로 늘리고 저장하기
                                blocks.set(basicPoint, [width * 2, height * 2, MergeCnt * 2]);
                                //나머지 지점을 제거하기
                                blocks.delete(point2);
                                blocks.delete(point3);
                                blocks.delete(point4);
                            }
                        }
                    }
                }
            }
            console.log((mergeCntChk++) + "차 >> " + blocks.size);
        }
        return blocks;
    }
    SetMiniMapBlock(originMinXPos, originMinYPos, xPos, yPos, xSize, ySize) {
        //왼쪽 아래부터 시계방향으로
        let box = [];
        box.push(new THREE.Vector3(originMinXPos + xPos + this.mapPosition.x, originMinYPos + yPos + this.mapPosition.y, -1));
        box.push(new THREE.Vector3(originMinXPos + xPos + this.mapPosition.x, originMinYPos + yPos + ySize + this.mapPosition.y, -1));
        box.push(new THREE.Vector3(originMinXPos + xPos + xSize + this.mapPosition.x, originMinYPos + yPos + ySize + this.mapPosition.y, -1));
        box.push(new THREE.Vector3(originMinXPos + xPos + xSize + this.mapPosition.x, originMinYPos + yPos + this.mapPosition.y, -1));
        this.mapThreeJsLib.GISControl.AddPolygon("MiniMap", "block", false, box, new THREE.Color(1, 1, 1), 1, 1, 10000);
    }
}
exports.MiniMapManager = MiniMapManager;
