import { createStore, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import type { Theme } from "@/lib/themes";

type Config = {
    theme: Theme["name"];
    radius: number;
};

const configAtom = atomWithStorage<Config>("config", {
    theme: "neutral",
    radius: 0.5,
});

const store = createStore();

export function useConfig() {
    return useAtom(configAtom, { store });
}
