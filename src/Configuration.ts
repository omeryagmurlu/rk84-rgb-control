import { ILayout } from "./Layout"
import chunk from "lodash.chunk";
import { RGB } from "./types";

const fill = <T>(arr: T[], len: number, val: T) => [...arr, ...Array(len - arr.length).fill(val)]
const transpose = <T>(m: T[][]) => m[0].map((x,i) => m.map(x => x[i]))

export enum Persistency {
    Persistent, Transient
}

interface Configuration {
    fromLayout(layout: ILayout): number[][]
}


export class RK84Configuration implements Configuration {
    static readonly PERSISTENT = 3;
    static readonly TRANSIENT = 6;
    
    static readonly CONFIG_PACKLEN = 65 - 3
    static readonly CONFIG_PACKCNT = 7
    static readonly MAPPING = [ // first triplet is escape, then ` etc.
        'escape',              '`',                         'tab',               'capslock',            'leftshift',                'leftcontrol', 
        'f1',                  '1',                         'q',                 'a',                   'z',                        'meta', 
        'f2',                  '2',                         'w',                 's',                   'x',                        'leftalt', 
        'f3',                  '3',                         'e',                 'd',                   'c',                        null, 
        'f4',                  '4',                         'r',                 'f',                   'v',                        null, 
        'f5',                  '5',                         't',                 'g',                   'b',                        'space', 
        'f6',                  '6',                         'y',                 'h',                   'n',                        null, 
        'f7',                  '7',                         'u',                 'j',                   'm',                        null, 
        'f8',                  '8',                         'i',                 'k',                   ',',                        'rightalt', 
        'f9',                  '9',                         'o',                 'l',                   '.',                        'fn', 
        'f10',                 '0',                         'p',                 ';',                   '/',                        'rightcontrol', 
        'f11',                 '-',                         '[',                 '\'',                  'rightshift',               null, 
        'f12',                 '=',                         ']',                 null,                  null,                       null, 
        'printscreen',         'backspace',                 'backslash',         'enter',               null,                       'left', 
        'pause',               null,                        null,                null,                  'up',                       'down', 
        'delete',              'home',                      'end',               'pageup',              'pagedown',                 'right', 
    ]
    static readonly MATRIX_ROW = 6 // we use the transpose of above
    static readonly MATRIX_COLUMN = 16

    private persistency: Persistency

    constructor(persistency = Persistency.Transient) {
        this.persistency = persistency
    }

    private persistMod = () => {
        switch (this.persistency) {
            case Persistency.Persistent: return [RK84Configuration.PERSISTENT, 0, 1];
            case Persistency.Transient: return [RK84Configuration.TRANSIENT, 0];
        }
    }

    private from = (mapped: number[]) => {
        const list = fill([
            ...this.persistMod(), ...mapped.map(x => Math.round(x))
        ], RK84Configuration.CONFIG_PACKCNT * RK84Configuration.CONFIG_PACKLEN, 0)

        return chunk(list, RK84Configuration.CONFIG_PACKLEN)
    }

    fromLayout = (layout: ILayout) => this.from(RK84Configuration.MAPPING.map(key => layout.get(key)).flat())

    fromMatrix = (matrix: RGB[][]) => {
        if (matrix.length !== RK84Configuration.MATRIX_ROW) throw new Error("wrong matrix row dimension")
        const tr = transpose(matrix);
        if (tr.length !== RK84Configuration.MATRIX_COLUMN) throw new Error("wrong matrix column dimension")

        return this.from(tr.flat().flat())
    }
} 