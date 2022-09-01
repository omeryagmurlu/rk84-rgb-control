"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const common_1 = require("../common");
const matrix_common_1 = require("./matrix-common");
const config = new __1.RK84Configuration();
let matrix = (0, matrix_common_1.createMatrix)(__1.RK84Configuration.MATRIX_ROW, __1.RK84Configuration.MATRIX_COLUMN);
const FADE = 0.9;
const run = async () => {
    for (;;) {
        for (let turn = 0; turn < __1.RK84Configuration.MATRIX_COLUMN; turn++) {
            const tr = (0, matrix_common_1.transpose)(matrix);
            for (let i = 0; i < __1.RK84Configuration.MATRIX_COLUMN; i++) {
                for (let j = 0; j < tr[i].length; j++) {
                    tr[i][j] = tr[i][j].map(x => x < 10 ? 0 : x * FADE);
                }
            }
            tr[turn] = Array(__1.RK84Configuration.MATRIX_ROW).fill([255, 0, 0]);
            matrix = (0, matrix_common_1.transpose)(tr);
            (0, matrix_common_1.lo)(matrix);
            await (0, common_1.sendBatch)(config.fromMatrix(matrix));
            await (0, common_1.delay)(10);
        }
    }
};
if (require.main === module) {
    run();
}
else {
    console.log('required as a module');
}
