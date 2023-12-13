"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { buttonVariants } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

interface BtechSearchStepCardProps {}

const BtechSearchStepCard: FC<BtechSearchStepCardProps> = ({}) => {
    const searchParams = useSearchParams();

    const semester = searchParams.get("semester");
    const branch = searchParams.get("branch");

    if (semester && branch) {
        return <></>;
    }

    return (
        <Card className="col-span-3 shadow-2xl lg:col-span-2">
            <CardHeader>
                <CardTitle>Simplified Subject Search</CardTitle>
                <CardDescription>
                    Effortlessly explore subjects in just three easy steps.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid items-center gap-5 sm:grid-cols-3">
                    <div
                        className={cn(
                            buttonVariants({
                                variant: "secondary",
                                className:
                                    "prose prose-neutral h-full flex-col items-start gap-2 dark:prose-invert",
                            })
                        )}
                    >
                        <h4>Step 1</h4>
                        <p>Enter your Semester.</p>
                    </div>
                    <div
                        className={cn(
                            buttonVariants({
                                variant: "secondary",
                                className:
                                    "prose prose-neutral h-full flex-col items-start gap-2 dark:prose-invert",
                            })
                        )}
                    >
                        <h4>Step 2</h4>
                        <p>Enter your Branch.</p>
                    </div>
                    <div
                        className={cn(
                            buttonVariants({
                                variant: "secondary",
                                className:
                                    "prose prose-neutral h-full flex-col items-start gap-2 dark:prose-invert",
                            })
                        )}
                    >
                        <h4>Step 3</h4>
                        <p>There is no Step 3.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BtechSearchStepCard;
