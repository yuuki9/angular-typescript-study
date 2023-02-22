/// <reference types="node" />
export declare class XYZ {
    xPos: number;
    yPos: number;
    zPos: number;
    constructor(xPos: number, yPos: number, zPos: number);
}
export declare class XYZ_RGBA extends XYZ {
    redColor?: number;
    greenColor?: number;
    blueColor?: number;
    alpha?: number;
    constructor(xPos: number, yPos: number, zPos: number, redColor?: number, greenColor?: number, blueColor?: number, alpha?: number);
}
export declare class XYZ_RGBA_L extends XYZ_RGBA {
    lod?: number;
    constructor(xPos: number, yPos: number, zPos: number, redColor?: number, greenColor?: number, blueColor?: number, alpha?: number, lod?: number);
}
export declare class PointCloudConvertManager {
    constructor();
    static BinToXYZ(buf: Buffer, isLE?: boolean): XYZ_RGBA_L;
    static XYZToBin(data: XYZ_RGBA_L, isLE?: boolean): Buffer;
}
