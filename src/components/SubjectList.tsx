"use client";

import { Courses } from "@/config";
import {
    useActiveSubjectsStore,
    useSubjectList,
} from "@/hooks/use-subject-list";
import { getSubjectList } from "@/lib/server";
import { cn } from "@/lib/utils";
import { QueryKey, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { Check, Expand, ListChecks, Maximize2, Minimize2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Command, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface SubjectListProps {
    course: Courses;
}

const SubjectList = ({ course }: SubjectListProps) => {
    const subjectListModal = useSubjectList();

    const searchParams = useSearchParams()!;

    const { activeSubjects } = useActiveSubjectsStore();

    const semester = searchParams.get("semester");
    const branch = searchParams.get("branch");

    const generateQueryKey = (): QueryKey => {
        if (course === Courses.BTECH)
            return [course, "subject-list", semester, branch];
        if (course === Courses.BCA) return [course, "subject-list", semester];
        return [course];
    };

    const {
        data: list,
        isLoading,
        error,
    } = useQuery({
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: generateQueryKey(),
        queryFn: async () => await getSubjectList({ course, branch, semester }),
    });

    const generateSubjectList = useMemo(() => {
        const subjects = activeSubjects.find(
            (active) => active.branch === branch && active.semester === semester
        );

        if (subjects && subjects.subjects.length > 0) {
            return subjects.subjects;
        } else {
            if (list) return list;
        }
    }, [list, semester, branch, activeSubjects]);

    if (isLoading) {
        return <SubjectList.Skeleton />;
    }

    if (error) {
        return <SubjectList.Error error={error} />;
    }

    return (
        <>
            {list && (
                <Card className="col-span-3 shadow-2xl lg:col-span-2">
                    <CardHeader className="flex-row justify-between">
                        <div className="flex flex-col space-y-1.5">
                            <CardTitle>Subjects</CardTitle>
                            <CardDescription>
                                Click on any subject to unveil its syllabus.
                                Spoiler alert: courage required
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {list.length > 9 && (
                                <SubjectList.ActiveSubjects list={list} />
                            )}
                            <Button
                                onClick={() =>
                                    subjectListModal.onOpen(generateSubjectList)
                                }
                                size={"icon"}
                                variant={"ghost"}
                            >
                                <Expand className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea type="always" className="h-28 pr-5">
                            <SubjectList.Data list={generateSubjectList} />
                        </ScrollArea>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

SubjectList.Skeleton = function SubjectListSKeleton() {
    return (
        <Card className="col-span-3 h-fit shadow-2xl lg:col-span-2">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-8 w-48" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-5 w-52 " />
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    );
};

SubjectList.Error = function SubjectListError({ error }: { error: Error }) {
    return (
        <Card className="col-span-3 h-fit shadow-2xl lg:col-span-2">
            <CardHeader>
                <CardTitle>Temporary Glitch in the Matrix</CardTitle>
                <CardDescription>
                    {error.message
                        ? error.message
                        : "Something went wrong! Please try again later."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[7.5rem] w-full rounded-md bg-accent" />
            </CardContent>
        </Card>
    );
};

SubjectList.Data = function SubjectListData({ list }: { list: string[] }) {
    const subjectListModal = useSubjectList();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()!;

    const subjectParam = searchParams.get("subject");

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    return (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {list.map((subject: string) => (
                <Button
                    className="h-auto whitespace-normal shadow-md"
                    variant={
                        subjectParam &&
                        _.startCase(_.toLower(subjectParam)) === subject
                            ? "default"
                            : "secondary"
                    }
                    size={"default"}
                    key={subject}
                    onClick={() => {
                        router.push(
                            pathname +
                                "?" +
                                createQueryString(
                                    "subject",
                                    _.kebabCase(subject)
                                ),
                            { scroll: false }
                        );
                        subjectListModal.onClose();
                    }}
                >
                    {subject}
                </Button>
            ))}
        </div>
    );
};

SubjectList.ActiveSubjects = function SubjectListActiveSubjects({
    list,
}: {
    list: string[];
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState<boolean>(false);

    const searchParams = useSearchParams()!;

    const semester = searchParams.get("semester");
    const branch = searchParams.get("branch");

    const { activeSubjects, toggleSubject } = useActiveSubjectsStore();

    const onOpenChange = (value: boolean) => {
        inputRef.current?.blur();
        setOpen(value);
    };

    const toggle = (subject: string) => {
        if (semester && branch) {
            toggleSubject(semester, branch, subject);
        }
    };

    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <HoverCard>
                <HoverCardTrigger>
                    <PopoverTrigger asChild>
                        <Button
                            variant={
                                activeSubjects.some(
                                    (active) =>
                                        active.branch === branch &&
                                        active.semester === semester &&
                                        active.subjects.length > 0
                                )
                                    ? "ghost"
                                    : "default"
                            }
                            size="icon"
                            aria-expanded={open}
                            role="combobox"
                        >
                            <ListChecks className="size-4" />
                        </Button>
                    </PopoverTrigger>
                </HoverCardTrigger>
                <HoverCardContent side="top" className="w-fit">
                    Choose your subjects
                </HoverCardContent>
            </HoverCard>
            <PopoverContent>
                <Command loop>
                    <CommandInput
                        ref={inputRef}
                        placeholder="Search Subjects..."
                    />
                    <CommandGroup>
                        <ScrollArea type="always" className="h-44 pr-4">
                            {list.map((subject) => {
                                const isActive = activeSubjects.some(
                                    (active) =>
                                        active.branch === branch &&
                                        active.semester === semester &&
                                        active.subjects.includes(subject)
                                );
                                return (
                                    <CommandItem
                                        key={subject}
                                        value={subject}
                                        onSelect={() => toggle(subject)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                isActive
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        <div className="flex-1">{subject}</div>
                                    </CommandItem>
                                );
                            })}
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SubjectList;
