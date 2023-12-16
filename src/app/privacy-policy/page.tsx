import LayoutWrapper from "@/layouts/LayoutWrapper";
import { getPolicy } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Metadata } from "next";
import { FC } from "react";

export const revalidate = 86400;

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Navigate SyllabusX with confidence. Our Privacy Policy outlines how we safeguard your information. Explore the terms guiding the collection and use of personal and non-personal data on our open-source platform. Trust SyllabusX for a transparent and secure academic journey.",
    openGraph: {
        title: "SyllabusX | Privacy Policy",
        description:
            "Navigate SyllabusX with confidence. Our Privacy Policy outlines how we safeguard your information. Explore the terms guiding the collection and use of personal and non-personal data on our open-source platform. Trust SyllabusX for a transparent and secure academic journey.",
        url: "https://syllabusx.live",
        siteName: "SyllabusX",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "SyllabusX | Privacy Policy",
        description:
            "Navigate SyllabusX with confidence. Our Privacy Policy outlines how we safeguard your information. Explore the terms guiding the collection and use of personal and non-personal data on our open-source platform. Trust SyllabusX for a transparent and secure academic journey.",
        card: "summary_large_image",
        site: "https://syllabusx.live",
    },
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    const content: any = await getPolicy();

    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-20">
            <div className="flex flex-col items-center gap-y-2">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Privacy{" "}
                        <span className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 bg-clip-text text-transparent">
                            Policy
                        </span>
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
                {content
                    ? documentToReactComponents(content.fields.privacy)
                    : null}
            </div>
        </LayoutWrapper>
    );
};

export default page;
