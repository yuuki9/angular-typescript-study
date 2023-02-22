"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeUtils = void 0;
//ThreeJS
const THREE = require("three");
const three_1 = require("three");
class ThreeUtils {
    constructor() { }
    static GetFirstParents(obj) {
        var _a;
        //부모가 없으면 바로 반환
        if (obj.parent == null || ((_a = obj.parent) === null || _a === void 0 ? void 0 : _a.name) == "")
            return obj;
        else
            return this.GetFirstParents(obj.parent);
    }
    static GetMiniMapSize(mainDiv, mapWidthSize, maphHightSize) {
        const rate = mapWidthSize > maphHightSize ? mapWidthSize / (mainDiv.scrollWidth / 2.5) : maphHightSize / (mainDiv.scrollHeight / 2.5);
        const width = mapWidthSize / rate < mainDiv.scrollWidth / 5 ? mainDiv.scrollWidth / 5 : mapWidthSize / rate;
        const height = maphHightSize / rate < mainDiv.scrollHeight / 5 ? mainDiv.scrollHeight / 5 : maphHightSize / rate;
        return new THREE.Vector2(width, height);
    }
    static GetDegDisToPos(orginPos, distance, hDegree, vDegree) {
        let hRad = three_1.MathUtils.degToRad(-90 - hDegree);
        let vRad = three_1.MathUtils.degToRad(-90 - vDegree);
        const newix = orginPos.x + distance * Math.sin(vRad) * Math.cos(hRad);
        const newiy = orginPos.y + distance * Math.sin(vRad) * Math.sin(hRad);
        const newiz = orginPos.z + distance * Math.cos(vRad);
        return new THREE.Vector3(newix, newiy, newiz);
    }
    /** 두점과 거리를 알 때 수직으로 일정 거리 떨어진 기준 좌표를 구하는 공식 */
    static GetUpDownLineNewPos(pos1, pos2, distance) {
        const lineInclination = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x); //두점의 기울기 좌표 
        const UpLineInclination = THREE.MathUtils.degToRad(THREE.MathUtils.radToDeg(lineInclination) + 90); //위쪽으로 수직
        const DownLineInclination = THREE.MathUtils.degToRad(THREE.MathUtils.radToDeg(lineInclination) - 90);
        //수직선의 윗쪽 라인의 평행선 만들기
        let UpLineStartPos = new THREE.Vector3();
        UpLineStartPos.x = pos1.x + (distance * Math.cos(UpLineInclination));
        UpLineStartPos.y = pos1.y + (distance * Math.sin(UpLineInclination));
        let UpLineEndPos = new THREE.Vector3();
        UpLineEndPos.x = pos2.x + (distance * Math.cos(UpLineInclination));
        UpLineEndPos.y = pos2.y + (distance * Math.sin(UpLineInclination));
        //수직선의 아래쪽 라인의 평행선 만들기
        let DownLineStartPos = new THREE.Vector3();
        DownLineStartPos.x = pos1.x + (distance * Math.cos(DownLineInclination));
        DownLineStartPos.y = pos1.y + (distance * Math.sin(DownLineInclination));
        let DownLineEndPos = new THREE.Vector3();
        DownLineEndPos.x = pos2.x + (distance * Math.cos(DownLineInclination));
        DownLineEndPos.y = pos2.y + (distance * Math.sin(DownLineInclination));
        //정보를 리턴함
        return [UpLineStartPos, UpLineEndPos, DownLineStartPos, DownLineEndPos];
    }
    static GetIntersectionPoint(pos1St, pos1Ed, pos2St, pos2Ed) {
        const intersect = (pos1St.x - pos1Ed.x) * (pos2St.y - pos2Ed.y) - (pos1St.y - pos1Ed.y) * (pos2St.x - pos2Ed.x);
        if (intersect == 0)
            return undefined;
        const pre = (pos1St.x * pos1Ed.y - pos1St.y * pos1Ed.x);
        const post = (pos2St.x * pos2Ed.y - pos2St.y * pos2Ed.x);
        const crossPosX = (pre * (pos2St.x - pos2Ed.x) - (pos1St.x - pos1Ed.x) * post) / intersect;
        const crossPosY = (pre * (pos2St.y - pos2Ed.y) - (pos1St.y - pos1Ed.y) * post) / intersect;
        return new THREE.Vector3(crossPosX, crossPosY, 0);
    }
}
exports.ThreeUtils = ThreeUtils;
