import { buttonVariants } from '@/components/ui/button';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';

export const metadata: Metadata = {
    title: 'Courses',
    description:
        "Unleash your academic odyssey with SyllabusX's Courses page, charting a course for every program at Guru Gobind Singh Indraprastha University (GGSIPU). Explore detailed syllabi and study materials for B.Tech, USICT B.Tech, BCA, and stay tuned for more exciting programs on the horizon. Your academic journey begins here.",
    openGraph: {
        title: 'SyllabusX | Courses',
        description:
            "Unleash your academic odyssey with SyllabusX's Courses page, charting a course for every program at Guru Gobind Singh Indraprastha University (GGSIPU). Explore detailed syllabi and study materials for B.Tech, USICT B.Tech, BCA, and stay tuned for more exciting programs on the horizon. Your academic journey begins here.",
        url: 'https://syllabusx.live',
        siteName: 'SyllabusX',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'SyllabusX | Courses',
        description:
            "Unleash your academic odyssey with SyllabusX's Courses page, charting a course for every program at Guru Gobind Singh Indraprastha University (GGSIPU). Explore detailed syllabi and study materials for B.Tech, USICT B.Tech, BCA, and stay tuned for more exciting programs on the horizon. Your academic journey begins here.",
        card: 'summary_large_image',
        site: 'https://syllabusx.live',
    },
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-7rem)]">
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
                            className: 'w-full h-full shadow-2xl',
                        })
                    )}
                >
                    B.Tech
                </Link>
                <Link
                    href="/courses/bca"
                    className={cn(
                        buttonVariants({
                            variant: 'secondary',
                            className: 'row-start-2 w-full h-full shadow-2xl',
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
                                'row-span-2 col-start-2 w-full h-full shadow-2xl hover:bg-background hover:text-foreground, pointer-events-none',
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
