"use client";

import { Tab } from "@/config";
import { getBcaSubjectDetails } from "@/lib/server";
import { useQuery } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import BcaStudyMaterial from "./BcaStudyMaterial";
import Syllabus from "./Syllabus";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface BcaSubjectViewProps {}

const BcaSubjectView: FC<BcaSubjectViewProps> = ({}) => {
    const searchParams = useSearchParams();
    const [tab, setTab] = useState<Tab>(Tab.THEORY);
    const [embed, setEmbed] = useState<Embed>({ embedLink: "", name: "" });
    const [showEmbed, setShowEmbed] = useState<boolean>(false);

    const semester = searchParams.get("semester");
    const subject = searchParams.get("subject");

    const switchTab = (value: Tab) => {
        setShowEmbed(false);
        setEmbed({ embedLink: "", name: "" });
        setTab(value);
    };

    const {
        data: sub,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["bca", "subject", `${semester}`, `${subject}`],
        queryFn: async () => {
            return await getBcaSubjectDetails({ semester, subject });
        },
    });

    if (!semester || !subject) <></>;

    if (error) {
        return (
            <Card className="col-span-3 shadow-2xl h-fit">
                <CardHeader>
                    <CardTitle>Temporary Glitch in the Matrix</CardTitle>
                    <CardDescription>
                        Something went wrong! {error.message}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-accent rounded-md h-[7.5rem] w-full" />
                </CardContent>
            </Card>
        );
    }

    if (isLoading) {
        return (
            <>
                <Card className="col-span-3 lg:col-span-2 shadow-2xl h-fit">
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
                <Card className="row-start-3 lg:row-start-auto col-span-3 lg:col-span-1 shadow-2xl h-fit">
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
                    <Card className="col-span-3 lg:col-span-2 shadow-2xl h-fit">
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
                                <TabsList className="grid w-full h-fit grid-cols-3 sm:grid-cols-6">
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
                                    theory={sub[0].units}
                                    lab={sub[0].lab}
                                />
                                {tab === Tab.NOTES ||
                                tab === Tab.BOOKS ||
                                tab === Tab.PYQ ||
                                tab === Tab.FILES ? (
                                    <BcaStudyMaterial
                                        tab={tab}
                                        note={sub[0].camel}
                                        pyq={sub[0].pYq}
                                        book={sub[0].book}
                                        practical={sub[0].practical}
                                        semester={semester}
                                        subject={subject}
                                        embed={embed}
                                        setEmbed={setEmbed}
                                        showEmbed={showEmbed}
                                        setShowEmbed={setShowEmbed}
                                    />
                                ) : null}
                            </Tabs>
                        </CardContent>
                    </Card>
                    <Card className="row-start-3 lg:row-start-auto col-span-3 lg:col-span-1 shadow-2xl h-fit">
                        <CardHeader>
                            <CardTitle>Subject Details</CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            <div className="p-2 bg-accent rounded-md shadow-md flex flex-col gap-2">
                                {sub[0].theorypapercode ? (
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">
                                            Theory Code
                                        </p>
                                        <p>{sub[0].theorypapercode}</p>
                                    </div>
                                ) : null}
                                {sub[0].theorycredits ? (
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">
                                            Theory Credits
                                        </p>
                                        <p>{sub[0].theorycredits}</p>
                                    </div>
                                ) : null}
                                {sub[0].labpapercode ? (
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">
                                            Lab Code
                                        </p>
                                        <p>{sub[0].labpapercode}</p>
                                    </div>
                                ) : null}
                                {sub[0].labcredits ? (
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">
                                            Lab Credits
                                        </p>
                                        <p>{sub[0].labcredits}</p>
                                    </div>
                                ) : null}
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">
                                        Course Category
                                    </p>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Button
                                                variant={"secondary"}
                                                size={"icon"}
                                                className="p-0 h-4 w-4"
                                            >
                                                <Info className="h-4 w-4" />
                                            </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            <p>{sub[0].coursecategory}</p>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </>
    );
};

export default BcaSubjectView;
