"use client";

import { Courses } from "@/config";
import {
    useActiveSubjectsStore,
    useSubjectList,
} from "@/hooks/use-subject-list";
import { cn } from "@/lib/utils";
import _ from "lodash";
import { Check, Expand, ListChecks } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import AccessibleToolTip from "./ui/accessible-tooltip";
import { Button, buttonVariants } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Command, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";

interface SubjectListProps {
    course: Courses;
    list: string[];
}

const SubjectList = ({ course, list }: SubjectListProps) => {
    const subjectListModal = useSubjectList();

    const params = useParams<{ slug: string[] }>();

    const { activeSubjects } = useActiveSubjectsStore();

    const semester = params.slug[0];
    const branch = params.slug[1];

    const generateSubjectList = useMemo(() => {
        const subjects = activeSubjects.find(
            (active) => active.branch === branch && active.semester === semester
        );

        if (subjects && subjects.subjects.length > 0) {
            return subjects.subjects;
        }

        return list;
    }, [list, semester, branch, activeSubjects]);

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
                            <AccessibleToolTip label="Modal view">
                                <Button
                                    onClick={() =>
                                        subjectListModal.onOpen(
                                            generateSubjectList
                                        )
                                    }
                                    size={"icon"}
                                    variant={"ghost"}
                                >
                                    <Expand className="h-4 w-4" />
                                </Button>
                            </AccessibleToolTip>
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

SubjectList.Data = function SubjectListData({ list }: { list: string[] }) {
    const subjectListModal = useSubjectList();

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams<{ slug: string[] }>();

    const semester = params.slug[0];
    const branch = params.slug[1];
    const subjectParam = params.slug[2];

    const createHref = useCallback(
        (subject: string) => {
            if (pathname.includes("btech")) {
                return `/courses/btech/${semester}/${branch}/${subject}`;
            }

            if (pathname.includes("bca")) {
                return `/courses/bca/${semester}/${subject}`;
            }

            return `/courses/btech/${semester}/${branch}`;
        },
        [semester, branch, pathname]
    );

    return (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {list.map((subject: string) => (
                <Link
                    href={createHref(subject)}
                    className={cn(
                        buttonVariants({
                            variant:
                                subjectParam === subject
                                    ? "default"
                                    : "secondary",
                            className:
                                "h-auto whitespace-normal text-center shadow-md",
                        })
                    )}
                    key={subject}
                >
                    {_.startCase(subject.split("-").join(" "))}
                </Link>
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

    const params = useParams<{ slug: string[] }>();

    const semester = params.slug[0];
    const branch = params.slug[1];

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
            <AccessibleToolTip label="Choose your subjects">
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
            </AccessibleToolTip>
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
                                        <div className="flex-1">
                                            {_.startCase(
                                                subject.split("-").join(" ")
                                            )}
                                        </div>
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
