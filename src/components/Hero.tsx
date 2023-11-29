import LayoutWrapper from '@/layouts/LayoutWrapper';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Icons } from './Icons';
import { badgeVariants } from './ui/badge';
import { buttonVariants } from './ui/button';

interface HeroProps {
    content: any;
}

const Hero: FC<HeroProps> = ({ content }) => {
    return (
        <div className="radial-top w-full">
            <LayoutWrapper className="flex flex-col p-10 gap-10 justify-center items-center">
                <div className="flex flex-col gap-5">
                    <Icons.x className="h-20" />
                    <Link
                        href="/changelog"
                        className={cn(badgeVariants({ variant: 'default' }))}
                    >
                        Version {content ? content.version : 'X'}
                    </Link>
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                    <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                        <h1 className="text-center">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500">
                                SyllabusX
                            </span>{' '}
                            is Your academic GPS. Navigate studies effortlessly.
                        </h1>
                    </div>
                    <div className="prose prose-sm prose-neutral dark:prose-invert">
                        <p className="text-center">
                            Embark on a journey of simplified education.
                            Navigating through syllabi, study materials, and
                            course essentials has never been this effortless.
                        </p>
                    </div>
                </div>
                <Link
                    href="/courses"
                    className={cn(buttonVariants({ variant: 'default' }))}
                >
                    Browse Courses
                </Link>
                <div className="relative w-full h-full self-center">
                    <div className="-z-10 conic-center absolute w-full h-full" />
                    <div className="hidden dark:block z-10 w-full aspect-video p-2 shadow-2xl">
                        <Image
                            src={
                                content
                                    ? 'https:' +
                                      content.heroImage.fields.file.url
                                    : '/placeholder.png'
                            }
                            alt="Hero Image"
                            fill
                            quality={100}
                            className="rounded-md"
                        />
                    </div>
                    <div className="dark:hidden z-10 w-full aspect-video p-2 shadow-2xl">
                        <Image
                            src={
                                content
                                    ? 'https:' +
                                      content.heroImageLight.fields.file.url
                                    : '/placeholder.png'
                            }
                            alt="Hero Image Light"
                            fill
                            quality={100}
                            className="rounded-md"
                        />
                    </div>
                </div>
            </LayoutWrapper>
        </div>
    );
};

export default Hero;
