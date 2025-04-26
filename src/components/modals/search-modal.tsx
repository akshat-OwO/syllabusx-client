"use client";

import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "../ui/command";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useSearch } from "@/hooks/use-search";
import { useQuery } from "@tanstack/react-query";
import { search } from "@/lib/server";
import { Courses, Departments, Semesters, SubjectSearchResult } from "@/config";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import {
    Bug,
    Instagram,
    Loader2,
    MessageSquarePlus,
    NotepadTextDashedIcon,
    Search,
    Sparkles,
    Star,
} from "lucide-react";
import { useAi } from "@/hooks/use-ai";
import useStore from "@/hooks/use-store";
import { useFeedback } from "@/hooks/use-feedback";

const kbdKey = ({ isMobile }: { isMobile: boolean }) => {
    if (isMobile) return null;
    let isMac = false;
    if (typeof window !== "undefined" && navigator?.userAgent) {
        isMac = navigator.userAgent.includes("Mac");
    }
    return isMac ? "⌘" : "Ctrl";
};

const SearchModal = () => {
    const { isOpen, onOpen, onClose } = useSearch();
    const ai = useStore(useAi, (state) => state);
    const feedback = useFeedback();

    const [isSearching, setIsSearching] = useState<boolean>(true);
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");
    const [currentValue, setCurrentValue] = useState<string>("-");
    const [selectedSubject, setSelectedSubject] =
        useState<SubjectSearchResult | null>(null);

    const [searchType, setSearchType] = useLocalStorage<
        "all" | "subject" | "theory" | "lab"
    >({
        key: "search-type",
        defaultValue: "all",
    });
    const [course, setCourse] = useLocalStorage<Courses | "undefined">({
        key: "search-course",
        defaultValue: "undefined",
    });
    const [sem, setSem] = useLocalStorage<Semesters | "undefined">({
        key: "search-semester",
        defaultValue: "undefined",
    });
    const [dept, setDept] = useLocalStorage<Departments | "undefined">({
        key: "search-department",
        defaultValue: "undefined",
    });

    const [subjectHistory, setSubjectHistory] = useLocalStorage<string[]>({
        key: "subject-history",
        defaultValue: [],
    });

    const isMobile = useMediaQuery("(max-width: 768px)");

    const router = useRouter();

    const { data, isLoading } = useQuery({
        enabled: isSearching && debouncedQuery.length > 3,
        queryKey: ["search", debouncedQuery, searchType, course, sem, dept],
        queryFn: () =>
            search({
                query: debouncedQuery,
                type: searchType,
                course: course === "undefined" ? undefined : course,
                sem: sem === "undefined" ? undefined : sem,
                dept: dept === "undefined" ? undefined : dept,
            }),
    });

    const handleHistory = (path: string) => {
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
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedUpdate = useCallback(
        _.debounce((value: string) => setDebouncedQuery(value), 500),
        []
    );

    const toggleSearchTypes = useCallback(() => {
        if (searchType === "all") {
            setSearchType("subject");
        } else if (searchType === "subject") {
            setSearchType("theory");
        } else if (searchType === "theory") {
            setSearchType("lab");
        } else if (searchType === "lab") {
            setSearchType("all");
        } else {
            setSearchType("all");
        }
    }, [searchType, setSearchType]);

    const toggleCourseTypes = useCallback(() => {
        if (course === "undefined") {
            setCourse(Courses.BTECH);
        } else if (course === Courses.BTECH) {
            setCourse(Courses.BCA);
        } else if (course === Courses.BCA) {
            setCourse("undefined");
        } else {
            setCourse("undefined");
        }
    }, [course, setCourse]);

    useEffect(() => {
        if (query.length > 0) {
            debouncedUpdate(query);
        } else {
            setDebouncedQuery("");
        }
        return () => {
            debouncedUpdate.cancel();
        };
    }, [query, debouncedUpdate]);

    useEffect(() => {
        let keySequence: string[] = [];
        let keyTimeout: NodeJS.Timeout | null = null;

        const down = (e: KeyboardEvent) => {
            const resetKeySequence = () => {
                keySequence = [];
            };

            if (
                (!isOpen && e.key === "k" && (e.metaKey || e.ctrlKey)) ||
                e.key === "/"
            ) {
                if (
                    (e.target instanceof HTMLElement &&
                        e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return;
                }

                e.preventDefault();
                onOpen();
                return;
            }

            if (isOpen) {
                if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    keySequence = ["k"];

                    if (keyTimeout) clearTimeout(keyTimeout);
                    keyTimeout = setTimeout(resetKeySequence, 1500);
                    return;
                }

                if (keySequence.includes("k")) {
                    switch (e.key.toLowerCase()) {
                        case "t":
                            e.preventDefault();
                            toggleSearchTypes();
                            resetKeySequence();
                            break;
                        case "c":
                            e.preventDefault();
                            toggleCourseTypes();
                            resetKeySequence();
                            break;
                        case "s":
                            e.preventDefault();
                            document
                                .querySelector<HTMLButtonElement>(
                                    '[data-semester-trigger="true"]'
                                )
                                ?.click();
                            resetKeySequence();
                            break;
                        case "d":
                            e.preventDefault();
                            document
                                .querySelector<HTMLButtonElement>(
                                    '[data-department-trigger="true"]'
                                )
                                ?.click();
                            resetKeySequence();
                            break;
                        default:
                            resetKeySequence();
                            break;
                    }
                }
            }
        };

        document.addEventListener("keydown", down);
        return () => {
            document.removeEventListener("keydown", down);
            if (keyTimeout) clearTimeout(keyTimeout);
        };
    }, [isOpen, onOpen, toggleSearchTypes, toggleCourseTypes]);

    useEffect(() => {
        if (data && data.length > 0 && !selectedSubject) {
            const firstSubject = data[0];
            const firstItemValue = `${firstSubject.camelCase} ${firstSubject.subject} ${firstSubject.theoryCode} ${firstSubject.semester} ${firstSubject.department?.join(",")} 0`;
            setCurrentValue(firstItemValue);
        } else if (selectedSubject) {
            setCurrentValue("back-to-search");
        } else {
            setCurrentValue("-");
        }
    }, [data, selectedSubject]);

    const runCommand = useCallback(
        (command: () => unknown) => {
            onClose();
            setCurrentValue("-");
            command();
        },
        [onClose]
    );

    const navigateToSubject = (
        subject: SubjectSearchResult,
        specificDept?: Departments
    ) => {
        runCommand(() => {
            let routePath = "/courses";

            routePath += `/${subject.course.toLowerCase()}`;
            routePath += `/${Object.entries(Semesters).find(([, val]) => val === subject.semester)?.[0]}`;

            const departmentToUse =
                specificDept ||
                (subject?.department && subject.department.length > 0
                    ? subject.department[0]
                    : null);

            if (departmentToUse) {
                routePath += `/${Object.entries(Departments)
                    .find(([, val]) => val === departmentToUse)?.[0]
                    .toLowerCase()}`;
            }

            routePath += `/${subject.subject.toLowerCase().split(" ").join("-")}`;

            handleHistory(routePath);
            router.push(routePath);
        });
    };

    const handleSelectSubject = (subject: SubjectSearchResult) => {
        if (subject.department && subject.department.length > 1) {
            setIsSearching(false);
            setQuery("");
            setSelectedSubject(subject);
        } else {
            navigateToSubject(subject);
        }
    };

    const goBackToSearchResults = () => {
        setIsSearching(true);
        setSelectedSubject(null);
    };

    return (
        <CommandDialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                    setSelectedSubject(null);
                }
            }}
            value={currentValue}
            onValueChange={setCurrentValue}
            className="[&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2"
            dialogClassName="border-none outline-none"
        >
            <div className="flex flex-col gap-2">
                <div className="relative">
                    <CommandInput
                        placeholder="Type a command to search..."
                        className={cn(!isSearching && "pl")}
                        containerClassName="border-none"
                        value={query}
                        onValueChange={setQuery}
                        onKeyDown={(e) => {
                            if (!isSearching) {
                                if (e.key === "Backspace" && query.length === 0)
                                    goBackToSearchResults();
                            }
                        }}
                        isLoading={isLoading}
                    />
                    <div className="absolute right-12 top-1/2 flex -translate-y-1/2 items-center gap-2">
                        {!isSearching && selectedSubject && (
                            <Badge
                                variant="outline"
                                className="cursor-pointer rounded-md border-secondary bg-background"
                                onClick={() => goBackToSearchResults()}
                            >
                                {selectedSubject.subject}
                            </Badge>
                        )}
                        {isSearching && searchType !== "all" && (
                            <Badge
                                variant="outline"
                                className="cursor-pointer rounded-md border-secondary bg-background"
                                onClick={() => setSearchType("all")}
                            >
                                {_.startCase(searchType)}
                            </Badge>
                        )}
                        {course !== "undefined" && (
                            <Badge
                                variant="outline"
                                className="cursor-pointer rounded-md border-secondary bg-background"
                                onClick={() => setCourse("undefined")}
                            >
                                {_.startCase(course.toLowerCase())}
                            </Badge>
                        )}
                        {sem !== "undefined" && (
                            <Badge
                                variant="outline"
                                className="cursor-pointer rounded-md border-secondary bg-background"
                                onClick={() => setSem("undefined")}
                            >
                                {
                                    Object.entries(Semesters).find(
                                        ([, val]) => val === sem
                                    )?.[0]
                                }
                            </Badge>
                        )}
                        {dept !== "undefined" && (
                            <Badge
                                variant="outline"
                                className="cursor-pointer rounded-md border-secondary bg-background"
                                onClick={() => setDept("undefined")}
                            >
                                {
                                    Object.entries(Departments).find(
                                        ([, val]) => val === dept
                                    )?.[0]
                                }
                            </Badge>
                        )}
                    </div>
                </div>
                {!selectedSubject && (
                    <div className="flex items-center gap-2 px-2">
                        <Tooltip>
                            <TooltipTrigger>
                                <Badge
                                    variant={
                                        searchType === "all"
                                            ? "secondary"
                                            : "default"
                                    }
                                    className="cursor-pointer gap-2 rounded-md"
                                    onClick={() => toggleSearchTypes()}
                                >
                                    {searchType === "all"
                                        ? "Subject"
                                        : _.startCase(searchType)}
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                align="start"
                                className="border-secondary text-xs"
                            >
                                Toggle Search type{" "}
                                <span className="rounded-md bg-secondary px-1 py-0.5 text-xs text-secondary-foreground">
                                    {kbdKey({ isMobile: !!isMobile })} K T
                                </span>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Badge
                                    variant={
                                        course === "undefined"
                                            ? "secondary"
                                            : "default"
                                    }
                                    className="cursor-pointer gap-2 rounded-md"
                                    onClick={() => toggleCourseTypes()}
                                >
                                    {course === "undefined"
                                        ? "Course"
                                        : _.startCase(course.toLowerCase())}
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                align="center"
                                className="border-secondary text-xs"
                            >
                                Toggle Course{" "}
                                <span className="rounded-md bg-secondary px-1 py-0.5 text-xs text-secondary-foreground">
                                    {kbdKey({ isMobile: !!isMobile })} K C
                                </span>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Select
                                    value={sem}
                                    onValueChange={(value) =>
                                        setSem(value as Semesters)
                                    }
                                >
                                    <SelectTrigger
                                        data-semester-trigger="true"
                                        className={cn(
                                            "h-fit gap-0.5 bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground",
                                            sem !== "undefined" &&
                                                "bg-primary text-primary-foreground"
                                        )}
                                    >
                                        <SelectValue placeholder="Semester">
                                            {sem === "undefined"
                                                ? "Semester"
                                                : Object.entries(
                                                      Semesters
                                                  ).find(
                                                      ([, val]) => val === sem
                                                  )?.[0] + " Semester"}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent className="max-h-40 border-secondary">
                                        <SelectItem
                                            value={"undefined"}
                                            className="py-1 text-xs"
                                        >
                                            Select Semester
                                        </SelectItem>
                                        {Object.entries(Semesters).map(
                                            ([key, value]) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                    className="py-1 text-xs"
                                                >
                                                    {key} Semester
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                align="center"
                                className="border-secondary text-xs"
                            >
                                Select Semester{" "}
                                <span className="rounded-md bg-secondary px-1 py-0.5 text-xs text-secondary-foreground">
                                    {kbdKey({ isMobile: !!isMobile })} K S
                                </span>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Select
                                    value={dept}
                                    onValueChange={(value) =>
                                        setDept(value as Departments)
                                    }
                                >
                                    <SelectTrigger
                                        data-department-trigger="true"
                                        className={cn(
                                            "h-fit gap-0.5 bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground",
                                            dept !== "undefined" &&
                                                "bg-primary text-primary-foreground"
                                        )}
                                    >
                                        <SelectValue placeholder="Department">
                                            {dept === "undefined"
                                                ? "Department"
                                                : Object.entries(
                                                      Departments
                                                  ).find(
                                                      ([, val]) => val === dept
                                                  )?.[0]}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent className="max-h-40 border-secondary">
                                        <SelectItem
                                            value={"undefined"}
                                            className="py-1 text-xs"
                                        >
                                            Select Department
                                        </SelectItem>
                                        {Object.entries(Departments).map(
                                            ([key, value]) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                    className="py-1 text-xs"
                                                >
                                                    {key} Department
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                align="center"
                                className="border-secondary text-xs"
                            >
                                Select Department{" "}
                                <span className="rounded-md bg-secondary px-1 py-0.5 text-xs text-secondary-foreground">
                                    {kbdKey({ isMobile: !!isMobile })} K D
                                </span>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                )}
            </div>
            <CommandList>
                {selectedSubject &&
                selectedSubject?.department &&
                selectedSubject.department.length > 0 ? (
                    <>
                        <CommandItem
                            className="group mx-2 cursor-pointer text-xs font-semibold"
                            onSelect={() => goBackToSearchResults()}
                            forceMount
                        >
                            <Badge
                                variant="outline"
                                className="mr-2 rounded-md border-secondary bg-background text-muted-foreground group-aria-selected:text-foreground"
                            >
                                ←
                            </Badge>
                            Back to search results
                        </CommandItem>
                        <CommandGroup heading="Select Department">
                            {selectedSubject.department.map(
                                (departmentValue) => {
                                    const departmentName = Object.entries(
                                        Departments
                                    ).find(
                                        ([, val]) => val === departmentValue
                                    )?.[0];

                                    return (
                                        <CommandItem
                                            key={departmentValue}
                                            className="group cursor-pointer text-xs font-semibold"
                                            onSelect={() =>
                                                navigateToSubject(
                                                    selectedSubject,
                                                    departmentValue
                                                )
                                            }
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="rounded-md border-secondary bg-background"
                                                    >
                                                        {departmentName}
                                                    </Badge>
                                                    <p className="max-w-[9rem] truncate text-ellipsis text-xs text-muted-foreground group-aria-selected:text-foreground">
                                                        {
                                                            selectedSubject.subject
                                                        }
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="whitespace-nowrap rounded-md border-secondary bg-background text-xs font-normal text-muted-foreground group-aria-selected:text-foreground"
                                                    >
                                                        {
                                                            selectedSubject.theoryCode
                                                        }
                                                    </Badge>
                                                    {selectedSubject.labCode && (
                                                        <Badge
                                                            variant="outline"
                                                            className="whitespace-nowrap rounded-md border-secondary bg-background text-xs font-normal text-muted-foreground group-aria-selected:text-foreground"
                                                        >
                                                            {
                                                                selectedSubject.labCode
                                                            }
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </CommandItem>
                                    );
                                }
                            )}
                        </CommandGroup>
                    </>
                ) : (
                    <>
                        <CommandEmpty className="mx-auto flex min-h-[9rem] w-full items-center justify-center text-sm">
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "No results found."
                            )}
                        </CommandEmpty>
                        <CommandGroup heading={data && "subject"}>
                            {data &&
                                data.length > 0 &&
                                data.map((subject, i) => (
                                    <CommandItem
                                        key={`${subject.camelCase} ${subject.theoryCode} ${subject.semester} ${subject.department?.join(",")} ${i}`}
                                        value={`${subject.camelCase} ${subject.subject} ${subject.theoryCode}  ${subject.semester} ${subject.department?.join(",")} ${i}`}
                                        className="group cursor-pointer text-xs font-semibold"
                                        onSelect={() =>
                                            handleSelectSubject(subject)
                                        }
                                    >
                                        <div className="flex w-full flex-col gap-2.5">
                                            <div className="flex items-center justify-between">
                                                <p className="truncate text-ellipsis text-xs text-muted-foreground group-aria-selected:text-foreground">
                                                    {subject.subject}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="whitespace-nowrap rounded-md border-secondary bg-background text-xs font-normal text-muted-foreground group-aria-selected:text-foreground"
                                                    >
                                                        {subject.theoryCode}
                                                    </Badge>
                                                    {subject.labCode && (
                                                        <Badge
                                                            variant="outline"
                                                            className="whitespace-nowrap rounded-md border-secondary bg-background text-xs font-normal text-muted-foreground group-aria-selected:text-foreground"
                                                        >
                                                            {subject.labCode}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="rounded-md border-secondary bg-background font-normal text-muted-foreground duration-0 group-aria-selected:bg-primary group-aria-selected:text-primary-foreground"
                                                    >
                                                        {subject.course}
                                                    </Badge>
                                                    <Badge
                                                        variant="outline"
                                                        className="rounded-md border-secondary bg-background font-normal text-muted-foreground duration-0 group-aria-selected:bg-primary group-aria-selected:text-primary-foreground"
                                                    >
                                                        {
                                                            Object.entries(
                                                                Semesters
                                                            ).find(
                                                                ([, val]) =>
                                                                    val ===
                                                                    subject.semester
                                                            )?.[0]
                                                        }
                                                    </Badge>
                                                </div>
                                                {subject.department &&
                                                    subject.department.length >
                                                        0 && (
                                                        <ScrollArea className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                {subject.department.map(
                                                                    (dept) => (
                                                                        <Badge
                                                                            key={
                                                                                dept
                                                                            }
                                                                            variant="outline"
                                                                            className="rounded-md border-secondary bg-background text-xs font-normal text-muted-foreground"
                                                                        >
                                                                            {
                                                                                dept
                                                                            }
                                                                        </Badge>
                                                                    )
                                                                )}
                                                            </div>
                                                            <ScrollBar orientation="horizontal" />
                                                        </ScrollArea>
                                                    )}
                                            </div>
                                        </div>
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                        {data && <CommandSeparator />}
                        <CommandGroup heading="History">
                            {subjectHistory.map((subject) => (
                                <CommandItem
                                    key={subject}
                                    className="group cursor-pointer text-xs font-normal"
                                    value={subject}
                                    onSelect={() => {
                                        runCommand(() => {
                                            handleHistory(subject);
                                            router.push(subject);
                                        });
                                    }}
                                >
                                    <p className="truncate text-ellipsis text-xs text-muted-foreground group-aria-selected:font-semibold group-aria-selected:text-foreground">
                                        {_.startCase(subject.split("/").pop())
                                            .split("-")
                                            .join(" ")}
                                    </p>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandGroup heading="AI">
                            <CommandItem
                                value={"search with ai"}
                                keywords={["ai", "search", "ai"]}
                                className="group cursor-pointer text-xs font-normal"
                                onSelect={() =>
                                    runCommand(() => {
                                        if (!ai) return;
                                        ai.completion.onOpen();
                                    })
                                }
                            >
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Search className="h-4 w-4 stroke-muted group-aria-selected:stroke-primary" />
                                        <p className="text-muted-foreground group-aria-selected:font-semibold group-aria-selected:text-foreground">
                                            Search with AI
                                        </p>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="rounded-md border-secondary bg-background font-normal text-muted-foreground duration-0 group-aria-selected:bg-primary group-aria-selected:font-semibold group-aria-selected:text-primary-foreground"
                                    >
                                        AI
                                    </Badge>
                                </div>
                            </CommandItem>
                            <CommandItem
                                value={"generate mock test"}
                                keywords={["ai", "generate", "mock", "test"]}
                                className="group cursor-pointer text-xs font-normal"
                                onSelect={() =>
                                    runCommand(() => {
                                        if (!ai) return;
                                        ai.mock.onOpen();
                                    })
                                }
                            >
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <NotepadTextDashedIcon className="h-4 w-4 stroke-muted group-aria-selected:stroke-primary" />
                                        <p className="text-muted-foreground group-aria-selected:font-semibold group-aria-selected:text-foreground">
                                            Generate mock test
                                        </p>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="rounded-md border-secondary bg-background font-normal text-muted-foreground duration-0 group-aria-selected:bg-primary group-aria-selected:font-semibold group-aria-selected:text-primary-foreground"
                                    >
                                        AI
                                    </Badge>
                                </div>
                            </CommandItem>
                        </CommandGroup>
                        <CommandGroup heading="Miscellaneous">
                            <CommandItem
                                value={"github"}
                                keywords={["github", "star"]}
                                className="group cursor-pointer text-xs font-normal"
                                onSelect={() =>
                                    runCommand(() => {
                                        window.open(
                                            "https://github.com/akshat-OwO/syllabusx-client",
                                            "_blank"
                                        );
                                    })
                                }
                            >
                                <div className="flex w-full items-center gap-2">
                                    <Star className="h-4 w-4 stroke-muted group-aria-selected:stroke-primary" />
                                    <p className="text-muted-foreground group-aria-selected:font-semibold group-aria-selected:text-foreground">
                                        Star us on Github
                                    </p>
                                </div>
                            </CommandItem>
                            <CommandItem
                                value={"instagram"}
                                keywords={["instagram", "follow"]}
                                className="group cursor-pointer text-xs font-normal"
                                onSelect={() =>
                                    runCommand(() => {
                                        window.open(
                                            "https://www.instagram.com/syllabusx_.live/",
                                            "_blank"
                                        );
                                    })
                                }
                            >
                                <div className="flex w-full items-center gap-2">
                                    <Instagram className="h-4 w-4 stroke-muted group-aria-selected:stroke-primary" />
                                    <p className="text-muted-foreground group-aria-selected:font-semibold group-aria-selected:text-foreground">
                                        Follow us on Instagram
                                    </p>
                                </div>
                            </CommandItem>
                            <CommandItem
                                value={"bug"}
                                keywords={["bug", "issue", "report"]}
                                className="group cursor-pointer text-xs font-normal"
                                onSelect={() =>
                                    runCommand(() => {
                                        window.open(
                                            "https://github.com/akshat-OwO/syllabusx-client/issues/new?template=bug-report.yml",
                                            "_blank"
                                        );
                                    })
                                }
                            >
                                <div className="flex w-full items-center gap-2">
                                    <Bug className="h-4 w-4 stroke-muted group-aria-selected:stroke-primary" />
                                    <p className="text-muted-foreground group-aria-selected:font-semibold group-aria-selected:text-foreground">
                                        Report an issue on Github
                                    </p>
                                </div>
                            </CommandItem>
                            <CommandItem
                                value={"feature-request"}
                                keywords={["feature", "request"]}
                                className="group cursor-pointer text-xs font-normal"
                                onSelect={() =>
                                    runCommand(() => {
                                        window.open(
                                            "https://github.com/akshat-OwO/syllabusx-client/issues/new?template=feature-request.yml",
                                            "_blank"
                                        );
                                    })
                                }
                            >
                                <div className="flex w-full items-center gap-2">
                                    <Sparkles className="h-4 w-4 stroke-muted group-aria-selected:stroke-primary" />
                                    <p className="text-muted-foreground group-aria-selected:font-semibold group-aria-selected:text-foreground">
                                        Request for a new feature on Github
                                    </p>
                                </div>
                            </CommandItem>
                            <CommandItem
                                value={"feedback"}
                                keywords={["feedback", "form"]}
                                className="group cursor-pointer text-xs font-normal"
                                onSelect={() =>
                                    runCommand(() => {
                                        feedback.onOpen();
                                    })
                                }
                            >
                                <div className="flex w-full items-center gap-2">
                                    <MessageSquarePlus className="h-4 w-4 stroke-muted group-aria-selected:stroke-primary" />
                                    <p className="text-muted-foreground group-aria-selected:font-semibold group-aria-selected:text-foreground">
                                        Give us Feedback
                                    </p>
                                </div>
                            </CommandItem>
                        </CommandGroup>
                    </>
                )}
            </CommandList>
        </CommandDialog>
    );
};

export default SearchModal;
