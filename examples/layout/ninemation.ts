import { Layout, RK84Configuration } from "../../dist";
import { delay, sendBatch } from "../common";

export const ninemation = async () => {
    const config = new RK84Configuration()
    const layout = Layout();
    for (;;) {
        for (const k of [
            'q', 'w', 'e', 'd', 'c', 'x', 'z', 'a', 's', 'd',
            'e', 'w', 'q', 'a', 'z', 'x', 's', 'w', 'e', 'd',
            'c', 'x', 'z', 'a',
        ]) {
            await sendBatch(config.fromLayout(layout.set(k, 255, 255, 255)))
            await delay(10)
        }
    }
}

if (require.main === module) {
    ninemation()
}