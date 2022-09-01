"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const __2 = require("../../..");
const common_1 = require("../common");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const config = new __1.RK84Configuration();
const layout = (0, __2.Layout)(); // Layout is immutable
const a = () => readline.question(`key?\n`, (k) => {
    (0, common_1.sendBatch)(config.fromLayout(layout.set(k, 255, 255, 255)));
    a();
});
a();
