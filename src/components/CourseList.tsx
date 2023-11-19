import LayoutWrapper from '@/layouts/LayoutWrapper';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';
import { buttonVariants } from './ui/button';

interface CourseListProps {}

const CourseList: FC<CourseListProps> = ({}) => {
    return (
        <LayoutWrapper className="py-20 overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
                <div className="flex items-center justify-between lg:items-start lg:flex-col gap-5">
                    <div className="prose dark:prose-invert prose-neutral">
                        <h2>
                        Unleash Your Academic Odyssey
                        </h2>
                        <p>
                        Charting a course for every IPU program.
                        </p>
                    </div>
                    <div className="h-72 w-72 bg-accent rounded-md" />
                </div>
                <div className="w-full h-48 lg:h-auto lg:w-1/2 grid grid-cols-2 gap-2">
                    <Link
                        href="/courses/btech"
                        className={cn(
                            buttonVariants({
                                variant: 'secondary',
                                className: 'ring-2 lg:p-2 lg:items-end ring-foreground row-span-3 dark:ring-0 w-full h-full shadow-2xl',
                            })
                        )}
                    >
                        <div className='lg:hidden'>B.TECH</div>
                        <div className='hidden lg:flex flex-col relative justify-end p-2 h-full w-full bg-background rounded-md'>
                            <h6 className='absolute bottom-2 right-2'>B.TECH</h6>
                        </div>
                    </Link>
                    <Link
                        href="/courses/btech"
                        className={cn(
                            buttonVariants({
                                variant: 'secondary',
                                className: 'ring-2 ring-foreground dark:ring-0 w-full h-full shadow-2xl',
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
                                className: 'ring-2 ring-foreground dark:ring-0 w-full h-full shadow-2xl',
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
            </div>
        </LayoutWrapper>
    );
};

export default CourseList;
