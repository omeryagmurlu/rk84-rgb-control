import { RK84Configuration } from "../../dist";
import { Layout } from "../../dist";
import { sendBatch } from "../common";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const config = new RK84Configuration()
const layout = Layout(); // Layout is immutable

const a = () => readline.question(`key?\n`, (k: string) => {
    sendBatch(config.fromLayout(layout.set(k, 255, 255, 255)))
    a();
})

a();