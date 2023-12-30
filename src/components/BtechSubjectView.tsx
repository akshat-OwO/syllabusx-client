"use client";

import { Tab } from "@/config";
import { getBtechSubjectDetails } from "@/lib/server";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import StudyMaterial from "./StudyMaterial";
import Syllabus from "./Syllabus";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface BtechSubjectViewProps {}

const BtechSubjectView: FC<BtechSubjectViewProps> = ({}) => {
    const searchParams = useSearchParams();
    const [tab, setTab] = useState<Tab>(Tab.THEORY);

    const semester = searchParams.get("semester");
    const branch = searchParams.get("branch");
    const subject = searchParams.get("subject");

    const switchTab = (value: Tab) => {
        setTab(value);
    };

    const {
        data: sub,
        isLoading,
        error,
    } = useQuery({
        queryKey: [
            "btech",
            "subject",
            `${semester}`,
            `${branch}`,
            `${subject}`,
        ],
        queryFn: async () => {
            return await getBtechSubjectDetails({ semester, branch, subject });
        },
    });

    if (!semester || !branch || !subject) <></>;

    if (error) {
        return (
            <Card className="col-span-3 h-fit shadow-2xl">
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

    if (isLoading) {
        return (
            <>
                <Card className="col-span-3 h-fit shadow-2xl lg:col-span-2">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-8 w-48" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-[7.5rem] w-full" />
                    </CardContent>
                </Card>
                <Card className="col-span-3 row-start-3 h-fit shadow-2xl lg:col-span-1 lg:row-start-auto">
                    <CardHeader>
                        <CardTitle>
                            <Skeleton className="h-8 w-48" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-[7.5rem] w-full" />
                    </CardContent>
                </Card>
            </>
        );
    }

    return (
        <>
            {sub && (
                <>
                    <Card className="col-span-3 h-fit shadow-2xl lg:col-span-2">
                        <CardHeader>
                            <CardTitle>{sub[0].subject}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs
                                value={tab}
                                className="w-full"
                                onValueChange={(value) =>
                                    switchTab(Tab[value as keyof typeof Tab])
                                }
                            >
                                <TabsList className="grid h-fit w-full grid-cols-3 sm:grid-cols-6">
                                    <TabsTrigger value={Tab.THEORY}>
                                        Theory
                                    </TabsTrigger>
                                    <TabsTrigger value={Tab.LAB}>
                                        Lab
                                    </TabsTrigger>
                                    <TabsTrigger value={Tab.NOTES}>
                                        Notes
                                    </TabsTrigger>
                                    <TabsTrigger value={Tab.PYQ}>
                                        PYQs
                                    </TabsTrigger>
                                    <TabsTrigger value={Tab.BOOKS}>
                                        Books
                                    </TabsTrigger>
                                    <TabsTrigger value={Tab.FILES}>
                                        Practicals
                                    </TabsTrigger>
                                </TabsList>
                                <Syllabus
                                    theory={sub[0].theory}
                                    lab={sub[0].lab}
                                />
                                {tab === Tab.NOTES ||
                                tab === Tab.BOOKS ||
                                tab === Tab.PYQ ||
                                tab === Tab.FILES ? (
                                    <StudyMaterial
                                        tab={tab}
                                        note={sub[0].camel}
                                        pyq={sub[0].pYq}
                                        book={sub[0].book}
                                        practical={sub[0].practical}
                                        semester={semester}
                                        branch={branch}
                                        subject={subject}
                                    />
                                ) : null}
                            </Tabs>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3 row-start-3 h-fit shadow-2xl lg:col-span-1 lg:row-start-auto">
                        <CardHeader>
                            <CardTitle>Subject Details</CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            <div className="flex flex-col gap-2 rounded-md bg-accent p-2 shadow-md">
                                {sub[0].theorypapercode ? (
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">
                                            Theory Code
                                        </p>
                                        <p>{sub[0].theorypapercode}</p>
                                    </div>
                                ) : null}
                                {sub[0].theorycredits ? (
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">
                                            Theory Credits
                                        </p>
                                        <p>{sub[0].theorycredits}</p>
                                    </div>
                                ) : null}
                                {sub[0].labpapercode ? (
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">
                                            Lab Code
                                        </p>
                                        <p>{sub[0].labpapercode}</p>
                                    </div>
                                ) : null}
                                {sub[0].labcredits ? (
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">
                                            Lab Credits
                                        </p>
                                        <p>{sub[0].labcredits}</p>
                                    </div>
                                ) : null}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </>
    );
};

export default BtechSubjectView;
