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
    }, [course, params, subjectList, list]);

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
                                <p className="text-sm font-semibold text-muted-foreground">
                                    Choose your subject
                                </p>
                                <Button
                                    onClick={() => subjectList.onOpen(list)}
                                    variant="outline"
                                    className={cn("justify-between", {
                                        "animate-pulse bg-secondary":
                                            (course === Courses.BTECH &&
                                                !params.slug[2]) ||
                                            (course === Courses.BCA &&
                                                !params.slug[1]),
                                    })}
                                >
                                    {course === Courses.BTECH &&
                                        (params.slug[2]
                                            ? params.slug[2]
                                            : "Select Subject")}
                                    {course === Courses.BCA &&
                                        (params.slug[1]
                                            ? params.slug[1]
                                            : "Select Subject")}
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default SubjectList;
