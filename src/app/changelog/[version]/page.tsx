import { buttonVariants } from '@/components/ui/button';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import { getChange } from '@/lib/contentful';
import { cn } from '@/lib/utils';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface pageProps {
    params: { version: string };
}

const page: FC<pageProps> = async ({ params }) => {
    const change: any = await getChange(params.version);

    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-8.5rem)]">
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
                        href={`/changelog/${change.sys.id}`}
                        className={cn(buttonVariants({ variant: 'link' }))}
                    >
                        {change.fields.version}
                    </Link>
                </div>
                <div className="px-4 py-2 bg-accent shadow-2xl rounded-md mx-auto prose dark:prose-invert prose-neutral">
                    <h2 className="underline">
                        Version {change.fields.version}
                    </h2>
                    <p>Release Date: {change.fields.releaseDate}</p>
                    {documentToReactComponents(change.fields.changes)}
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default page;
