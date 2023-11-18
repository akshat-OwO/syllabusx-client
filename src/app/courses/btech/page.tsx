import BtechCard from '@/components/BtechCard';
import BtechSearchStepCard from '@/components/BtechSearchStepCard';
import BtechSubjectList from '@/components/BtechSubjectList';
import BtechSubjectView from '@/components/BtechSubjectView';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import _ from 'lodash';
import { Metadata } from 'next';
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
                default: `BTech | ${branch}`,
                template: `SyllabusX | %s`,
            },
        };
    }

    if (semester && !branch && !subject) {
        return {
            title: {
                default: `BTech | ${semester}`,
                template: `SyllabusX | %s`,
            },
        };
    }

    if (!semester && !branch && subject) {
        return {
            title: {
                default: `BTech | ${_.startCase(_.toLower(subject))}`,
                template: `SyllabusX | %s`,
            },
        };
    }

    if (!semester && !branch && !subject) {
        return {
            title: {
                default: `BTech`,
                template: `SyllabusX | %s`,
            },
        };
    }

    return {
        title: {
            default: `BTech | ${semester} | ${branch} | ${_.startCase(
                _.toLower(subject)
            )}`,
            template: `SyllabusX | %s`,
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
    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-8.5rem)]">
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
