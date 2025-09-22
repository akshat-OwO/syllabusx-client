import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DateEntry = {
    name: string;
    date: number;
};

type DatesheetStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    isFirstInter: boolean;
    setIsFirstInter: () => void;
    dates: DateEntry[];
    addDate: (date: { name: string; date: number }) => void;
    editDate: (index: number, newDate: { name: string; date: number }) => void;
    removeDate: (index: number) => void;
    importDatesheet: (dates: Array<{ name: string; date: number }>) => void;
};

export const useDatesheet = create<DatesheetStore>()(
    persist(
        (set) => ({
            isOpen: false,
            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false }),
            isFirstInter: true,
            setIsFirstInter: () => set({ isFirstInter: false }),
            dates: [],
            addDate: (date) => {
                set((state) => {
                    const newDates = [...state.dates, date];
                    newDates.sort((a, b) => a.date - b.date);
                    return { dates: newDates };
                });
            },
            editDate: (index, newDate) => {
                set((state) => {
                    const newDates = [...state.dates];
                    newDates[index] = newDate;
                    newDates.sort((a, b) => a.date - b.date);
                    return { dates: newDates };
                });
            },
            removeDate: (index) => {
                set((state) => {
                    const newDates = [...state.dates];
                    newDates.splice(index, 1);
                    return { dates: newDates };
                });
            },
            importDatesheet: (newDates) => {
                set(() => ({
                    dates: [...newDates].sort((a, b) => a.date - b.date),
                }));
            },
        }),
        {
            name: "datesheet",
            partialize: (state) => ({
                dates: state.dates,
                isFirstInter: state.isFirstInter,
            }),
        }
    )
);
