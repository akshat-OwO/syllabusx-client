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
    setToggle: (toggle: boolean) => void;
    setKey: (key: string) => void;
    setClear: () => void;
    completion: Completion;
};

export const useAi = create<AiStore>()(
    persist(
        (set, get) => ({
            toggle: false,
            key: "",
            setToggle: (toggle) => set({ toggle }),
            setKey: (key) => set({ key }),
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
