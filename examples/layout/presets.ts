import { Persistency, RK84Configuration, Layout } from "../../";
import { sendBatch } from "../common";

const config = new RK84Configuration(Persistency.Persistent)
const layout = Layout();

sendBatch(config.fromLayout(layout
    .all(0, 255, 255)
    .alpha(255,255,255)
    .alphanumeric_symbols(255,255,255)
    .numbersRow(255,255,0)
    .chrome(255,0,100)
    .arrow_keys(255, 100, 255)
    .batch(['w', 'a', 's', 'd'], 255, 0, 0)
))
