import _ from "lodash";
import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { compress, compressToEncodedURIComponent } from "lz-string";
import { TMockSchema } from "./schemas";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function constructMetadata(): Metadata {
    return {
        metadataBase: new URL("https://syllabusx.live"),
        manifest: "../manifest.json",

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

export function getRemainingTime(futureTimestamp: number): string {
    const now = Date.now();
    const diffMs = futureTimestamp - now;
    const diffSeconds = Math.floor(diffMs / 1000);

    const intervals = [
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    const result = _.chain(intervals)
        .reduce((acc, interval) => {
            const count = Math.floor(diffSeconds / interval.seconds);
            if (count > 0) {
                acc.push(`${count} ${interval.label}${count !== 1 ? "s" : ""}`);
            }
            return acc;
        }, [] as string[])
        .thru((parts) => {
            if (parts.length === 0) return "less than a minute";
            return _.take(parts, 2).join(" ");
        })
        .value();

    return result;
}

export function generatePDFUrl(data: TMockSchema, baseUrl: string): string {
    const compressedData = compressToEncodedURIComponent(
        compress(JSON.stringify(data))
    );
    return `${baseUrl}/api/generate-pdf?data=${compressedData}`;
}
