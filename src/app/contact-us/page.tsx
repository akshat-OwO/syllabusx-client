import { FeedbackFormTrigger } from "@/components/FeedbackForm";
import { buttonVariants } from "@/components/ui/button";
import LayoutWrapper from "@/layouts/LayoutWrapper";
import { cn } from "@/lib/utils";
import { Instagram, Mail } from "lucide-react";
import { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Let's connect! Have questions, suggestions, or just want to say hello? Navigate to our Contact Us page – the portal to connect with the SyllabusX team. Your feedback fuels our commitment to simplifying student life. Give us your insights, and let's shape the future of academic navigation together.",
    openGraph: {
        title: "SyllabusX | Contact Us",
        description:
            "Let's connect! Have questions, suggestions, or just want to say hello? Navigate to our Contact Us page – the portal to connect with the SyllabusX team. Your feedback fuels our commitment to simplifying student life. Give us your insights, and let's shape the future of academic navigation together.",
        url: "https://syllabusx.live",
        siteName: "SyllabusX",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "SyllabusX | Contact Us",
        description:
            "Let's connect! Have questions, suggestions, or just want to say hello? Navigate to our Contact Us page – the portal to connect with the SyllabusX team. Your feedback fuels our commitment to simplifying student life. Give us your insights, and let's shape the future of academic navigation together.",
        card: "summary_large_image",
        site: "https://syllabusx.live",
    },
};

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-20">
            <div className="flex flex-col items-center gap-y-2">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Let&apos;s Connect: Reach Out to{" "}
                        <span className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 bg-clip-text text-transparent">
                            SyllabusX
                        </span>
                    </h1>
                </div>
                <div className="prose prose-sm prose-neutral dark:prose-invert">
                    <p className="text-center">
                        Have a question, suggestion, or just want to say hello?
                        Our Contact Us page is the portal to connect with the
                        SyllabusX team.
                    </p>
                </div>
            </div>
            <div className="grid items-center gap-5 py-10 md:grid-cols-2 md:justify-center">
                <div className="flex flex-col gap-5">
                    <a
                        href="https://www.instagram.com/syllabusx_.live/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ className: "gap-2" }))}
                    >
                        DM on Instagram <Instagram className="h-4 w-4" />
                    </a>
                    <a
                        href="mailto:iboard990@gmail.com"
                        target="_blank"
                        className={cn(buttonVariants({ className: "gap-2" }))}
                    >
                        Mail us <Mail className="h-4 w-4" />
                    </a>
                </div>
                <FeedbackFormTrigger />
            </div>
        </LayoutWrapper>
    );
};

export default Page;
