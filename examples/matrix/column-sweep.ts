import { RGB, RK84Configuration } from "../../dist";
import { sendBatch, delay } from "../common";
import { createMatrix, lo, transpose } from "./matrix-common";


export const columnSweep = async (fade = 0.9) => {
    const config = new RK84Configuration()
    let matrix = createMatrix(RK84Configuration.MATRIX_ROW, RK84Configuration.MATRIX_COLUMN)

    for(;;) {
        for (let turn = 0; turn < RK84Configuration.MATRIX_COLUMN; turn++) {
            const tr = transpose(matrix)

            for (let i = 0; i < RK84Configuration.MATRIX_COLUMN; i++) {
                for (let j = 0; j < tr[i].length; j++) {
                    tr[i][j] = tr[i][j].map(x => x < 10 ? 0 : x * fade) as RGB;
                }                
            }
            tr[turn] = Array(RK84Configuration.MATRIX_ROW).fill([255, 0, 0])

            matrix = transpose(tr);
            lo(matrix)
            await sendBatch(config.fromMatrix(matrix))
            await delay(10)
        }
    }
}

if (require.main === module) {
    columnSweep(0.9);
}