export declare enum TransfromControlSetMode {
    'space_local' = 0,
    'space_world' = 1,
    'translate' = 2,
    'rotate' = 3,
    'scale' = 4,
    'show_x' = 5,
    'show_y' = 6,
    'show_z' = 7,
    'enabled' = 8
}
export interface LocationColor {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    r: number;
    g: number;
    b: number;
    section_nm?: string;
}
