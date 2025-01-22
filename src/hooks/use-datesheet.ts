import { create } from "zustand";
import { persist } from "zustand/middleware";

type DatesheetStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    isFirstInter: boolean;
    setIsFirstInter: () => void;
    dates: {
        name: string;
        date: number;
    }[];
    addDate: (date: { name: string; date: number }) => void;
    editDate: (
        date: { name: string; date: number },
        newDate: { name: string; date: number }
    ) => void;
    removeDate: (date: { name: string; date: number }) => void;
    importDatesheet: (dates: Array<{ name: string; date: number }>) => void;
};

export const useDatesheet = create<DatesheetStore>()(
    persist(
        (set, get) => ({
            isOpen: false,
            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false }),
            isFirstInter: true,
            setIsFirstInter: () => set({ isFirstInter: false }),
            dates: [],
            addDate: (date) => {
                set((state) => {
                    const newDates = [...state.dates];
                    const hasDate = newDates.some(
                        (d) => d.name === date.name && d.date === date.date
                    );
                    if (!hasDate) {
                        newDates.push(date);
                        newDates.sort((a, b) => a.date - b.date);
                    }
                    return { dates: newDates };
                });
            },
            editDate: (date, newDate) => {
                set((state) => {
                    const newDates = state.dates.map((d) =>
                        d.name === date.name && d.date === date.date
                            ? newDate
                            : d
                    );
                    newDates.sort((a, b) => a.date - b.date);
                    return { dates: newDates };
                });
            },
            removeDate: (date) => {
                set((state) => ({
                    dates: state.dates
                        .filter(
                            (d) =>
                                !(d.name === date.name && d.date === date.date)
                        )
                        .sort((a, b) => a.date - b.date),
                }));
            },
            importDatesheet: (newDates) => {
                set((state) => ({
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
