import { create } from "zustand";

type AISelectionStore = {
    searchedText: string;
    setSearchedText: (text: string) => void;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useSelectionAI = create<AISelectionStore>((set, get) => ({
    searchedText: "",
    setSearchedText: (text) => set({ searchedText: text }),
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
