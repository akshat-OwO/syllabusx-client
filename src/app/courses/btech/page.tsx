import BtechCard from '@/components/BtechCard';
import BtechSearchStepCard from '@/components/BtechSearchStepCard';
import BtechSubjectList from '@/components/BtechSubjectList';
import BtechSubjectView from '@/components/BtechSubjectView';
import { branchList, semesterList } from '@/config';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import _ from 'lodash';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

type Props = {
    searchParams: { semester: string; branch: string; subject: string };
};

export async function generateMetadata({
    searchParams,
}: Props): Promise<Metadata> {
    const semester = searchParams.semester;
    const branch = searchParams.branch;
    const subject = searchParams.subject;

    if (!semester && branch && !subject) {
        return {
            title: {
                default: `B.Tech | ${branch}`,
                template: `SyllabusX | %s`,
            },
            description:
                "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
            openGraph: {
                title: `B.Tech | ${branch}`,
                description:
                    "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
                url: 'https://syllabusx.live',
                siteName: 'SyllabusX',
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                title: `B.Tech | ${branch}`,
                description:
                    "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
                card: 'summary_large_image',
                site: 'https://syllabusx.live',
            },
        };
    }

    if (semester && !branch && !subject) {
        return {
            title: {
                default: `B.Tech | ${semester}`,
                template: `SyllabusX | %s`,
            },
            description:
                "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
            openGraph: {
                title: `B.Tech | ${semester}`,
                description:
                    "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
                url: 'https://syllabusx.live',
                siteName: 'SyllabusX',
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                title: `B.Tech | ${semester}`,
                description:
                    "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
                card: 'summary_large_image',
                site: 'https://syllabusx.live',
            },
        };
    }

    if (semester && branch && !subject) {
        return {
            title: {
                default: `B.Tech | ${semester} | ${branch}`,
                template: `SyllabusX | %s`,
            },
            description:
                "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
            openGraph: {
                title: `B.Tech | ${semester} | ${branch}`,
                description:
                    "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
                url: 'https://syllabusx.live',
                siteName: 'SyllabusX',
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                title: `B.Tech | ${semester} | ${branch}`,
                description:
                    "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
                card: 'summary_large_image',
                site: 'https://syllabusx.live',
            },
        };
    }

    if (!semester && !branch && subject) {
        return {
            title: {
                default: `B.Tech | ${_.startCase(_.toLower(subject))}`,
                template: `SyllabusX | %s`,
            },
            description:
                "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
            openGraph: {
                title: `B.Tech | ${_.startCase(_.toLower(subject))}`,
                description:
                    "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
                url: 'https://syllabusx.live',
                siteName: 'SyllabusX',
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                title: `B.Tech | ${_.startCase(_.toLower(subject))}`,
                description:
                    "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
                card: 'summary_large_image',
                site: 'https://syllabusx.live',
            },
        };
    }

    if (!semester && !branch && !subject) {
        return {
            title: {
                default: `B.Tech`,
                template: `SyllabusX | %s`,
            },
            description:
                "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
            openGraph: {
                title: `B.Tech`,
                description:
                    "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
                url: 'https://syllabusx.live',
                siteName: 'SyllabusX',
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                title: `B.Tech`,
                description:
                    "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
                card: 'summary_large_image',
                site: 'https://syllabusx.live',
            },
        };
    }

    return {
        title: {
            default: `B.Tech | ${semester} | ${branch} | ${_.startCase(
                _.toLower(subject)
            )}`,
            template: `SyllabusX | %s`,
        },
        description:
            "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
        openGraph: {
            title: `B.Tech | ${semester} | ${branch} | ${_.startCase(
                _.toLower(subject)
            )}`,
            description:
                "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
            url: 'https://syllabusx.live',
            siteName: 'SyllabusX',
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            title: `B.Tech`,
            description:
                "Embark on a tech-centric academic voyage with SyllabusX's B.Tech page. Uncover a treasure trove of syllabi and study materials meticulously curated for Guru Gobind Singh Indraprastha University (GGSIPU) B.Tech programs.",
            card: 'summary_large_image',
            site: 'https://syllabusx.live',
        },
    };
}

interface pageProps {
    searchParams: {
        semester: string | null;
        branch: string | null;
        subject: string | null;
    };
}

const page: FC<pageProps> = ({ searchParams }) => {
    if (
        searchParams.semester &&
        !semesterList.some((s) => searchParams.semester === s.label)
    )
        notFound();
    if (
        searchParams.branch &&
        !branchList.some((b) => searchParams.branch === b.label)
    )
        notFound();

    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-7rem)]">
            <div className="grid grid-cols-3 gap-10">
                <BtechCard />
                <BtechSearchStepCard />
                {searchParams.semester && searchParams.branch ? (
                    <BtechSubjectList />
                ) : null}
                {searchParams.semester &&
                searchParams.branch &&
                searchParams.subject ? (
                    <BtechSubjectView />
                ) : null}
            </div>
        </LayoutWrapper>
    );
};

export default page;
