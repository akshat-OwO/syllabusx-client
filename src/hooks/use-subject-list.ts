import { create } from "zustand";
import { persist } from "zustand/middleware";

type SubjectListStore = {
    isOpen: boolean;
    onOpen: (value: string[]) => void;
    onClose: () => void;
    subjectList: string[];
};

export const useSubjectList = create<SubjectListStore>((set) => ({
    isOpen: false,
    onOpen: (value) => set({ isOpen: true, subjectList: value }),
    onClose: () => set({ isOpen: false, subjectList: [] }),
    subjectList: [],
}));

type ActiveSubjectList = {
    semester: string;
    branch: string;
    subjects: string[];
};

type ActiveSubjectsState = {
    activeSubjects: ActiveSubjectList[];
    toggleSubject: (semester: string, branch: string, subject: string) => void;
};

export const useActiveSubjectsStore = create<ActiveSubjectsState>()(
    persist(
        (set, get) => ({
            activeSubjects: [],
            toggleSubject: (semester, branch, subject) => {
                const activeSubjects = [...get().activeSubjects];
                const existingSubjectIndex = activeSubjects.findIndex(
                    (active) =>
                        active.branch === branch && active.semester === semester
                );

                if (existingSubjectIndex !== -1) {
                    const existingSubject =
                        activeSubjects[existingSubjectIndex];
                    const updatedSubjects = existingSubject.subjects.includes(
                        subject
                    )
                        ? existingSubject.subjects.filter((s) => s !== subject)
                        : [...existingSubject.subjects, subject];
                    const updatedActiveSubjects = [
                        ...activeSubjects.slice(0, existingSubjectIndex),
                        { ...existingSubject, subjects: updatedSubjects },
                        ...activeSubjects.slice(existingSubjectIndex + 1),
                    ];
                    set({ activeSubjects: updatedActiveSubjects });
                } else {
                    const newActiveSubject = {
                        semester,
                        branch,
                        subjects: [subject],
                    };
                    const updatedActiveSubjects = [
                        ...activeSubjects,
                        newActiveSubject,
                    ];
                    set({ activeSubjects: updatedActiveSubjects });
                }
            },
        }),
        {
            name: "active-subjects",
            partialize: (state) => ({
                activeSubjects: state.activeSubjects,
            }),
        }
    )
);
