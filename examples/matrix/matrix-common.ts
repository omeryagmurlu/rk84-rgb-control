import { RGB } from "../.."
import chalk from 'chalk'

export const createMatrix = (r: number, c: number): RGB[][] => Array(r).fill(Array(c).fill([0, 0, 0]))
export const transpose = <T>(m: T[][]) => m[0].map((x,i) => m.map(x => x[i]))
export const lo = (x: RGB[][]) => {
    console.clear()
    console.log(x.map(row => row.map(x => chalk.rgb(x[0], x[1], x[2])('▄')).join(" ")).join('\n'), '\n')
}