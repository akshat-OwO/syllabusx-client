"use client";

import { useFeedback } from "@/hooks/use-feedback";
import { FC } from "react";
import FeedbackForm from "../FeedbackForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface FeedbackModalProps {}

const FeedbackModal: FC<FeedbackModalProps> = ({}) => {
    const feedback = useFeedback();

    return (
        <Dialog open={feedback.isOpen} onOpenChange={feedback.onClose}>
            <DialogHeader>
                <DialogTitle>Feedback Form</DialogTitle>
            </DialogHeader>
            <DialogContent className="max-w-4xl">
                <FeedbackForm />
            </DialogContent>
        </Dialog>
    );
};

export default FeedbackModal;
