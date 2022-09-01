"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const off = () => ([0, 0, 0]);
const _layout = () => ({
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
});
const ALL = Object.keys(_layout());
const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const NUMBERS_ROW = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
const ALPHA = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
];
const ALPHANUMERIC = [...NUMBERS, ...ALPHA];
const ALPHANUMERIC_SYMBOLS = [...ALPHANUMERIC,
    '-', '=',
    '[', ']',
    ';', '\'',
    ',', '.', '/'
];
const CHROME = ['`', 'tab', 'capslock', 'leftshift', 'leftcontrol', 'meta', 'leftalt', 'rightalt', 'fn', 'rightcontrol', 'rightshift', 'enter', 'backslash', 'backspace'];
const ARROW_KEYS = ['up', 'left', 'right', 'down'];
const CORE = [...ALPHANUMERIC_SYMBOLS, ...CHROME];
const Layout = () => _Layout();
exports.Layout = Layout;
const _Layout = ({ layout: lout = _layout(), } = {}) => {
    let self;
    const layout = lout;
    const _update = (fn) => {
        const n = (0, lodash_clonedeep_1.default)(layout);
        fn(n);
        return _Layout({ layout: n });
    };
    const _applyTo = (keys) => (red, green, blue) => _update(n => {
        for (const key of keys) {
            _set(n, key, red, green, blue);
        }
    });
    const set = (key, red, green, blue) => _update(n => {
        _set(n, key, red, green, blue);
    });
    const _set = (n, key, red, green, blue) => {
        if (!ALL.includes(key))
            throw new Error("unknown key in layout");
        n[key] = [red, green, blue];
    };
    const batch = (keys, red, green, blue) => _applyTo(keys)(red, green, blue);
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
        get: (key) => {
            if (!key)
                return off();
            return layout[key];
        }
    };
};
