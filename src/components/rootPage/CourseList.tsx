import LayoutWrapper from '@/layouts/LayoutWrapper';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';
import { buttonVariants } from '../ui/button';

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
                {/* <ScrollArea className="max-w-xs sm:max-w-lg mx-auto md:m-0 md:max-w-none lg:hidden">
                    <div className="w-[100vw] md:w-auto grid grid-cols-3 gap-2">
                        <Btech>
                            <Button
                                variant={'secondary'}
                                className="w-full h-full py-6"
                            >
                                B.TECH
                            </Button>
                        </Btech>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-full h-full py-6"
                        >
                            BCA
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-full h-full py-6"
                        >
                            BBA
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-full h-full py-6"
                        >
                            B.COM
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-full h-full py-6"
                        >
                            B.Ed
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-full h-full py-6"
                        >
                            LLB
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-full h-full py-6"
                        >
                            B.A
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-full h-full py-6"
                        >
                            BHMCT
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-full h-full py-6"
                        >
                            B.Voc
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-full h-full py-6"
                        >
                            B.DESIGN
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-full h-full py-6"
                        >
                            Coming Soon...
                        </Button>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea> */}
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
