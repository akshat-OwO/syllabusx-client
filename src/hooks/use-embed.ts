import { create } from "zustand";

type Embed = {
    embedId: string;
    name: string;
    embedLink: string;
};

type EmbedStore = Embed & {
    isOpen: boolean;
    onOpen: (value: Embed) => void;
    onClose: () => void;
};

export const useEmbed = create<EmbedStore>((set) => ({
    embedId: "",
    embedLink: "",
    name: "",
    isOpen: false,
    onOpen: (value) =>
        set({
            isOpen: true,
            embedId: value.embedId,
            embedLink: value.embedLink,
            name: value.name,
        }),
    onClose: () => set({ embedId: "", embedLink: "", name: "", isOpen: false }),
}));
