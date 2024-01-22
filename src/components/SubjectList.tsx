"use client";

import { Courses } from "@/config";
import { useSubjectList } from "@/hooks/use-subject-list";
import { getSubjectList } from "@/lib/server";
import { cn } from "@/lib/utils";
import { QueryKey, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { Expand, Maximize2, Minimize2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

interface SubjectListProps {
    course: Courses;
}

const SubjectList = ({ course }: SubjectListProps) => {
    const subjectListModal = useSubjectList();

    const searchParams = useSearchParams()!;

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
                        <Button
                            onClick={() =>
                                subjectListModal.onOpen(list as string[])
                            }
                            size={"icon"}
                            variant={"ghost"}
                        >
                            <Expand className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea type="always" className="h-28 pr-5">
                            <SubjectList.Data list={list as string[]} />
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
                    Something went wrong! {error.message}
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
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3">
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

export default SubjectList;
