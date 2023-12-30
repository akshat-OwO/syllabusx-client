"use client";

import { useEmbed } from "@/hooks/use-embed";
import { useMediaQuery } from "@mantine/hooks";
import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface EmbedModalProps {}

const EmbedModal: FC<EmbedModalProps> = ({}) => {
    const [embed, setEmbed] = useEmbed();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const closeEmbed = () => {
        setEmbed({ embedLink: "", name: "", isOpen: false });
    };

    return (
        <Dialog open={embed.isOpen} onOpenChange={closeEmbed}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{embed.name}</DialogTitle>
                </DialogHeader>
                <Viewer />
            </DialogContent>
        </Dialog>
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
