import { TaiModels } from "@/lib/schemas";
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

type MockStore = {
    topics: string[][];
    setTopics: (topics: string[][]) => void;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

type AiStore = {
    toggle: boolean;
    key: string;
    model: TaiModels;
    isOpen: boolean;
    setToggle: (toggle: boolean) => void;
    setKey: (key: string) => void;
    setModel: (model: TaiModels) => void;
    onOpen: () => void;
    onClose: () => void;
    setClear: () => void;
    completion: Completion;
    mock: MockStore;
};

type AiSummarizer = {
    isOpen: boolean;
    topic: string;
    currentTab: string;
    toggled: boolean;
    setToggled: (toggled: boolean) => void;
    setTopic: (input: string) => void;
    setTab: (input: string) => void;
    onOpen: () => void;
    onClose: () => void;
};

export const useAi = create<AiStore>()(
    persist(
        (set, get) => ({
            toggle: false,
            key: "",
            model: "gemini-2.5-flash-preview-04-17",
            isOpen: false,
            setToggle: (toggle) => set({ toggle }),
            setKey: (key) => set({ key }),
            setModel: (model) => set({ model }),
            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false }),
            setClear: () => set({ key: "", toggle: false }),
            completion: {
                prompt: "",
                setPrompt: (prompt) => {
                    const prevCompletion = _.omit(get().completion, "prompt");
                    return set({ completion: { prompt, ...prevCompletion } });
                },
                isOpen: false,
                onOpen: () => {
                    const prevCompletion = _.omit(get().completion, "isOpen");
                    return set({
                        completion: { isOpen: true, ...prevCompletion },
                    });
                },
                onClose: () => {
                    const prevCompletion = _.omit(get().completion, "isOpen");
                    return set({
                        completion: { isOpen: false, ...prevCompletion },
                    });
                },
            },
            mock: {
                isOpen: false,
                topics: [],
                setTopics: (topics) => {
                    const prevMock = _.omit(get().mock, "topics");
                    return set({ mock: { topics, ...prevMock } });
                },
                onOpen: () => {
                    const prevMock = _.omit(get().mock, "isOpen");
                    return set({
                        mock: { isOpen: true, ...prevMock },
                    });
                },
                onClose: () => {
                    const prevMock = _.omit(get().mock, "isOpen");
                    return set({ mock: { isOpen: false, ...prevMock } });
                },
            },
        }),
        {
            name: "ai",
            partialize: (state) => ({
                key: state.key,
                toggle: state.toggle,
                model: state.model,
            }),
        }
    )
);

export const useAiSummarizer = create<AiSummarizer>()(
    persist(
        (set) => ({
            topic: "",
            currentTab: "",
            isOpen: false,
            toggled: false,
            setToggled: (toggled) => set({ toggled }),
            setTopic: (input: string) => set({ topic: input }),
            setTab: (input: string) => set({ currentTab: input }),
            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false }),
        }),
        {
            name: "aiSummarizer",
            partialize: (state) => ({
                toggled: state.toggled,
            }),
        }
    )
);
