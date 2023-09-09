import SubjectsLayout from '@/layouts/SubjectsLayout';
import _ from 'lodash';
import { Metadata, ResolvingMetadata } from 'next';
import { FC, ReactNode } from 'react';

type Props = {
    params: { semester: string; branch: string };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const semester = params.semester;
    const branch = params.branch;

    return {
        title: {
            default: `${semester} | ${branch}`,
            template: `SyllabusX | %s`,
        },
    };
}

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <SubjectsLayout>{children}</SubjectsLayout>;
};

export default Layout;
