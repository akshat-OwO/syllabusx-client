import _ from "lodash";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Completion = {
    prompt: string;
    setPrompt: (prompt: string) => void;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

type AiStore = {
    toggle: boolean;
    key: string;
    isConfiguring: boolean;
    setToggle: (toggle: boolean) => void;
    setKey: (key: string) => void;
    onConfiguring: () => void;
    offConfiguring: () => void;
    setClear: () => void;
    completion: Completion;
};

export const useAi = create<AiStore>()(
    persist(
        (set, get) => ({
            toggle: false,
            key: "",
            isConfiguring: false,
            setToggle: (toggle) => set({ toggle }),
            setKey: (key) => set({ key }),
            onConfiguring: () => set({ isConfiguring: true }),
            offConfiguring: () => set({ isConfiguring: false }),
            setClear: () => set({ key: "", toggle: false }),
            completion: {
                prompt: "",
                setPrompt: (prompt) => {
                    let prevCompletion = _.omit(get().completion, "prompt");
                    return set({ completion: { prompt, ...prevCompletion } });
                },
                isOpen: false,
                onOpen: () => {
                    let prevCompletion = _.omit(get().completion, "isOpen");
                    return set({
                        completion: { isOpen: true, ...prevCompletion },
                    });
                },
                onClose: () => {
                    let prevCompletion = _.omit(get().completion, "isOpen");
                    return set({
                        completion: { isOpen: false, ...prevCompletion },
                    });
                },
            },
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
