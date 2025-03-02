import { create } from "zustand";

type SearchStates = {
    isOpen: boolean;
};

type SearchActions = {
    onOpen: () => void;
    onClose: () => void;
};

type SearchStore = SearchStates & SearchActions;

export const useSearch = create<SearchStore>()((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
