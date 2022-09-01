"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const common_1 = require("../common");
const matrix_common_1 = require("./matrix-common");
const chroma_js_1 = __importDefault(require("chroma-js"));
const WAVELENGTH = 24; // in key columns
const AMP = 2.5;
const SHIFTUP = 0;
const DOUBLE_HELIX = false;
// Color options, enable the one you want
// const color = (_: any) => chroma.rgb(255, 0, 0); // Single color (Red)
// const color = (_: any) => chroma.random().saturate(3); // Random Color
// or use a color scale
const COLOR_STEP = 100;
const scale = chroma_js_1.default.scale(['magenta', 'yellow', 'blue']).mode("hsl").domain([0, COLOR_STEP / 2]);
const color = (i) => scale(i % COLOR_STEP > COLOR_STEP / 2 ? COLOR_STEP - i % COLOR_STEP : i % COLOR_STEP);
// Fadeout options, choose one
const fade = (color, gain) => color.rgb().map(x => x * easing(gain)); // This is linear
// const fade = (color: Color, gain: number) => color.luminance(easing(gain)).rgb() // This has a nice whiteish spot inside
// easing function for the fadeout
function easing(x) {
    return Math.round(x * x * 10000) / 10000;
}
// Don't touch below
const config = new __1.RK84Configuration();
let matrix = (0, matrix_common_1.createMatrix)(__1.RK84Configuration.MATRIX_ROW, __1.RK84Configuration.MATRIX_COLUMN);
const KB_ORIGIN_ADJ = +((__1.RK84Configuration.MATRIX_ROW - 1) / 2);
(async () => {
    for (let i = 0;; i++) {
        const tr = (0, matrix_common_1.transpose)(matrix);
        const raw = AMP * Math.sin(((2 * Math.PI) / WAVELENGTH) * i) + SHIFTUP + KB_ORIGIN_ADJ;
        const col = color(i);
        const ncol = Array(__1.RK84Configuration.MATRIX_ROW).fill([0, 0, 0]);
        for (let j = 0; j < ncol.length; j++) {
            const gain = 1 - Math.min(Math.abs(raw - j), 1);
            ncol[j] = fade(col, gain);
        }
        // I don't want to write a virtual console, so line by line it is
        tr.shift();
        tr.push(ncol);
        matrix = (0, matrix_common_1.transpose)(tr);
        if (DOUBLE_HELIX)
            matrix.reverse();
        (0, matrix_common_1.lo)(matrix);
        await (0, common_1.sendBatch)(config.fromMatrix(matrix));
        await (0, common_1.delay)(10);
    }
})();
