import { buttonVariants } from '@/components/ui/button';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import { getHomePageData } from '@/lib/contentful';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
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
    const content: any = await getHomePageData();
    const btechImageDark = content.btechImage[0].fields.file;
    const btechImageLight = content.btechImage[1].fields.file;

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
                            className:
                                'lg:p-2 lg:items-end row-span-3 w-full h-full shadow-2xl',
                        })
                    )}
                >
                    <div className="lg:hidden">B.TECH</div>
                    <div className="hidden lg:flex flex-col relative justify-end p-2 h-full w-full bg-background rounded-md">
                        <div className="hidden dark:block relative h-full aspect-square">
                            <Image
                                src={'https:' + btechImageDark.url}
                                alt="Btech Image (dark)"
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                        <div className="dark:hidden relative h-full aspect-square">
                            <Image
                                src={'https:' + btechImageLight.url}
                                alt="Btech Image (light)"
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                        <h6 className="absolute bottom-4 right-4 text-lg text-extrabold">B.TECH</h6>
                    </div>
                </Link>
                <Link
                    href="/courses/btech"
                    className={cn(
                        buttonVariants({
                            variant: 'secondary',
                            className:
                                'w-full h-full shadow-2xl',
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
                                'w-full h-full shadow-2xl',
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
                                'w-full h-full shadow-2xl hover:bg-background hover:text-foreground, pointer-events-none',
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
