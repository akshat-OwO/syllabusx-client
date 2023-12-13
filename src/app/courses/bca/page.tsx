import BcaSearchStepCard from "@/components/BcaSearchStepCard";
import BcaSubjectList from "@/components/BcaSubjectList";
import BcaSubjectView from "@/components/BcaSubjectView";
import SearchCard from "@/components/SearchCard";
import SearchInput from "@/components/SearchInput";
import { bcaSemesterList } from "@/config";
import LayoutWrapper from "@/layouts/LayoutWrapper";
import _ from "lodash";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";

type Props = {
    searchParams: { semester: string; subject: string };
};

export async function generateMetadata({
    searchParams,
}: Props): Promise<Metadata> {
    const semester = searchParams.semester;
    const subject = searchParams.subject;

    if (semester && !subject) {
        return {
            title: {
                default: `BCA | ${semester}`,
                template: `SyllabusX | %s`,
            },
            description:
                "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
            openGraph: {
                title: `BCA | ${semester}`,
                description:
                    "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
                url: "https://syllabusx.live",
                siteName: "SyllabusX",
                locale: "en_US",
                type: "website",
            },
            twitter: {
                title: `BCA | ${semester}`,
                description:
                    "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
                card: "summary_large_image",
                site: "https://syllabusx.live",
            },
        };
    }

    if (!semester && subject) {
        return {
            title: {
                default: `BCA | ${_.startCase(_.toLower(subject))}`,
                template: `SyllabusX | %s`,
            },
            description:
                "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
            openGraph: {
                title: `BCA | ${_.startCase(_.toLower(subject))}`,
                description:
                    "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
                url: "https://syllabusx.live",
                siteName: "SyllabusX",
                locale: "en_US",
                type: "website",
            },
            twitter: {
                title: `BCA | ${_.startCase(_.toLower(subject))}`,
                description:
                    "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
                card: "summary_large_image",
                site: "https://syllabusx.live",
            },
        };
    }

    if (!semester && !subject) {
        return {
            title: {
                default: `BCA`,
                template: `SyllabusX | %s`,
            },
            description:
                "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
            openGraph: {
                title: `BCA`,
                description:
                    "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
                url: "https://syllabusx.live",
                siteName: "SyllabusX",
                locale: "en_US",
                type: "website",
            },
            twitter: {
                title: `BCA`,
                description:
                    "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
                card: "summary_large_image",
                site: "https://syllabusx.live",
            },
        };
    }

    return {
        title: {
            default: `BCA | ${semester} | ${_.startCase(_.toLower(subject))}`,
            template: `SyllabusX | %s`,
        },
        description:
            "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
        openGraph: {
            title: `BCA | ${semester} | ${_.startCase(_.toLower(subject))}`,
            description:
                "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
            url: "https://syllabusx.live",
            siteName: "SyllabusX",
            locale: "en_US",
            type: "website",
        },
        twitter: {
            title: `BCA | ${semester} | ${_.startCase(_.toLower(subject))}`,
            description:
                "Explore the world of Bachelor of Computer Applications (BCA) at SyllabusX. Dive deep into the detailed syllabi and study materials tailored for BCA students at Guru Gobind Singh Indraprastha University (GGSIPU)",
            card: "summary_large_image",
            site: "https://syllabusx.live",
        },
    };
}

interface pageProps {
    searchParams: {
        semester: string | null;
        subject: string | null;
    };
}

const page: FC<pageProps> = ({ searchParams }) => {
    if (
        searchParams.semester &&
        !bcaSemesterList.some((s) => searchParams.semester === s.label)
    )
        notFound();

    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-20">
            <div className="grid grid-cols-3 gap-10">
                <SearchCard
                    title="BCA"
                    description="The degree that turns caffeine into code."
                >
                    <SearchInput
                        label="semester"
                        searchList={bcaSemesterList}
                    />
                </SearchCard>
                <BcaSearchStepCard />
                {searchParams.semester ? <BcaSubjectList /> : null}
                {searchParams.semester && searchParams.subject ? (
                    <BcaSubjectView />
                ) : null}
            </div>
        </LayoutWrapper>
    );
};

export default page;
