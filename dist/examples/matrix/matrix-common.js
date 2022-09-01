"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lo = exports.transpose = exports.createMatrix = void 0;
const chalk_1 = __importDefault(require("chalk"));
const createMatrix = (r, c) => Array(r).fill(Array(c).fill([0, 0, 0]));
exports.createMatrix = createMatrix;
const transpose = (m) => m[0].map((x, i) => m.map(x => x[i]));
exports.transpose = transpose;
const lo = (x) => {
    console.clear();
    console.log(x.map(row => row.map(x => chalk_1.default.rgb(x[0], x[1], x[2])('▄')).join(" ")).join('\n'), '\n');
};
exports.lo = lo;
