import LayoutWrapper from '@/layouts/LayoutWrapper';
import { getPolicy } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FC } from 'react';

export const revalidate = 86400;

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    const content: any = await getPolicy();

    const lastUpdated = new Date(content.sys.updatedAt).toLocaleDateString();

    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-7rem)]">
            <div className="flex flex-col gap-y-2 items-center">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Privacy{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500">
                            Policy
                        </span>
                    </h1>
                </div>
            </div>
            <div className="py-10 mx-auto prose dark:prose-invert prose-neutral">
                <h5>Last Updated: {lastUpdated}</h5>
                {documentToReactComponents(content.fields.privacy)}
            </div>
        </LayoutWrapper>
    );
};

export default page;
