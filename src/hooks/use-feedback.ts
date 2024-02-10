import { create } from "zustand";

type FeedbackStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useFeedback = create<FeedbackStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
