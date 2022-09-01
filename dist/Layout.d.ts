import { Channel, RGB } from './types';
export interface ILayout {
    numbers: (red: Channel, green: Channel, blue: Channel) => ILayout;
    all: (red: Channel, green: Channel, blue: Channel) => ILayout;
    numbersRow: (red: Channel, green: Channel, blue: Channel) => ILayout;
    alpha: (red: Channel, green: Channel, blue: Channel) => ILayout;
    alphanumeric: (red: Channel, green: Channel, blue: Channel) => ILayout;
    alphanumeric_symbols: (red: Channel, green: Channel, blue: Channel) => ILayout;
    chrome: (red: Channel, green: Channel, blue: Channel) => ILayout;
    arrow_keys: (red: Channel, green: Channel, blue: Channel) => ILayout;
    core: (red: Channel, green: Channel, blue: Channel) => ILayout;
    batch: (keys: string[], red: Channel, green: Channel, blue: Channel) => ILayout;
    set: (key: string, red: Channel, green: Channel, blue: Channel) => ILayout;
    get: (key: string | null) => RGB;
}
export declare const Layout: () => ILayout;
