import {
    useActiveSubjectsStore,
    useSubjectList,
} from "@/hooks/use-subject-list";
import { useMediaQuery } from "@mantine/hooks";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../ui/sheet";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import { ChevronRight, List, Pencil } from "lucide-react";
import _ from "lodash";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

const SubjectListModal = () => {
    const subjectList = useSubjectList();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (!isDesktop) {
        return (
            <Drawer open={subjectList.isOpen} onClose={subjectList.onClose}>
                <DrawerContent className="h-[90vh] px-5 pb-10">
                    <DrawerHeader>
                        <DrawerTitle>Choose Subject</DrawerTitle>
                    </DrawerHeader>
                    <SubjectListModal.List />
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Sheet open={subjectList.isOpen} onOpenChange={subjectList.onClose}>
            <SheetContent className="sm:max-w-xl">
                <SheetHeader>
                    <SheetTitle>Choose subject</SheetTitle>
                    <SheetDescription>
                        Click on any subject to view the syllabus
                    </SheetDescription>
                </SheetHeader>
                <SubjectListModal.List />
            </SheetContent>
        </Sheet>
    );
};

SubjectListModal.List = function SubjectListModalList() {
    const subjectList = useSubjectList();
    const { activeSubjects, toggleSubject } = useActiveSubjectsStore();

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams<{ slug: string[] }>();

    const [searchTerm, setSearchTerm] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [filteredSubjects, setFilteredSubjects] = useState<string[]>([]);

    const { semester, branch } = useMemo(() => {
        if (pathname.includes("btech")) {
            return { semester: params.slug[0], branch: params.slug[1] };
        } else if (pathname.includes("bca")) {
            return { semester: params.slug[0], branch: "bca" };
        }
        return { semester: "", branch: "" };
    }, [pathname, params.slug]);

    const currentActiveSubjects = useMemo(
        () =>
            activeSubjects.find(
                (active) =>
                    active.semester === semester && active.branch === branch
            )?.subjects || [],
        [activeSubjects, semester, branch]
    );

    useEffect(() => {
        let subjectsToShow: string[];
        if (currentActiveSubjects.length > 0 && !isEditMode) {
            subjectsToShow = subjectList.subjectList.filter((subject) =>
                currentActiveSubjects.includes(subject)
            );
        } else {
            subjectsToShow = subjectList.subjectList;
        }

        const filtered = subjectsToShow.filter((subject) =>
            subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSubjects(filtered);
    }, [
        searchTerm,
        subjectList.subjectList,
        currentActiveSubjects,
        isEditMode,
    ]);

    const handleHref = (subject: string) => {
        if (pathname.includes("btech")) {
            router.push(
                `/courses/btech/${params.slug[0]}/${params.slug[1]}/${subject}`
            );
            subjectList.onClose();
        }
        if (pathname.includes("bca")) {
            router.push(`/courses/bca/${params.slug[0]}/${subject}`);
            subjectList.onClose();
        }
    };

    const handleSubjectClick = (subject: string) => {
        if (!isEditMode) {
            handleHref(subject);
        } else {
            handleToggleSubject(subject);
        }
    };

    const handleToggleSubject = (subject: string) => {
        toggleSubject(semester, branch, subject);
    };

    return (
        <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center gap-4 pl-1 pr-4">
                <Input
                    placeholder="Search Subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                    className="gap-2"
                    onClick={() => setIsEditMode(!isEditMode)}
                    variant={isEditMode ? "default" : "outline"}
                >
                    <Pencil className="h-4 w-4" />
                    <span className="hidden md:block">Toggle Edit</span>
                </Button>
            </div>
            <ScrollArea className="h-screen">
                <div className="flex flex-col gap-3 py-1 pl-1 pr-4">
                    <div
                        className={cn(
                            "flex max-h-0 flex-col gap-2 overflow-hidden rounded border-0 p-0 transition-all duration-500",
                            {
                                "max-h-32 border border-input px-3 py-2":
                                    !isEditMode &&
                                    filteredSubjects.length > 9 &&
                                    currentActiveSubjects.length === 0,
                            }
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <List className="h-4 w-4" />
                            <span className="text-sm font-semibold">
                                Heads up!
                            </span>
                        </div>
                        <span className="text-sm">
                            You can edit subject list by toggling the edit.
                        </span>
                    </div>
                    {filteredSubjects.length === 0 && (
                        <p
                            className={cn(
                                buttonVariants({ variant: "outline" })
                            )}
                        >
                            No subjects match your search.
                        </p>
                    )}
                    {filteredSubjects.map((subject) => (
                        <Button
                            variant={
                                isEditMode &&
                                currentActiveSubjects.includes(subject)
                                    ? "default"
                                    : "outline"
                            }
                            key={subject}
                            className="group h-fit justify-between whitespace-normal transition-all"
                            onClick={() => handleSubjectClick(subject)}
                        >
                            <span className="flex flex-col items-start transition-all group-hover:gap-0.5">
                                <span className="text-truncate line-clamp-1 text-start">
                                    {_.startCase(subject.split("-").join(" "))}
                                </span>
                                <span className="max-h-0 overflow-hidden text-xs transition-all md:group-hover:max-h-4">
                                    /{subject}
                                </span>
                            </span>
                            <div className="flex items-center gap-2">
                                {isEditMode ? (
                                    <Checkbox
                                        tabIndex={-1}
                                        checked={currentActiveSubjects.includes(
                                            subject
                                        )}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleSubject(subject);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleToggleSubject(subject);
                                            }
                                        }}
                                    />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </div>
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default SubjectListModal;
