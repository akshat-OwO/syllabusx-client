"use client";

import { useLocalStorage } from "@mantine/hooks";
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
import { Departments, Semesters, SubjectSearchResult } from "@/config";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
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

    const [subjectHistory, setSubjectHistory] = useLocalStorage<string[]>({
        key: "subject-history",
        defaultValue: [],
    });

    const router = useRouter();

    const { data, isLoading } = useQuery({
        enabled: isSearching && debouncedQuery.length > 3,
        queryKey: ["search", debouncedQuery],
        queryFn: () =>
            search({
                query: debouncedQuery,
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
        const down = (e: KeyboardEvent) => {
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
        };

        document.addEventListener("keydown", down);
        return () => {
            document.removeEventListener("keydown", down);
        };
    }, [isOpen, onOpen]);

    useEffect(() => {
        if (data && data.length > 0 && !selectedSubject) {
            const firstSubject = data[0];
            const firstItemValue = `${_.camelCase(firstSubject.content.name)} ${firstSubject.content.name} ${firstSubject.content.theorypapercode} ${firstSubject.content.sem} ${firstSubject.content.dept?.join(",")} 0`;
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

            routePath += `/${subject.content.course.toLowerCase()}`;
            routePath += `/${Object.entries(Semesters).find(([, val]) => val === subject.content.sem)?.[0]}`;

            const departmentToUse =
                specificDept ||
                (subject?.content.dept && subject.content.dept.length > 0
                    ? subject.content.dept[0]
                    : null);

            if (departmentToUse) {
                routePath += `/${Object.entries(Departments)
                    .find(([, val]) => val === departmentToUse)?.[0]
                    .toLowerCase()}`;
            }

            routePath += `/${subject.content.name.toLowerCase().split(" ").join("-")}`;

            handleHistory(routePath);
            router.push(routePath);
        });
    };

    const handleSelectSubject = (subject: SubjectSearchResult) => {
        if (subject.content.dept && subject.content.dept.length > 1) {
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
                                {selectedSubject.content.name}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
            <CommandList>
                {selectedSubject &&
                selectedSubject.content?.dept &&
                selectedSubject.content.dept.length > 0 ? (
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
                            {selectedSubject.content.dept.map(
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
                                                            selectedSubject
                                                                .content.name
                                                        }
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="whitespace-nowrap rounded-md border-secondary bg-background text-xs font-normal text-muted-foreground group-aria-selected:text-foreground"
                                                    >
                                                        {
                                                            selectedSubject
                                                                .content
                                                                .theorypapercode
                                                        }
                                                    </Badge>
                                                    {selectedSubject.content
                                                        .labpapercode && (
                                                        <Badge
                                                            variant="outline"
                                                            className="whitespace-nowrap rounded-md border-secondary bg-background text-xs font-normal text-muted-foreground group-aria-selected:text-foreground"
                                                        >
                                                            {
                                                                selectedSubject
                                                                    .content
                                                                    .labpapercode
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
                                        key={`${_.camelCase(subject.content.name)} ${subject.content.theorypapercode} ${subject.content.sem} ${subject.content.dept?.join(",")} ${i}`}
                                        value={`${_.camelCase(subject.content.name)} ${subject.content.theorypapercode} ${subject.content.sem} ${subject.content.dept?.join(",")} ${i}`}
                                        className="group cursor-pointer text-xs font-semibold"
                                        onSelect={() =>
                                            handleSelectSubject(subject)
                                        }
                                    >
                                        <div className="flex w-full flex-col gap-2.5">
                                            <div className="flex items-center justify-between">
                                                <p className="truncate text-ellipsis text-xs text-muted-foreground group-aria-selected:text-foreground">
                                                    {subject.content.name}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="whitespace-nowrap rounded-md border-secondary bg-background text-xs font-normal text-muted-foreground group-aria-selected:text-foreground"
                                                    >
                                                        {
                                                            subject.content
                                                                .theorypapercode
                                                        }
                                                    </Badge>
                                                    {subject.content
                                                        .labpapercode && (
                                                        <Badge
                                                            variant="outline"
                                                            className="whitespace-nowrap rounded-md border-secondary bg-background text-xs font-normal text-muted-foreground group-aria-selected:text-foreground"
                                                        >
                                                            {
                                                                subject.content
                                                                    .labpapercode
                                                            }
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
                                                        {subject.content.course.toUpperCase()}
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
                                                                    subject
                                                                        .content
                                                                        .sem
                                                            )?.[0]
                                                        }
                                                    </Badge>
                                                </div>
                                                {subject.content.dept &&
                                                    subject.content.dept
                                                        .length > 0 && (
                                                        <ScrollArea className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                {subject.content.dept.map(
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
