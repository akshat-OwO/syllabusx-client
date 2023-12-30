import { atom, useAtom } from "jotai";

type Embed = {
    embedLink: string;
    name: string;
    isOpen: boolean;
};

const embedAtom = atom<Embed>({ name: "", embedLink: "", isOpen: false });

export function useEmbed() {
    return useAtom(embedAtom);
}
