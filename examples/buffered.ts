import { RK84Configuration } from "..";
import { Layout } from "..";

const config = new RK84Configuration()
const layout = Layout();

const buf = []
setInterval(async () => {
    const elem = buf.shift()
    await elem()
}, 500)

layout
// .all(0, 255, 0)
.set('f', 255, 255, 255)
.set('g', 255, 255, 255)
.set('h', 255, 255, 255)
.set('j', 255, 255, 255)
.set('k', 255, 255, 255)
.numbers(255, 150, 0)
.set('o', 255, 255, 255)
.set('m', 255, 255, 255)
.set('e', 255, 255, 255)
.set('r', 255, 255, 255)
.chrome(255, 0, 0)
.set('b', 255, 255, 255)
.set('e', 255, 255, 255)
.set('s', 255, 255, 255)
.set('t', 255, 255, 255)