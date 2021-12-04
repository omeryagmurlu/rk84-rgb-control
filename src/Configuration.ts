import { ILayout } from "./Layout"
import chunk from "lodash.chunk";

const fill = <T>(arr: T[], len: number, val: T) => [...arr, ...Array(len - arr.length).fill(val)]

enum Persistency {
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

    fromLayout = (layout: ILayout) => {
        const list = [...this.persistMod(), ...RK84Configuration.MAPPING.map(key => layout.get(key)).flat()]
        
        return chunk(fill(list, RK84Configuration.CONFIG_PACKCNT * RK84Configuration.CONFIG_PACKLEN, 0), RK84Configuration.CONFIG_PACKLEN)
    }
} 