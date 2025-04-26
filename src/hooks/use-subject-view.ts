import { Courses } from "@/config";
import { create } from "zustand";

type SubjectViewStore = {
    course: Courses;
    isOpen: boolean;
    onOpen: (course: Courses) => void;
    onClose: () => void;
};

export const useSubjectView = create<SubjectViewStore>((set) => ({
    course: Courses.BTECH,
    isOpen: false,
    onOpen: (course) => set({ isOpen: true, course }),
    onClose: () => set({ isOpen: false }),
}));
