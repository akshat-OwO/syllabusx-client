import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function constructMetadata(): Metadata {
    return {
        metadataBase: new URL("https://syllabusx.live"),
        title: {
            default: "SyllabusX",
            template: "SyllabusX | %s",
        },
        description:
            "Embark on a streamlined academic journey with SyllabusX – the ultimate hub for GGSIPU syllabi and study materials.",
        applicationName: "SyllabusX",
        keywords: [
            "SyllabusX",
            "syllabus x",
            "Syllabus",
            "IPU Syllabus",
            "IPU",
            "BTech",
            "BCA",
            "Notes",
            "PYQs",
            "Akash",
            "Practicals IPU",
        ],
        openGraph: {
            title: "SyllabusX",
            description:
                "Embark on a streamlined academic journey with SyllabusX – the ultimate hub for GGSIPU syllabi and study materials.",
            url: "https://syllabusx.live",
            siteName: "SyllabusX",
            locale: "en_US",
            type: "website",
        },
        twitter: {
            title: "SyllabusX",
            description:
                "Embark on a streamlined academic journey with SyllabusX – the ultimate hub for GGSIPU syllabi and study materials.",
            card: "summary_large_image",
            site: "https://syllabusx.live",
        },
    };
}
