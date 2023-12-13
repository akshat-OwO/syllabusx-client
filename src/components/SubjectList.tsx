"use client";

import { Courses } from "@/config";
import { getSubjectList } from "@/lib/server";
import { QueryKey, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()!;

    const semester = searchParams.get("semester");
    const branch = searchParams.get("branch");
    const subjectParam = searchParams.get("subject");

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

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
                    <CardHeader>
                        <CardTitle>Subjects</CardTitle>
                        <CardDescription>
                            Click on any subject to unveil its syllabus. Spoiler
                            alert: courage required
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea type="always" className="h-28 pr-5">
                            <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3">
                                {list.map((subject: string) => (
                                    <Button
                                        className="h-auto whitespace-normal shadow-md"
                                        variant={
                                            subjectParam &&
                                            _.startCase(
                                                _.toLower(subjectParam)
                                            ) === subject
                                                ? "default"
                                                : "secondary"
                                        }
                                        size={"default"}
                                        key={subject}
                                        onClick={() =>
                                            router.push(
                                                pathname +
                                                    "?" +
                                                    createQueryString(
                                                        "subject",
                                                        _.kebabCase(subject)
                                                    ),
                                                { scroll: false }
                                            )
                                        }
                                    >
                                        {subject}
                                    </Button>
                                ))}
                            </div>
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

export default SubjectList;
