import LayoutWrapper from "@/layouts/LayoutWrapper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Icons } from "./Icons";
import { badgeVariants } from "./ui/badge";
import { buttonVariants } from "./ui/button";

interface HeroProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any;
    releaseTag: string;
    releaseUrl: string;
}

const Hero: FC<HeroProps> = ({ content, releaseTag, releaseUrl }) => {
    return (
        <div className="radial-top w-full">
            <LayoutWrapper className="flex flex-col items-center justify-center gap-10 p-10">
                <div className="flex flex-col gap-5">
                    <Icons.x className="h-20" />
                    <a
                        target="_blank"
                        href={releaseUrl}
                        className={cn(badgeVariants({ variant: "default" }))}
                    >
                        Version {releaseTag.slice(1)}
                    </a>
                </div>
                <div className="flex flex-col items-center gap-y-2">
                    <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                        <h1 className="text-center">
                            <span className="text-highlight">SyllabusX</span> is
                            Your academic GPS. Navigate studies effortlessly.
                        </h1>
                    </div>
                    <div className="prose prose-sm prose-neutral dark:prose-invert">
                        <p className="text-center">
                            Embark on a journey of simplified education.
                            Navigating through syllabi, study materials, and
                            course essentials has never been this effortless.
                        </p>
                    </div>
                </div>
                <Link
                    href="/courses"
                    className={cn(
                        buttonVariants({
                            variant: "default",
                            className: "z-10",
                        })
                    )}
                >
                    Browse Courses
                </Link>
                <div className="relative h-full w-full self-center">
                    <div className="conic-center absolute h-full w-full" />
                    <div className="z-10 hidden aspect-video w-full rounded-md bg-accent/20 p-2 shadow-2xl dark:block">
                        <Image
                            src={
                                content
                                    ? "https:" +
                                      content.heroImage.fields.file.url
                                    : "/placeholder.png"
                            }
                            alt="Hero Image"
                            fill
                            quality={100}
                            className="rounded-md p-2"
                        />
                    </div>
                    <div className="z-10 aspect-video w-full rounded-md bg-accent/20 p-2 shadow-2xl dark:hidden">
                        <Image
                            src={
                                content
                                    ? "https:" +
                                      content.heroImageLight.fields.file.url
                                    : "/placeholder.png"
                            }
                            alt="Hero Image Light"
                            fill
                            quality={100}
                            className="rounded-md p-2"
                        />
                    </div>
                </div>
            </LayoutWrapper>
        </div>
    );
};

export default Hero;
