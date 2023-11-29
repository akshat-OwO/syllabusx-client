import { buttonVariants } from '@/components/ui/button';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import { generateChangesPages, getChange } from '@/lib/contentful';
import { cn } from '@/lib/utils';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

export const dynamicParams = true;
export const revalidate = 43200;

export async function generateStaticParams() {
    const paths = await generateChangesPages();
    if (paths) return paths;
    return [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
}

interface pageProps {
    params: { versionId: string };
}

const page: FC<pageProps> = async ({ params }) => {
    const change: any = await getChange(params.versionId);

    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-7rem)]">
            <div className="flex flex-col gap-y-2 items-center">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Changelog{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500">
                            Chronicles
                        </span>
                    </h1>
                </div>
                <div className="prose prose-sm prose-neutral dark:prose-invert">
                    <p className="text-center">
                        Your backstage pass to witness the heartbeat of academic
                        innovation.
                    </p>
                </div>
            </div>
            <div className="py-10">
                <div className="max-w-prose mx-auto flex gap-1 items-center">
                    <Link
                        href="/changelog"
                        className={cn(buttonVariants({ variant: 'link' }))}
                    >
                        Change Log
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link
                        href={change ? (`/changelog/${change.sys.id}`) : '/changelog'}
                        className={cn(buttonVariants({ variant: 'link' }))}
                    >
                        {change ? change.fields.version : 'X'}
                    </Link>
                </div>
                <div className="px-4 py-2 mx-auto prose dark:prose-invert prose-neutral">
                    <h2 className="underline">
                        Version {change ? change.fields.version : 'X'}
                    </h2>
                    <p>Release Date: {change ? change.fields.releaseDate : 'DD-MM-YYYY'}</p>
                    {change ? documentToReactComponents(change.fields.changes) : null}
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default page;
