import _ from 'lodash';
import { Metadata, ResolvingMetadata } from 'next';
import { FC, ReactNode } from 'react';

interface LayoutProps {
children: ReactNode
}

type Props = {
    params: { semester: string; branch: string; subject: string };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const semester = params.semester;
    const branch = params.branch;
    const subject = params.subject;

    return {
        title: `${semester} | ${branch} | ${_.startCase(_.toLower(subject))}`,
    };
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <>{ children }</>
}

export default Layout