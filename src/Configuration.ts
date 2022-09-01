import { ILayout } from "./Layout"
import { RGB } from "./types";

export interface Configuration {
    fromLayout(layout: ILayout): number[][]
    fromMatrix(matrix: RGB[][]): number[][]
}