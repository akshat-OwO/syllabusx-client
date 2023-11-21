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
    const unleashOdysseyImage = content.unleashOdyssey.fields.file;
    const btechImageDark = content.btechImage[0].fields.file;
    const btechImageLight = content.btechImage[1].fields.file;

    return (
        <LayoutWrapper className="py-20 overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
                <div className="flex items-center justify-between lg:items-start lg:flex-col gap-5">
                    <div className="prose dark:prose-invert prose-neutral">
                        <h2>Unleash Your Academic Odyssey</h2>
                        <p>Charting a course for every IPU program.</p>
                    </div>
                    <div className="relative hidden md:block h-72 aspect-square rounded-md">
                        <Image
                            src={'https:' + unleashOdysseyImage.url}
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
                            <h6 className="absolute bottom-4 right-4 text-lg font-extrabold">
                                B.TECH
                            </h6>
                        </div>
                    </Link>
                    <Link
                        href="/courses/btech"
                        className={cn(
                            buttonVariants({
                                variant: 'secondary',
                                className: 'w-full h-full shadow-2xl',
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
                                className: 'w-full h-full shadow-2xl',
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
            </div>
        </LayoutWrapper>
    );
};

export default CourseList;
