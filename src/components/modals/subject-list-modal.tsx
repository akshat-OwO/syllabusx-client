import {
    useActiveSubjectsStore,
    useSubjectList,
} from "@/hooks/use-subject-list";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
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
import Fuse from "fuse.js";
import type { IFuseOptions, FuseResult } from "fuse.js";

interface Subject {
    name: string;
    path: string;
    acronym: string;
}

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

    const [subjectHistory, setSubjectHistory] = useLocalStorage<string[]>({
        key: "subject-history",
        defaultValue: [],
    });

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams<{ slug: string[] }>();

    const [searchTerm, setSearchTerm] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [filteredSubjects, setFilteredSubjects] = useState<string[]>([]);

    // Helper functions for acronym generation
    const generateSearchableAcronyms = (text: string): string[] => {
        const words = text.split(/[\s-]+/);
        const acronyms = [];

        // Standard acronym
        acronyms.push(words.map((word) => word[0]).join(""));

        // Acronym with first two letters of each word
        acronyms.push(words.map((word) => word.slice(0, 2)).join(""));

        // Handle special cases
        if (text.toLowerCase().includes("c++")) {
            acronyms.push("cpp");
        }

        return acronyms.map((a) => a.toLowerCase());
    };

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

    const fuse = useMemo(() => {
        const options: IFuseOptions<Subject> = {
            keys: [
                { name: "name", weight: 0.7 },
                { name: "acronym", weight: 0.3 },
            ],
            threshold: 0.3,
            distance: 100,
            minMatchCharLength: 2,
            shouldSort: true,
            includeScore: true,
            useExtendedSearch: true,
            findAllMatches: true,
            location: 0,
            ignoreLocation: true,
        };

        const items: Subject[] = subjectList.subjectList.map((subject) => {
            const name = _.startCase(subject.split("-").join(" "));
            const acronyms = generateSearchableAcronyms(name);
            return {
                name,
                path: subject,
                acronym: acronyms.join(" "),
            };
        });

        return new Fuse(items, options);
    }, [subjectList.subjectList]);

    // Enhanced search effect
    useEffect(() => {
        let subjectsToSearch = subjectList.subjectList;

        if (currentActiveSubjects.length > 0 && !isEditMode) {
            subjectsToSearch = subjectsToSearch.filter((subject) =>
                currentActiveSubjects.includes(subject)
            );
        }
        if (searchTerm) {
            const searchResults = fuse.search(searchTerm);
            const filteredResults = searchResults
                .filter((result) => result.score && result.score < 0.4)
                .map((result) => result.item.path)
                .filter((subject) => subjectsToSearch.includes(subject));

            setFilteredSubjects(filteredResults);
        } else {
            setFilteredSubjects(subjectsToSearch);
        }
    }, [
        searchTerm,
        subjectList.subjectList,
        currentActiveSubjects,
        isEditMode,
        fuse,
    ]);

    const handleHref = (subject: string) => {
        let path: string = "";
        if (pathname.includes("btech")) {
            path = `/courses/btech/${params.slug[0]}/${params.slug[1]}/${subject}`;
        }
        if (pathname.includes("bca")) {
            path = `/courses/bca/${params.slug[0]}/${subject}`;
        }
        setSubjectHistory((prev) => {
            let history: string[] = [];
            if (prev.includes(path)) {
                prev.splice(prev.indexOf(path), 1);
            }
            history = [path, ...prev];
            if (history.length > 7) {
                history.pop();
            }
            return history;
        });
        router.push(path);
        subjectList.onClose();
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
                    className="flex-1"
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
