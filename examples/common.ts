import HID from 'node-hid';

const PACKET_LEN = 65
const FIRST_BYTE = 0x0a

const infs = HID.devices().filter(d =>
    d.vendorId === 0x258a && d.productId === 0x0059
    && d.interface === 1
    && d.usage === 0x01 // usagePage doesn't match up with report descriptions but second one somehow works? You may need to modify this part a bit
);
// console.log(infs)
const pth = infs[2].path as string;

export const dev = new HID.HID(pth);

export function delay(ms: number) {
    return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
}
export const sendBatch = async (packets: number[][]) => {
    for (let i = 0; i < packets.length; i++) {
        const written = dev.sendFeatureReport([FIRST_BYTE, packets.length, i + 1, ...packets[i]])
        if (written !== PACKET_LEN) throw new Error("write was interrupted")
        // dev.getFeatureReport(10, PACKET_LEN) // there's no buffer, just ignore?
        await delay(1)
    }
}