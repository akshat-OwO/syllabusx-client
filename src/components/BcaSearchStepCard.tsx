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

interface BcaSearchStepCardProps {}

const BcaSearchStepCard: FC<BcaSearchStepCardProps> = ({}) => {
    const searchParams = useSearchParams();

    const semester = searchParams.get("semester");

    if (semester) {
        return <></>;
    }

    return (
        <Card className="col-span-3 shadow-2xl lg:col-span-2">
            <CardHeader>
                <CardTitle>Simplified Subject Search</CardTitle>
                <CardDescription>
                    Effortlessly explore subjects in just two easy steps.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid items-center gap-5 sm:grid-cols-2">
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
                        <p>There is no Step 2.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BcaSearchStepCard;
