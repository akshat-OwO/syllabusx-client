import { useSubjectList } from "@/hooks/use-subject-list";
import { useMediaQuery } from "@mantine/hooks";
import { FC } from "react";
import SubjectList from "../SubjectList";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";

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
                    <ScrollArea type="scroll" tw="max-h-[75vh]">
                        <SubjectList.Data list={subjectList.subjectList} />
                    </ScrollArea>
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
                <ScrollArea type="scroll" tw="max-h-[50vh]">
                    <SubjectList.Data list={subjectList.subjectList} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default SubjectListModal;
