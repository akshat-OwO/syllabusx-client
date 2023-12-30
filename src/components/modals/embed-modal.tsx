"use client";

import { useEmbed } from "@/hooks/use-embed";
import { useMediaQuery } from "@mantine/hooks";
import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

interface EmbedModalProps {}

const EmbedModal: FC<EmbedModalProps> = ({}) => {
    const [embed, setEmbed] = useEmbed();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const closeEmbed = (change: boolean) => {
        setEmbed({ embedLink: "", name: "", isOpen: change });
    };

    if (isDesktop) {
        return (
            <Dialog
                open={embed.isOpen}
                onOpenChange={() => closeEmbed(!embed.isOpen)}
            >
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>{embed.name}</DialogTitle>
                    </DialogHeader>
                    <Viewer />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={embed.isOpen} onOpenChange={closeEmbed}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{embed.name}</DrawerTitle>
                </DrawerHeader>
                <Viewer />
            </DrawerContent>
        </Drawer>
    );
};

function Viewer() {
    const [embed] = useEmbed();

    return (
        <div className="rounded-md bg-accent p-2">
            <iframe src={embed.embedLink} className="h-[75vh] w-full"></iframe>
        </div>
    );
}

export default EmbedModal;
