"use client";

import { Tab } from "@/config";
import { useSubjectView } from "@/hooks/use-subject-view";
import { getBcaSubjectDetails, getBtechSubjectDetails } from "@/lib/server";
import { cn } from "@/lib/utils";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { Expand } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import StudyMaterial from "./StudyMaterial";
import Syllabus from "./Syllabus";
import AccessibleToolTip from "./ui/accessible-tooltip";
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
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface SubjectViewProps {
    course: string;
    isModal?: boolean;
}

const SubjectView = ({ course, isModal }: SubjectViewProps) => {
    const searchParams = useSearchParams();
    const [tab, setTab] = useState<Tab>(Tab.THEORY);

    const subjectViewModal = useSubjectView();

    const semester = searchParams.get("semester");
    const branch = searchParams.get("branch");
    const subject = searchParams.get("subject");

    const switchTab = (value: Tab) => {
        setTab(value);
    };

    const generateQueryKey = (): QueryKey => {
        if (course == "btech") {
            return [course, "subject", semester, branch, subject];
        }
        return [course, "subject", semester, subject];
    };

    const {
        data: sub,
        isLoading,
        error,
    } = useQuery({
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: generateQueryKey(),
        queryFn: async () => {
            if (course == "btech") {
                return await getBtechSubjectDetails({
                    semester,
                    branch,
                    subject,
                });
            }
            return await getBcaSubjectDetails({
                semester,
                subject,
            });
        },
    });

    if (!semester || !branch || !subject) <></>;

    if (error || (sub && !(sub.length > 0))) {
        return <SubjectView.Error error={error} />;
    }

    if (isLoading) {
        return <SubjectView.Skeleton isModal={isModal} />;
    }

    return (
        <>
            {sub && (
                <>
                    <Card
                        className={cn(
                            "col-span-3 h-fit shadow-2xl lg:col-span-2",
                            {
                                "border-0": subjectViewModal.isOpen,
                            }
                        )}
                    >
                        <CardHeader
                            className={cn(
                                "flex-row items-center justify-between",
                                {
                                    "md:py-3": !subjectViewModal.isOpen,
                                }
                            )}
                        >
                            <CardTitle>{sub[0].subject}</CardTitle>
                            {!subjectViewModal.isOpen && (
                                <AccessibleToolTip label="Modal view">
                                    <Button
                                        onClick={() =>
                                            subjectViewModal.onOpen(course)
                                        }
                                        size={"icon"}
                                        variant={"ghost"}
                                        className="hidden md:inline-flex"
                                    >
                                        <Expand className="h-4 w-4" />
                                    </Button>
                                </AccessibleToolTip>
                            )}
                        </CardHeader>
                        <CardContent>
                            <Tabs
                                value={tab}
                                className="w-full"
                                onValueChange={(value) =>
                                    switchTab(Tab[value as keyof typeof Tab])
                                }
                            >
                                <SubjectView.Tabs />
                                {subjectViewModal.isOpen ? (
                                    <ScrollArea type="scroll" tw="max-h-[75vh]">
                                        <SubjectView.Box
                                            sub={sub}
                                            tab={tab}
                                            branch={branch}
                                            course={course}
                                            semester={semester}
                                            subject={subject}
                                        />
                                    </ScrollArea>
                                ) : (
                                    <SubjectView.Box
                                        sub={sub}
                                        tab={tab}
                                        branch={branch}
                                        course={course}
                                        semester={semester}
                                        subject={subject}
                                    />
                                )}
                            </Tabs>
                        </CardContent>
                    </Card>
                    {!isModal && (
                        <Card className="col-span-3 row-start-3 h-fit shadow-2xl lg:col-span-1 lg:row-start-auto">
                            <CardHeader>
                                <CardTitle>Subject Details</CardTitle>
                            </CardHeader>
                            <SubjectView.Details sub={sub} />
                        </Card>
                    )}
                </>
            )}
        </>
    );
};

SubjectView.Tabs = function SubjectViewTabs() {
    return (
        <TabsList className="grid h-fit w-full grid-cols-3 sm:grid-cols-6">
            <TabsTrigger value={Tab.THEORY}>Theory</TabsTrigger>
            <TabsTrigger value={Tab.LAB}>Lab</TabsTrigger>
            <TabsTrigger value={Tab.NOTES}>Notes</TabsTrigger>
            <TabsTrigger value={Tab.PYQ}>PYQs</TabsTrigger>
            <TabsTrigger value={Tab.BOOKS}>Books</TabsTrigger>
            <TabsTrigger value={Tab.FILES}>Practicals</TabsTrigger>
        </TabsList>
    );
};

SubjectView.Box = function SubjectViewBox({
    sub,
    tab,
    branch,
    course,
    semester,
    subject,
}: {
    sub: any;
    tab: Tab;
    course: string;
    semester: string | null;
    branch: string | null;
    subject: string | null;
}) {
    return (
        <>
            <Syllabus theory={sub[0].theory || sub[0].units} lab={sub[0].lab} />
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
                    course={course}
                    semester={semester}
                    branch={branch}
                    subject={subject}
                />
            ) : null}
        </>
    );
};

SubjectView.Details = function SubjectViewDetails({ sub }: { sub: any }) {
    function DetailItem({ label, value }: { label: string; value: string }) {
        return (
            <div className="flex flex-wrap items-center justify-between rounded-md bg-background p-2">
                <p className="font-semibold">{label}</p>
                <p>
                    {typeof value === "string" && value.includes("/")
                        ? value.split("/").join(" / ")
                        : value}
                </p>
            </div>
        );
    }

    return (
        <CardContent className="">
            <div className="flex flex-col gap-1.5 rounded-md bg-accent p-1 shadow-md">
                {sub[0].theorypapercode ? (
                    <DetailItem
                        label="Theory Code"
                        value={sub[0].theorypapercode}
                    />
                ) : null}
                {sub[0].theorycredits ? (
                    <DetailItem
                        label="Theory Credits"
                        value={sub[0].theorycredits}
                    />
                ) : null}
                {sub[0].labpapercode ? (
                    <DetailItem label="Lab Code" value={sub[0].labpapercode} />
                ) : null}
                {sub[0].labcredits ? (
                    <DetailItem label="Lab Credits" value={sub[0].labcredits} />
                ) : null}
                {sub[0].coursecategory ? (
                    <DetailItem
                        label="Course Category"
                        value={sub[0].coursecategory}
                    />
                ) : null}
            </div>
        </CardContent>
    );
};

SubjectView.Skeleton = function SubjectViewSkeleton({
    isModal,
}: {
    isModal?: boolean;
}) {
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
            {!isModal && (
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
            )}
        </>
    );
};

SubjectView.Error = function SubjectViewError({
    error,
}: {
    error: Error | null;
}) {
    return (
        <Card className="col-span-3 h-fit shadow-2xl">
            <CardHeader>
                <CardTitle>Temporary Glitch in the Matrix</CardTitle>
                <CardDescription>
                    {error?.message
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

export default SubjectView;
