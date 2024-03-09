import { buttonVariants } from "@/components/ui/button";
import LayoutWrapper from "@/layouts/LayoutWrapper";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
    title: "Courses",
    description:
        "Unleash your academic odyssey with SyllabusX's Courses page, charting a course for every program at Guru Gobind Singh Indraprastha University (GGSIPU). Explore detailed syllabi and study materials for B.Tech, USICT B.Tech, BCA, and stay tuned for more exciting programs on the horizon. Your academic journey begins here.",
    openGraph: {
        title: "SyllabusX | Courses",
        description:
            "Unleash your academic odyssey with SyllabusX's Courses page, charting a course for every program at Guru Gobind Singh Indraprastha University (GGSIPU). Explore detailed syllabi and study materials for B.Tech, USICT B.Tech, BCA, and stay tuned for more exciting programs on the horizon. Your academic journey begins here.",
        url: "https://syllabusx.live",
        siteName: "SyllabusX",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "SyllabusX | Courses",
        description:
            "Unleash your academic odyssey with SyllabusX's Courses page, charting a course for every program at Guru Gobind Singh Indraprastha University (GGSIPU). Explore detailed syllabi and study materials for B.Tech, USICT B.Tech, BCA, and stay tuned for more exciting programs on the horizon. Your academic journey begins here.",
        card: "summary_large_image",
        site: "https://syllabusx.live",
    },
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-20">
            <div className="flex flex-col items-center gap-y-2">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Unleash Your Academic{" "}
                        <span className="text-highlight">Odyssey</span>
                    </h1>
                </div>
                <div className="prose prose-sm prose-neutral dark:prose-invert">
                    <p className="text-center">
                        Charting a course for every IPU program.
                    </p>
                </div>
            </div>
            <div className="mx-auto grid aspect-video w-full grid-cols-2 gap-2 py-20 lg:w-3/5">
                <a
                    href="/courses/btech"
                    className={cn(
                        buttonVariants({
                            variant: "secondary",
                            className: "h-full w-full shadow-2xl",
                        })
                    )}
                >
                    B.Tech
                </a>
                <a
                    href="/courses/bca"
                    className={cn(
                        buttonVariants({
                            variant: "secondary",
                            className: "row-start-2 h-full w-full shadow-2xl",
                        })
                    )}
                >
                    BCA
                </a>
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
        </LayoutWrapper>
    );
};

export default page;
