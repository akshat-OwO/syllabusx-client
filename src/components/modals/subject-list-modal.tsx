import { useSubjectList } from "@/hooks/use-subject-list";
import { useMediaQuery } from "@mantine/hooks";
import { FC } from "react";
import SubjectList from "../SubjectList";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

interface SubjectListModalProps {}

const SubjectListModal: FC<SubjectListModalProps> = ({}) => {
    const subjectList = useSubjectList();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (!isDesktop) {
        return (
            <Drawer open={subjectList.isOpen} onClose={subjectList.onClose}>
                <DrawerContent className="min-h-[50vh] px-5 pb-10">
                    <DrawerHeader>
                        <DrawerTitle>Subjects</DrawerTitle>
                    </DrawerHeader>
                    <SubjectList.Data list={subjectList.subjectList} />
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={subjectList.isOpen} onOpenChange={subjectList.onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Subjects</DialogTitle>
                </DialogHeader>
                <SubjectList.Data list={subjectList.subjectList} />
            </DialogContent>
        </Dialog>
    );
};

export default SubjectListModal;
