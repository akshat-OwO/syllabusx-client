import { buttonVariants } from '@/components/ui/button';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';

export const metadata: Metadata = {
    title: 'Courses',
};

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-8.5rem)]">
            <div className="flex flex-col gap-y-2 items-center">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Unleash Your Academic{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500">
                            Odyssey
                        </span>
                    </h1>
                </div>
                <div className="prose prose-sm prose-neutral dark:prose-invert">
                    <p className="text-center">
                        Charting a course for every IPU program.
                    </p>
                </div>
            </div>
            <div className="py-20 mx-auto w-full aspect-video lg:w-3/5 grid grid-cols-2 gap-2">
                <Link
                    href="/courses/btech"
                    className={cn(
                        buttonVariants({
                            variant: 'secondary',
                            className:
                                'ring-2 lg:p-2 lg:items-end ring-foreground row-span-3 dark:ring-0 w-full h-full shadow-2xl',
                        })
                    )}
                >
                    <div className="lg:hidden">B.TECH</div>
                    <div className="hidden lg:flex flex-col relative justify-end p-2 h-full w-full bg-background rounded-md">
                        <h6 className="absolute bottom-2 right-2">B.TECH</h6>
                    </div>
                </Link>
                <Link
                    href="/courses/btech"
                    className={cn(
                        buttonVariants({
                            variant: 'secondary',
                            className:
                                'ring-2 ring-foreground dark:ring-0 w-full h-full shadow-2xl',
                        })
                    )}
                >
                    USICT B.TECH
                </Link>
                <Link
                    href="/courses/bca"
                    className={cn(
                        buttonVariants({
                            variant: 'secondary',
                            className:
                                'ring-2 ring-foreground dark:ring-0 w-full h-full shadow-2xl',
                        })
                    )}
                >
                    BCA
                </Link>
                <div
                    className={cn(
                        buttonVariants({
                            variant: 'outline',
                            className:
                                'ring-2 ring-foreground dark:ring-0 w-full h-full shadow-2xl hover:bg-background hover:text-foreground, pointer-events-none',
                        })
                    )}
                >
                    Coming Soon...
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default page;
