import { create } from "zustand";

type SubjectListStore = {
    isOpen: boolean;
    onOpen: (value: string[]) => void;
    onClose: () => void;
    subjectList: string[];
};

export const useSubjectList = create<SubjectListStore>((set, get) => ({
    isOpen: false,
    onOpen: (value) => set({ isOpen: true, subjectList: value }),
    onClose: () => set({ isOpen: false, subjectList: [] }),
    subjectList: [],
}));
