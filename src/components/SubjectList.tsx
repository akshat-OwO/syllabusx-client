"use client";

import { Courses } from "@/config";
import _ from "lodash";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useSubjectList } from "@/hooks/use-subject-list";
import { Button } from "./ui/button";
import { ChevronsRight } from "lucide-react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import SubjectListHistory from "./SubjectListHistory";
import SubjectListModal from "./modals/subject-list-modal";

interface SubjectListProps {
    course: Courses;
    list: string[];
}

const SubjectList = ({ course, list }: SubjectListProps) => {
    const subjectList = useSubjectList();
    const params = useParams<{ slug: string[] }>();

    useEffect(() => {
        if (course === Courses.BTECH && !params.slug[2]) {
            subjectList.onOpen(list);
        }
        if (course === Courses.BCA && !params.slug[1]) {
            subjectList.onOpen(list);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course, params]);

    return (
        <>
            {list && (
                <Card className="col-span-3 shadow-2xl lg:col-span-2">
                    <CardHeader className="pb-4">
                        <CardTitle>Subjects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-muted-foreground">Choose your subject</p>
                                <Button
                                    onClick={() => subjectList.onOpen(list)}
                                    variant="outline"
                                    className={cn("group justify-between", {
                                        "animate-pulse bg-secondary":
                                            (course === Courses.BTECH && !params.slug[2]) ||
                                            (course === Courses.BCA && !params.slug[1]),
                                    })}
                                >
                                    <div className="flex-1 relative max-w-[calc(90%)] sm:max-w-full text-start">
                                        <div className="overflow-hidden whitespace-nowrap">
                                            <span className="">
                                                {course === Courses.BTECH &&
                                                    (params.slug[2] ? params.slug[2] : "Select Subject")}
                                                {course === Courses.BCA &&
                                                    (params.slug[1] ? params.slug[1] : "Select Subject")}
                                            </span>
                                        </div>
                                        <div className="pointer-events-none absolute right-0 top-0 h-full sm:hidden w-12 bg-gradient-to-l from-background to-transparent group-hover:from-secondary transition-colors" />
                                    </div>
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <SubjectListHistory />
                        </div>
                    </CardContent>
                </Card>
            )}
            <SubjectListModal />
        </>
    );
};

export default SubjectList;
