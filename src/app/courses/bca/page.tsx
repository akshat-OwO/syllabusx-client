import BcaCard from '@/components/BcaCard';
import BcaSearchStepCard from '@/components/BcaSearchStepCard';
import BcaSubjectList from '@/components/BcaSubjectList';
import BcaSubjectView from '@/components/BcaSubjectView';
import { bcaSemesterList } from '@/config';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import _ from 'lodash';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

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
        };
    }

    if (!semester && subject) {
        return {
            title: {
                default: `BCA | ${_.startCase(_.toLower(subject))}`,
                template: `SyllabusX | %s`,
            },
        };
    }

    if (!semester && !subject) {
        return {
            title: {
                default: `BCA`,
                template: `SyllabusX | %s`,
            },
        };
    }

    return {
        title: {
            default: `BCA | ${semester} | ${_.startCase(_.toLower(subject))}`,
            template: `SyllabusX | %s`,
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
        <LayoutWrapper className="py-20 min-h-[calc(100vh-7rem)]">
            <div className="grid grid-cols-3 gap-10">
                <BcaCard />
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
