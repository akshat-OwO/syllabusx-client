import LayoutWrapper from "@/layouts/LayoutWrapper";
import { getTAndC } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Metadata } from "next";
import { FC } from "react";

export const revalidate = 86400;

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description:
        "Understand the guidelines shaping your academic journey at SyllabusX. Explore our Terms and Conditions, covering acceptance, the nature of our non-profit, open-source project, user responsibilities, intellectual property, privacy policies, and more.",
    openGraph: {
        title: "SyllabusX | Terms & Conditions",
        description:
            "Understand the guidelines shaping your academic journey at SyllabusX. Explore our Terms and Conditions, covering acceptance, the nature of our non-profit, open-source project, user responsibilities, intellectual property, privacy policies, and more.",
        url: "https://syllabusx.live",
        siteName: "SyllabusX",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "SyllabusX | Terms & Conditions",
        description:
            "Understand the guidelines shaping your academic journey at SyllabusX. Explore our Terms and Conditions, covering acceptance, the nature of our non-profit, open-source project, user responsibilities, intellectual property, privacy policies, and more.",
        card: "summary_large_image",
        site: "https://syllabusx.live",
    },
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    const content: any = await getTAndC();

    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-20">
            <div className="flex flex-col items-center gap-y-2">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Terms &{" "}
                        <span className="text-highlight">Conditions</span>
                    </h1>
                </div>
            </div>
            <div className="prose prose-neutral mx-auto py-10 dark:prose-invert">
                <h5>
                    Last Updated:{" "}
                    {content
                        ? new Date(content.sys.updatedAt).toLocaleDateString()
                        : "DD-MM-YYYY"}
                </h5>
                {content ? documentToReactComponents(content.fields.tc) : null}
            </div>
        </LayoutWrapper>
    );
};

export default page;
