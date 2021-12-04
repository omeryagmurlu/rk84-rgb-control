import cloneDeep from 'lodash.clonedeep'
import { Channel, RGB } from './types'

const off = (): RGB => ([0, 0, 0])
const _layout = (): Record<string, RGB> => ({
    'escape': off(),
    'f1': off(),
    'f2': off(),
    'f3': off(),
    'f4': off(),
    'f5': off(),
    'f6': off(),
    'f7': off(),
    'f8': off(),
    'f9': off(),
    'f10': off(),
    'f11': off(),
    'f12': off(),
    'printscreen': off(),
    'pause': off(),
    'delete': off(),
    '`': off(),
    '1': off(),
    '2': off(),
    '3': off(),
    '4': off(),
    '5': off(),
    '6': off(),
    '7': off(),
    '8': off(),
    '9': off(),
    '0': off(),
    '-': off(),
    '=': off(),
    'backspace': off(),
    'home': off(),
    'tab': off(),
    'q': off(),
    'w': off(),
    'e': off(),
    'r': off(),
    't': off(),
    'y': off(),
    'u': off(),
    'i': off(),
    'o': off(),
    'p': off(),
    '[': off(),
    ']': off(),
    'backslash': off(),
    'end': off(),
    'capslock': off(),
    'a': off(),
    's': off(),
    'd': off(),
    'f': off(),
    'g': off(),
    'h': off(),
    'j': off(),
    'k': off(),
    'l': off(),
    ';': off(),
    '\'': off(),
    'enter': off(),
    'pageup': off(),
    'leftshift': off(),
    'z': off(),
    'x': off(),
    'c': off(),
    'v': off(),
    'b': off(),
    'n': off(),
    'm': off(),
    ',': off(),
    '.': off(),
    '/': off(),
    'rightshift': off(),
    'up': off(),
    'pagedown': off(),
    'leftcontrol': off(),
    'meta': off(),
    'leftalt': off(),
    'space': off(),
    'rightalt': off(),
    'fn': off(),
    'rightcontrol': off(),
    'left': off(),
    'down': off(),
    'right': off(),
})

const ALL = Object.keys(_layout())
const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const NUMBERS_ROW = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=']
const ALPHA = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 
    'z', 'x', 'c', 'v', 'b', 'n', 'm' 
]
const ALPHANUMERIC = [...NUMBERS, ...ALPHA]
const ALPHANUMERIC_SYMBOLS = [...ALPHANUMERIC,
    '-', '=',
    '[', ']',
    ';', '\'',
    ',', '.', '/'
]
const CHROME = ['`', 'tab', 'capslock', 'leftshift', 'leftcontrol', 'meta', 'leftalt', 'rightalt', 'fn', 'rightcontrol', 'rightshift', 'enter', 'backslash', 'backspace']
const ARROW_KEYS = ['up', 'left', 'right', 'down']
const CORE = [...ALPHANUMERIC_SYMBOLS, ... CHROME]

export interface ILayout {
    numbers: (red: Channel, green: Channel, blue: Channel) => ILayout;
    all: (red: Channel, green: Channel, blue: Channel) => ILayout;
    numbersRow: (red: Channel, green: Channel, blue: Channel) => ILayout;
    alpha: (red: Channel, green: Channel, blue: Channel) => ILayout;
    alphanumeric: (red: Channel, green: Channel, blue: Channel) => ILayout;
    alphanumeric_symbols: (red: Channel, green: Channel, blue: Channel) => ILayout;
    chrome: (red: Channel, green: Channel, blue: Channel) => ILayout;
    arrow_keys: (red: Channel, green: Channel, blue: Channel) => ILayout;
    core: (red: Channel, green: Channel, blue: Channel) => ILayout;
    batch: (keys: string[], red: Channel, green: Channel, blue: Channel) => ILayout;
    set: (key: string, red: Channel, green: Channel, blue: Channel) => ILayout;
    get: (key: string | null) => RGB;
}

type LayoutProcessor = (n: Record<string, RGB>) => void

export const Layout = () => _Layout();
const _Layout = ({
    layout: lout = _layout(),
}: {
    layout?: Record<string, RGB>;
} = {}): ILayout => {
    let self: ILayout;
    const layout = lout

    const _update = (fn: LayoutProcessor) => {
        const n = cloneDeep(layout)
        fn(n)
        return _Layout({ layout: n })
    }

    const _applyTo = (keys: string[]) => (red: Channel, green: Channel, blue: Channel) => _update(n => {
        for (const key of keys) {
            _set(n, key, red, green, blue)
        }
    })
    const set = (key: string, red: Channel, green: Channel, blue: Channel) =>  _update(n => {
        _set(n, key, red, green, blue)
    })
    
    const _set = (n: Record<string, RGB>, key: string, red: Channel, green: Channel, blue: Channel) => {
        if (!ALL.includes(key)) throw new Error("unknown key in layout")
        n[key] = [red, green, blue]
    }
    
    const batch = (keys: string[], red: Channel, green: Channel, blue: Channel) => _applyTo(keys)(red, green, blue);

    return self = {
        all: _applyTo(ALL),
        numbers: _applyTo(NUMBERS),
        numbersRow: _applyTo(NUMBERS_ROW),
        alpha: _applyTo(ALPHA),
        alphanumeric: _applyTo(ALPHANUMERIC),
        alphanumeric_symbols: _applyTo(ALPHANUMERIC_SYMBOLS),
        chrome: _applyTo(CHROME),
        arrow_keys: _applyTo(ARROW_KEYS),
        core: _applyTo(CORE),

        batch,
        set,
        get: (key: string | null) => {
            if (!key) return off()
            return layout[key]
        }
    }
}