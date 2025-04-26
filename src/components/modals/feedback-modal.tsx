"use client";

import { useFeedback } from "@/hooks/use-feedback";
import { useMediaQuery } from "@mantine/hooks";
import FeedbackForm from "../FeedbackForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

const FeedbackModal = () => {
    const feedback = useFeedback();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (!isDesktop) {
        return (
            <Drawer open={feedback.isOpen} onClose={feedback.onClose}>
                <DrawerContent className="max-h-[90vh] px-5 pb-10">
                    <DrawerHeader>
                        <DrawerTitle>Feedback Form</DrawerTitle>
                    </DrawerHeader>
                    <FeedbackForm />
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog
            modal={false}
            open={feedback.isOpen}
            onOpenChange={feedback.onClose}
        >
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Feedback Form</DialogTitle>
                </DialogHeader>
                <FeedbackForm />
            </DialogContent>
        </Dialog>
    );
};

export default FeedbackModal;
