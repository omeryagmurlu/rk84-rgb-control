import { RGB } from "../types";
import { Configuration } from "../Configuration";
import { ILayout } from "../Layout";
export declare enum Persistency {
    Persistent = 0,
    Transient = 1
}
export declare class RK84Configuration implements Configuration {
    static readonly PERSISTENT = 3;
    static readonly TRANSIENT = 6;
    static readonly CONFIG_PACKLEN: number;
    static readonly CONFIG_PACKCNT = 7;
    static readonly MAPPING: (string | null)[];
    static readonly MATRIX_ROW = 6;
    static readonly MATRIX_COLUMN = 16;
    private persistency;
    constructor(persistency?: Persistency);
    private persistMod;
    private from;
    fromLayout: (layout: ILayout) => any[][];
    fromMatrix: (matrix: RGB[][]) => any[][];
}
