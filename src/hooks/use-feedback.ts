import { create } from "zustand";

type FeedbackStore = {
    isOpen: boolean;
    query: string;
    setQuery: (query: string) => void;
    onOpen: () => void;
    onClose: () => void;
};

export const useFeedback = create<FeedbackStore>((set, get) => ({
    isOpen: false,
    query: "",
    setQuery: (query) => set({ query }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
