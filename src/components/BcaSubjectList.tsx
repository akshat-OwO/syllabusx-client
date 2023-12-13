"use client";

import { getBcaSubjectList } from "@/lib/server";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

interface BcaSubjectListProps {}

const BcaSubjectList: FC<BcaSubjectListProps> = ({}) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const semester = searchParams.get("semester");
    const subjectParam = searchParams.get("subject");

    const {
        data: list,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["bca", "subjects", `${semester}`],
        queryFn: async () => {
            return await getBcaSubjectList({ semester });
        },
    });

    if (!semester) <></>;

    if (isLoading) {
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
    }

    if (error) {
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
                                                `?semester=${semester}&subject=${_.kebabCase(
                                                    subject
                                                )}`,
                                                { scroll: false }
                                            )
                                        }
                                    >
                                        {subject}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar />
                        </ScrollArea>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default BcaSubjectList;
