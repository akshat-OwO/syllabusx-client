import { create } from "zustand";
import { persist } from "zustand/middleware";

type AiStore = {
    toggle: boolean;
    key: string;
    setKey: (key: string) => void;
    setToggle: (toggle: boolean) => void;
    setClear: () => void;
};

export const useAi = create<AiStore>()(
    persist(
        (set, get) => ({
            toggle: false,
            key: "",
            setKey: (key) => set({ key }),
            setToggle: (toggle) => set({ toggle }),
            setClear: () => set({ key: "", toggle: false }),
        }),
        {
            name: "ai",
            partialize: (state) => ({
                key: state.key,
                toggle: state.toggle,
            }),
        }
    )
);
