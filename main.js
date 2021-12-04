const HID = require('node-hid')
const { RK84Configuration } = require('./dist/Configuration')
const { Layout, ImmutableLayout } = require('./dist/Layout')

const PACKET_LEN = 65

const FIRST_BYTE = 0x0a

const infs = HID.devices().filter(d =>
    d.vendorId === 0x258a && d.productId === 0x0059
    && d.interface === 1
    && d.usage === 0x01 // usagePage doesn't match up with report descriptions but second one somehiow works?
);
// console.log(infs)
const pth = infs[2].path;

const dev = new HID.HID(pth);

// dev.on("data", function(data) {
//     console.log('555')
// });

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}
const sendBatch = async (packets) => {
    console.log('asadsasdas')
    for (let i = 0; i < packets.length; i++) {
        const written = dev.sendFeatureReport([FIRST_BYTE, packets.length, i + 1, ...packets[i]])
        if (written !== PACKET_LEN) throw new Error("write was interrupted")
        // dev.getFeatureReport(10, PACKET_LEN) // there's no buffer, just ignore?
        await delay(1)
    }
}


const config = new RK84Configuration()

// sendBatch(config.fromLayout(ImmutableLayout().all(255, 255, 255)))


const layout = ImmutableLayout(
    (n) => {
        for (const key in n) {
            if (Object.hasOwnProperty.call(n, key)) {
                n[key] = n[key].map(x => Math.max(0, x - 50))
            }
        }
    },
    (l) => {
        buf.push(() => sendBatch(config.fromLayout(l)))
    }
);

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// const a = () => readline.question(`key?\n`, k => {
//     sendBatch(config.fromLayout(layout.set(k, 255, 255, 255)))
//     a();
// })

// a();

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

// ;(async () => {
//     for (;;) {
//         for (k of [
//             'q', 'w', 'e', 'd', 'c', 'x', 'z', 'a', 's', 'd',
//             'e', 'w', 'q', 'a', 'z', 'x', 's', 'w', 'e', 'd',
//             'c', 'x', 'z', 'a',
//         ]) {
//             console.log('sasd')
//             await sendBatch(config.fromLayout(layout.set(k, 255, 255, 255)))
//             await delay(10)
//         }
//     }
// })()