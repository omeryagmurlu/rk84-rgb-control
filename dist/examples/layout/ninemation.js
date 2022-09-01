"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const common_1 = require("../common");
const config = new __1.RK84Configuration();
const layout = (0, __1.Layout)();
;
(async () => {
    for (;;) {
        for (const k of [
            'q', 'w', 'e', 'd', 'c', 'x', 'z', 'a', 's', 'd',
            'e', 'w', 'q', 'a', 'z', 'x', 's', 'w', 'e', 'd',
            'c', 'x', 'z', 'a',
        ]) {
            await (0, common_1.sendBatch)(config.fromLayout(layout.set(k, 255, 255, 255)));
            await (0, common_1.delay)(10);
        }
    }
})();
