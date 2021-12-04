import { RK84Configuration } from "../../dist";
import { sendBatch, delay } from "../common";
import { createMatrix, lo, transpose } from "./matrix-common";

const config = new RK84Configuration()
let matrix = createMatrix(RK84Configuration.MATRIX_ROW, RK84Configuration.MATRIX_COLUMN)

const BREADTH = RK84Configuration.MATRIX_COLUMN / 1.3;
const AMP = 2.5;
const SHIFTUP = 0;

function easing(x: number): number {
    return x;
}

;(async () => {
    for(let i = 0;; i++) {
        const tr = transpose(matrix)

        const raw = AMP * Math.sin(((2 * Math.PI) / BREADTH) * i) + SHIFTUP + ((RK84Configuration.MATRIX_ROW - 1) / 2);
        const v = Math.round(raw)
        console.log(raw);

        const ncol = Array(RK84Configuration.MATRIX_ROW).fill([0, 0, 0])
        for (let j = 0; j < ncol.length; j++) {
            const gain = 1 - Math.min(Math.abs(raw - j), 1)
            ncol[j] = [255 * easing(gain), 0, 0]
        }
        tr.shift()
        tr.push(ncol)

        matrix = transpose(tr);

        lo(matrix)
        await sendBatch(config.fromMatrix(matrix))
        await delay(50)
    }
})()