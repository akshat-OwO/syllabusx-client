import LayoutWrapper from '@/layouts/LayoutWrapper';
import { getTAndC } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Metadata } from 'next';
import { FC } from 'react';

export const revalidate = 86400;

export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description:
        'Understand the guidelines shaping your academic journey at SyllabusX. Explore our Terms and Conditions, covering acceptance, the nature of our non-profit, open-source project, user responsibilities, intellectual property, privacy policies, and more.',
    openGraph: {
        title: 'SyllabusX | Terms & Conditions',
        description:
            'Understand the guidelines shaping your academic journey at SyllabusX. Explore our Terms and Conditions, covering acceptance, the nature of our non-profit, open-source project, user responsibilities, intellectual property, privacy policies, and more.',
    },
    twitter: {
        title: 'SyllabusX | Terms & Conditions',
        description:
            'Understand the guidelines shaping your academic journey at SyllabusX. Explore our Terms and Conditions, covering acceptance, the nature of our non-profit, open-source project, user responsibilities, intellectual property, privacy policies, and more.',
    },
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    const content: any = await getTAndC();

    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-7rem)]">
            <div className="flex flex-col gap-y-2 items-center">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Terms &{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500">
                            Conditions
                        </span>
                    </h1>
                </div>
            </div>
            <div className="py-10 mx-auto prose dark:prose-invert prose-neutral">
                {documentToReactComponents(content.fields.tc)}
            </div>
        </LayoutWrapper>
    );
};

export default page;
