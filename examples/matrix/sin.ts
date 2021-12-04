import { RK84Configuration } from "../../dist";
import { sendBatch, delay } from "../common";
import { createMatrix, lo, transpose } from "./matrix-common";
import chroma, { Color } from 'chroma-js'

// const wavelength = 24; // in key columns
// const AMP = 2.5;
// const SHIFTUP = 0;
// const DOUBLE_HELIX = false;

// Color options, enable the one you want
// const colorDef = (_: any) => chroma.rgb(255, 0, 0); // Single color (Red)
// const colorDef = (_: any) => chroma.random().saturate(3); // Random Color

// or use a color scale
const COLOR_STEP = 100
const scale = chroma.scale(['magenta','yellow','blue']).mode("hsl").domain([0,COLOR_STEP / 2]);
const colorDef = (i: number) => scale(i%COLOR_STEP > COLOR_STEP / 2 ? COLOR_STEP - i%COLOR_STEP : i%COLOR_STEP)

// Fadeout options, choose one
const fadeDef = (color: Color, gain: number) => color.rgb().map(x => x * easing(gain)) // This is linear
// const fadeDef = (color: Color, gain: number) => color.luminance(easing(gain)).rgb() // This has a nice whiteish spot inside

// easing function for the fadeout
function easing(x: number): number {
    return Math.round(x*x *10000)/10000;
}

// Don't touch below

export const sin = async ({
    fade = fadeDef,
    color = colorDef,
    doubleHelix = false,
    wavelength = 24,
    amp = 2.5,
    shiftup = 0
}: {
    fade?: (color: Color, gain: number) => number[],
    color?: (i: number) => chroma.Color,
    doubleHelix?: boolean,
    wavelength?: number,
    amp?: number,
    shiftup?: number
} = {}) => {
    const config = new RK84Configuration()
    let matrix = createMatrix(RK84Configuration.MATRIX_ROW, RK84Configuration.MATRIX_COLUMN)
    const KB_ORIGIN_ADJ = + ((RK84Configuration.MATRIX_ROW - 1) / 2)

    for(let i = 0;; i++) {
        const tr = transpose(matrix)

        const raw = amp * Math.sin(((2 * Math.PI) / wavelength) * i) + shiftup + KB_ORIGIN_ADJ;

        const col = color(i)
        const ncol = Array(RK84Configuration.MATRIX_ROW).fill([0, 0, 0])
        for (let j = 0; j < ncol.length; j++) {
            const gain = 1 - Math.min(Math.abs(raw - j), 1)

            ncol[j] = fade(col, gain)
        }
        // I don't want to write a virtual console, so line by line it is
        tr.shift()
        tr.push(ncol)

        matrix = transpose(tr);
        if (doubleHelix) matrix.reverse()

        lo(matrix)
        await sendBatch(config.fromMatrix(matrix))
        await delay(10)
    }
}

if (require.main === module) {
    sin()
}