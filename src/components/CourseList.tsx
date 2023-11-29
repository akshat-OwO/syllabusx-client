import LayoutWrapper from '@/layouts/LayoutWrapper';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { buttonVariants } from './ui/button';

interface CourseListProps {
    content: any;
}

const CourseList: FC<CourseListProps> = ({ content }) => {

    return (
        <LayoutWrapper className="py-20 overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
                <div className="flex items-center justify-between lg:items-start lg:flex-col gap-5">
                    <div className="prose dark:prose-invert prose-neutral">
                        <h2>Unleash Your Academic Odyssey</h2>
                        <p>Charting a course for every IPU program.</p>
                    </div>
                    <div className="relative hidden dark:md:block h-72 aspect-square rounded-md">
                        <Image
                            src={content ? ('https:' + content.unleashOdyssey.fields.file.url) : '/placeholder-square.png'}
                            alt="Unleash Odyssey"
                            fill
                            className="rounded-md"
                        />
                    </div>
                    <div className="relative dark:hidden hidden md:block h-72 aspect-square rounded-md">
                        <Image
                            src={content ? ('https:' + content.unleashOdyssey.fields.file.url) : '/placeholder-square-light.png'}
                            alt="Unleash Odyssey"
                            fill
                            className="rounded-md"
                        />
                    </div>
                </div>
                <div className="w-full h-48 lg:h-auto lg:w-1/2 grid grid-cols-2 gap-2">
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
            </div>
        </LayoutWrapper>
    );
};

export default CourseList;
