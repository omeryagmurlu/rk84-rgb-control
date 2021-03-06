import { Persistency, RK84Configuration, Layout } from "../../";
import { sendBatch } from "../common";

export const white = () => {
    const config = new RK84Configuration(Persistency.Persistent)
    const layout = Layout();

    sendBatch(config.fromLayout(layout
        .all(255, 255, 255)
    ))
}

if (require.main === module) {
    white()
}