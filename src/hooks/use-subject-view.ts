import { create } from "zustand";

type SubjectViewStore = {
    course: string;
    isOpen: boolean;
    onOpen: (course: string) => void;
    onClose: () => void;
};

export const useSubjectView = create<SubjectViewStore>((set, get) => ({
    course: "",
    isOpen: false,
    onOpen: (course) => set({ isOpen: true, course }),
    onClose: () => set({ isOpen: false }),
}));
