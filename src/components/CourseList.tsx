import LayoutWrapper from "@/layouts/LayoutWrapper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";

interface CourseListProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
}

const CourseList: FC<CourseListProps> = ({ content }) => {
    return (
        <LayoutWrapper className="overflow-hidden py-20">
            <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
                <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-start">
                    <div className="prose prose-neutral dark:prose-invert">
                        <h2>Unleash Your Academic Odyssey</h2>
                        <p>Charting a course for every IPU program.</p>
                    </div>
                    <div className="relative hidden aspect-square h-72 rounded-md dark:md:block">
                        <Image
                            src={
                                content
                                    ? "https:" +
                                      content.unleashOdyssey.fields.file.url
                                    : "/placeholder-square.png"
                            }
                            alt="Unleash Odyssey"
                            fill
                            className="rounded-md"
                        />
                    </div>
                    <div className="relative hidden aspect-square h-72 rounded-md dark:hidden md:block">
                        <Image
                            src={
                                content
                                    ? "https:" +
                                      content.unleashOdyssey.fields.file.url
                                    : "/placeholder-square-light.png"
                            }
                            alt="Unleash Odyssey"
                            fill
                            className="rounded-md"
                        />
                    </div>
                </div>
                <div className="grid h-48 w-full grid-cols-2 gap-2 lg:h-auto lg:w-1/2">
                    <Link
                        href="/courses/btech"
                        className={cn(
                            buttonVariants({
                                variant: "secondary",
                                className: "h-full w-full shadow-2xl",
                            })
                        )}
                    >
                        B.Tech
                    </Link>
                    <Link
                        href="/courses/bca"
                        className={cn(
                            buttonVariants({
                                variant: "secondary",
                                className:
                                    "row-start-2 h-full w-full shadow-2xl",
                            })
                        )}
                    >
                        BCA
                    </Link>
                    <div
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                className:
                                    "hover:text-foreground, pointer-events-none col-start-2 row-span-2 h-full w-full shadow-2xl hover:bg-background",
                            })
                        )}
                    >
                        Coming Soon...
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default CourseList;
