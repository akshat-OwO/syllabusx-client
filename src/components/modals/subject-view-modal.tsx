import { useSubjectView } from "@/hooks/use-subject-view";
import { FC } from "react";
import SubjectView from "../SubjectView";
import { Dialog, DialogContent } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface SubjectViewModalProps {}

const SubjectViewModal: FC<SubjectViewModalProps> = ({}) => {
    const subjectView = useSubjectView();

    return (
        <Dialog open={subjectView.isOpen} onOpenChange={subjectView.onClose}>
            <DialogContent hidden className="max-w-4xl border-0 p-0">
                <SubjectView isModal course={subjectView.course} />
            </DialogContent>
        </Dialog>
    );
};

export default SubjectViewModal;
