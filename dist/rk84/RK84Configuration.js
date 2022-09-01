"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RK84Configuration = exports.Persistency = void 0;
const lodash_chunk_1 = __importDefault(require("lodash.chunk"));
const fill = (arr, len, val) => [...arr, ...Array(len - arr.length).fill(val)];
const transpose = (m) => m[0].map((x, i) => m.map(x => x[i]));
var Persistency;
(function (Persistency) {
    Persistency[Persistency["Persistent"] = 0] = "Persistent";
    Persistency[Persistency["Transient"] = 1] = "Transient";
})(Persistency = exports.Persistency || (exports.Persistency = {}));
class RK84Configuration {
    constructor(persistency = Persistency.Transient) {
        this.persistMod = () => {
            switch (this.persistency) {
                case Persistency.Persistent: return [RK84Configuration.PERSISTENT, 0, 1];
                case Persistency.Transient: return [RK84Configuration.TRANSIENT, 0];
            }
        };
        this.from = (mapped) => {
            const list = fill([
                ...this.persistMod(), ...mapped.map(x => Math.round(x))
            ], RK84Configuration.CONFIG_PACKCNT * RK84Configuration.CONFIG_PACKLEN, 0);
            return (0, lodash_chunk_1.default)(list, RK84Configuration.CONFIG_PACKLEN);
        };
        this.fromLayout = (layout) => this.from(RK84Configuration.MAPPING.map(key => layout.get(key)).flat());
        this.fromMatrix = (matrix) => {
            if (matrix.length !== RK84Configuration.MATRIX_ROW)
                throw new Error("wrong matrix row dimension");
            const tr = transpose(matrix);
            if (tr.length !== RK84Configuration.MATRIX_COLUMN)
                throw new Error("wrong matrix column dimension");
            return this.from(tr.flat().flat());
        };
        this.persistency = persistency;
    }
}
exports.RK84Configuration = RK84Configuration;
RK84Configuration.PERSISTENT = 3;
RK84Configuration.TRANSIENT = 6;
RK84Configuration.CONFIG_PACKLEN = 65 - 3;
RK84Configuration.CONFIG_PACKCNT = 7;
RK84Configuration.MAPPING = [
    'escape', '`', 'tab', 'capslock', 'leftshift', 'leftcontrol',
    'f1', '1', 'q', 'a', 'z', 'meta',
    'f2', '2', 'w', 's', 'x', 'leftalt',
    'f3', '3', 'e', 'd', 'c', null,
    'f4', '4', 'r', 'f', 'v', null,
    'f5', '5', 't', 'g', 'b', 'space',
    'f6', '6', 'y', 'h', 'n', null,
    'f7', '7', 'u', 'j', 'm', null,
    'f8', '8', 'i', 'k', ',', 'rightalt',
    'f9', '9', 'o', 'l', '.', 'fn',
    'f10', '0', 'p', ';', '/', 'rightcontrol',
    'f11', '-', '[', '\'', 'rightshift', null,
    'f12', '=', ']', null, null, null,
    'printscreen', 'backspace', 'backslash', 'enter', null, 'left',
    'pause', null, null, null, 'up', 'down',
    'delete', 'home', 'end', 'pageup', 'pagedown', 'right',
];
RK84Configuration.MATRIX_ROW = 6; // we use the transpose of above
RK84Configuration.MATRIX_COLUMN = 16;
