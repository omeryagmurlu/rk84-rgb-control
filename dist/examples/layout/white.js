"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const common_1 = require("../common");
const config = new __1.RK84Configuration(__1.Persistency.Persistent);
const layout = (0, __1.Layout)();
(0, common_1.sendBatch)(config.fromLayout(layout
    .all(255, 255, 255)));
