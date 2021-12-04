import { RK84Configuration } from "../../dist";
import { sendBatch, delay } from "../common";
import { createMatrix, transpose } from "./matrix-common";

const config = new RK84Configuration()
const matrix = createMatrix(RK84Configuration.MATRIX_ROW, RK84Configuration.MATRIX_COLUMN)

;(async () => {
    for(;;) {
        for (let turn = 0; turn < RK84Configuration.MATRIX_COLUMN; turn++) {
            const tr = transpose(matrix) // this gives a NEW matrix, not inplace, it is important for the animation
            tr[turn] = Array(RK84Configuration.MATRIX_ROW).fill([255, 0, 0])

            const step = transpose(tr);

            // lo(step)
            await sendBatch(config.fromMatrix(step))
            await delay(100)
        }
    }
})()