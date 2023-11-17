import BtechCard from '@/components/BtechCard';
import BtechSearchStepCard from '@/components/BtechSearchStepCard';
import BtechSubjectList from '@/components/BtechSubjectList';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import { Metadata } from 'next';
import { FC } from 'react';

type Props = {
    searchParams: { semester: string; branch: string };
};

export async function generateMetadata({
    searchParams,
}: Props): Promise<Metadata> {
    const semester = searchParams.semester;
    const branch = searchParams.branch;

    if (!semester && branch) {
        return {
            title: {
                default: `BTECH | ${branch}`,
                template: `SyllabusX | %s`,
            },
        };
    }

    if (semester && !branch) {
        return {
            title: {
                default: `BTECH | ${semester}`,
                template: `SyllabusX | %s`,
            },
        };
    }

    if (!semester && !branch) {
        return {
            title: {
                default: `BTECH`,
                template: `SyllabusX | %s`,
            },
        };
    }

    return {
        title: {
            default: `BTECH | ${semester} | ${branch}`,
            template: `SyllabusX | %s`,
        },
    };
}

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-8.5rem)]">
            <div className="grid grid-cols-3 gap-10">
                <BtechCard />
                <BtechSearchStepCard />
                <BtechSubjectList />
            </div>
        </LayoutWrapper>
    );
};

export default page;
