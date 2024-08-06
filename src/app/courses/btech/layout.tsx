import ClientSearchCard from "@/components/ClientSearchCard";
import { branchList, semesterList } from "@/config";
import LayoutWrapper from "@/layouts/LayoutWrapper";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Btech",
        template: "SyllabusX | Btech | %s",
    },
    description:
        "Browse subjects for BTech courses at GGSIPU on SyllabusX – the ultimate hub for syllabi and study materials",
    openGraph: {
        title: "SyllabusX | Btech",
        description:
            "Browse subjects for BTech courses at GGSIPU on SyllabusX – the ultimate hub for syllabi and study materials",
        url: "https://syllabusx.live/courses/btech",
        siteName: "SyllabusX",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "SyllabusX | Btech",
        description:
            "Browse subjects for BTech courses at GGSIPU on SyllabusX – the ultimate hub for syllabi and study materials",
        card: "summary_large_image",
        site: "https://syllabusx.live/courses/btech",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-20">
            <div className="grid grid-cols-3 gap-10">
                <ClientSearchCard
                    title="Btech"
                    description="Who needs sleep when you can engineer dreams?"
                    semesterList={semesterList}
                    branchList={branchList}
                />
                {children}
            </div>
        </LayoutWrapper>
    );
}
