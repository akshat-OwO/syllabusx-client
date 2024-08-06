"use client";

import { cn } from "@/lib/utils";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import _ from "lodash";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const SubjectListHistory = () => {
    const [subjectHistory, setSubjectHistory] = useLocalStorage<string[]>({
        key: "subject-history",
        defaultValue: [],
    });

    const handleHistory = (path: string) => {
        setSubjectHistory((prev) => {
            let history: string[] = [];
            if (prev.includes(path)) {
                prev.splice(prev.indexOf(path), 1);
            }
            history = [path, ...prev];
            if (history.length > 7) {
                history.pop();
            }
            return history;
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-muted-foreground">
                Subject history
            </p>
            <div className="flex">
                <ScrollArea className="w-96 flex-1">
                    <div className="flex items-center gap-4 p-1">
                        {subjectHistory.length === 0 && (
                            <p className="inline-flex h-9 flex-1 items-center justify-center rounded border border-input px-3 text-center text-sm">
                                Browse subjects to accumulate history
                            </p>
                        )}
                        {subjectHistory.map((subject) => (
                            <Link
                                href={subject}
                                key={subject}
                                className={cn(
                                    buttonVariants({
                                        variant: "outline",
                                        size: "sm",
                                        className:
                                            "min-w-[12rem] max-w-[16rem] whitespace-normal text-center",
                                    })
                                )}
                                onClick={() => handleHistory(subject)}
                            >
                                <span className="line-clamp-1 flex-1 text-ellipsis">
                                    {_.startCase(subject.split("/").pop())
                                        .split("-")
                                        .join(" ")}
                                </span>
                            </Link>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    );
};

export default SubjectListHistory;
