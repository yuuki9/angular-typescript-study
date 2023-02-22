"use strict";
//---------------------------------------------------------------------
//-----------------------  구조형 클래스 정의  --------------------------
//---------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointCloudConvertManager = exports.XYZ_RGBA_L = exports.XYZ_RGBA = exports.XYZ = void 0;
class XYZ {
    constructor(xPos, yPos, zPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
    }
}
exports.XYZ = XYZ;
class XYZ_RGBA extends XYZ {
    constructor(xPos, yPos, zPos, redColor, greenColor, blueColor, alpha) {
        super(xPos, yPos, zPos);
        if (redColor != undefined)
            this.redColor = redColor;
        if (greenColor != undefined)
            this.greenColor = greenColor;
        if (blueColor != undefined)
            this.blueColor = blueColor;
        if (alpha != undefined)
            this.alpha = alpha;
    }
}
exports.XYZ_RGBA = XYZ_RGBA;
class XYZ_RGBA_L extends XYZ_RGBA {
    constructor(xPos, yPos, zPos, redColor, greenColor, blueColor, alpha, lod) {
        super(xPos, yPos, zPos, redColor, greenColor, blueColor, alpha);
        if (lod != undefined)
            this.lod = lod;
    }
}
exports.XYZ_RGBA_L = XYZ_RGBA_L;
//---------------------------------------------------------------------
//-----------------------  함수형 클래스 정의  --------------------------
//---------------------------------------------------------------------
class PointCloudConvertManager {
    constructor() { }
    //라인 한줄에 대한 정보를 기준으로 데이터를 정의함
    static BinToXYZ(buf, isLE = true) {
        const returnValue = new XYZ_RGBA_L(0, 0, 0);
        if (isLE) {
            returnValue.xPos = parseFloat(Buffer.from([buf[0], buf[1], buf[2], buf[3], buf[4], buf[5], buf[6], buf[7]]).readDoubleLE(0).toFixed(12)); //posX
            returnValue.yPos = parseFloat(Buffer.from([buf[8], buf[9], buf[10], buf[11], buf[12], buf[13], buf[14], buf[15]]).readDoubleLE(0).toFixed(12)); //posY
            returnValue.zPos = parseFloat(Buffer.from([buf[16], buf[17], buf[18], buf[19], buf[20], buf[21], buf[22], buf[23]]).readDoubleLE(0).toFixed(12)); //posZ
        }
        else {
            returnValue.xPos = parseFloat(Buffer.from([buf[0], buf[1], buf[2], buf[3], buf[4], buf[5], buf[6], buf[7]]).readDoubleBE(0).toFixed(12)); //posX
            returnValue.yPos = parseFloat(Buffer.from([buf[8], buf[9], buf[10], buf[11], buf[12], buf[13], buf[14], buf[15]]).readDoubleBE(0).toFixed(12)); //posY
            returnValue.zPos = parseFloat(Buffer.from([buf[16], buf[17], buf[18], buf[19], buf[20], buf[21], buf[22], buf[23]]).readDoubleBE(0).toFixed(12)); //posZ
        }
        returnValue.redColor = Buffer.from([buf[24]]).readUInt8(0); //R ( 255 )
        returnValue.greenColor = Buffer.from([buf[25]]).readUInt8(0); //G ( 255 )
        returnValue.blueColor = Buffer.from([buf[26]]).readUInt8(0); //B ( 255 )
        returnValue.alpha = Buffer.from([buf[27]]).readUInt8(0); //A ( 255 )
        returnValue.lod = Buffer.from([buf[28]]).readUInt8(0); //LOD ( 1~20 )
        return returnValue;
    }
    //라인 한줄에 대한 정보를 기준으로 데이터를 정의함
    static XYZToBin(data, isLE = true) {
        const buffer = Buffer.alloc(29);
        if (isLE) {
            buffer.writeDoubleLE(data.xPos, 0);
            buffer.writeDoubleLE(data.yPos, 8);
            buffer.writeDoubleLE(data.zPos, 16);
        }
        else {
            buffer.writeDoubleBE(data.xPos, 0);
            buffer.writeDoubleBE(data.yPos, 8);
            buffer.writeDoubleBE(data.zPos, 16);
        }
        if (data.redColor != undefined)
            buffer.writeUInt8(data.redColor, 24);
        else
            buffer.writeUInt8(0, 24);
        if (data.greenColor != undefined)
            buffer.writeUInt8(data.greenColor, 25);
        else
            buffer.writeUInt8(0, 25);
        if (data.blueColor != undefined)
            buffer.writeUInt8(data.blueColor, 26);
        else
            buffer.writeUInt8(0, 26);
        if (data.alpha != undefined)
            buffer.writeUInt8(data.alpha, 27);
        else
            buffer.writeUInt8(255, 27);
        if (data.lod != undefined)
            buffer.writeUInt8(data.lod, 28);
        else
            buffer.writeUInt8(0, 28);
        return buffer;
    }
}
exports.PointCloudConvertManager = PointCloudConvertManager;
