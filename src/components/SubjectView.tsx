"use client";

import { Courses, Tab } from "@/config";
import { useSubjectView } from "@/hooks/use-subject-view";
import { cn } from "@/lib/utils";
import { Expand } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import StudyMaterial from "./StudyMaterial";
import Syllabus from "./Syllabus";
import AccessibleToolTip from "./ui/accessible-tooltip";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { SubjectDetail } from "@/lib/server";

interface SubjectViewProps {
    course: Courses;
    subjectDetail: SubjectDetail;
    isModal?: boolean;
}

const SubjectView = ({ course, isModal, subjectDetail }: SubjectViewProps) => {
    const params = useParams<{ slug: string[] }>();
    const [tab, setTab] = useState<Tab>(Tab.THEORY);

    const subjectViewModal = useSubjectView();

    const semester = params.slug[0];
    const branch = params.slug[1];
    const subject = params.slug[2];

    const switchTab = (value: Tab) => {
        setTab(value);
    };

    return (
        <>
            <Card
                className={cn("col-span-3 h-fit shadow-2xl lg:col-span-2", {
                    "border-0": subjectViewModal.isOpen,
                })}
            >
                <CardHeader
                    className={cn("flex-row items-center justify-between", {
                        "md:py-3": !subjectViewModal.isOpen,
                    })}
                >
                    <CardTitle>{subjectDetail.subject}</CardTitle>
                    {!subjectViewModal.isOpen && (
                        <AccessibleToolTip label="Modal view">
                            <Button
                                onClick={() => subjectViewModal.onOpen(course)}
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
                                    sub={subjectDetail}
                                    tab={tab}
                                    branch={branch}
                                    course={course}
                                    semester={semester}
                                    subject={subject}
                                />
                            </ScrollArea>
                        ) : (
                            <SubjectView.Box
                                sub={subjectDetail}
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
                    <SubjectView.Details sub={subjectDetail} />
                </Card>
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
    sub: SubjectDetail;
    tab: Tab;
    course: Courses;
    semester: string | null;
    branch: string | null;
    subject: string | null;
}) {
    return (
        <>
            <Syllabus
                theory={sub.theory || sub.units || []}
                lab={sub.lab || []}
            />
            {tab === Tab.NOTES ||
            tab === Tab.BOOKS ||
            tab === Tab.PYQ ||
            tab === Tab.FILES ? (
                <StudyMaterial
                    tab={tab}
                    note={sub.camel ?? ""}
                    pyq={sub.pYq ?? ""}
                    book={sub.book ?? ""}
                    practical={sub.practical ?? ""}
                    course={course}
                    semester={semester}
                    branch={branch}
                    subject={subject}
                />
            ) : null}
        </>
    );
};

SubjectView.Details = function SubjectViewDetails({
    sub,
}: {
    sub: SubjectDetail;
}) {
    function DetailItem({ label, value }: { label: string; value: string }) {
        return (
            <div className="flex flex-wrap items-center justify-between rounded-md bg-background p-2">
                <p className="font-semibold">{label}</p>
                <p>
                    {typeof value === "string" && value.includes("/")
                        ? value.split("/").map((s) => s.trim()).join(" / ")
                        : value}
                </p>
            </div>
        );
    }

    return (
        <CardContent className="">
            <div className="flex flex-col gap-1.5 rounded-md bg-accent p-1 shadow-md">
                {sub.theorypapercode ? (
                    <DetailItem
                        label="Theory Code"
                        value={sub.theorypapercode}
                    />
                ) : null}
                {sub.theorycredits ? (
                    <DetailItem
                        label="Theory Credits"
                        value={sub.theorycredits.toString()}
                    />
                ) : null}
                {sub.labpapercode ? (
                    <DetailItem label="Lab Code" value={sub.labpapercode} />
                ) : null}
                {sub.labcredits ? (
                    <DetailItem
                        label="Lab Credits"
                        value={sub.labcredits.toString()}
                    />
                ) : null}
                {sub.coursecategory ? (
                    <DetailItem
                        label="Course Category"
                        value={sub.coursecategory}
                    />
                ) : null}
            </div>
        </CardContent>
    );
};

export default SubjectView;
