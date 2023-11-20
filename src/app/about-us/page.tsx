import { buttonVariants } from '@/components/ui/button';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import { getAboutUs, getSyllabusxTeam } from '@/lib/contentful';
import { cn } from '@/lib/utils';
import { Github, Instagram, Link2 } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { FC } from 'react';

export const revalidate = 43200;

export const metadata: Metadata = {
    title: 'About Us',
    description:
        "Discover the faces behind SyllabusX – where it's not just about the code, but the passion and dedication of individuals. Meet Akshat, Shourya, and Sparsh, the dynamic team propelling SyllabusX towards a future of simplified academic exploration.",
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    const team: any = await getSyllabusxTeam();
    const aboutContent: any = await getAboutUs();
    const teamImage: any = aboutContent.teamImage.fields.file;

    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-7rem)]">
            <div className="flex flex-col gap-y-2 items-center">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Unveiling the Minds Behind{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500">
                            SyllabusX
                        </span>
                    </h1>
                </div>
                <div className="prose prose-sm prose-neutral dark:prose-invert">
                    <p className="text-center">
                        Because at SyllabusX, it&apos;s not just about the code;
                        it&apos;s about the people who make it happen.
                    </p>
                </div>
            </div>
            <div className="py-10 w-full">
                <div className="relative aspect-video rounded-md">
                    <Image
                        src={'https:' + teamImage.url}
                        alt="Team Image"
                        fill
                        className="rounded-md"
                    />
                </div>
            </div>
            <div className="py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {team.map((member: any) => (
                    <div
                        key={member.sys.id}
                        className="w-full bg-accent shadow-2xl rounded-md p-5"
                    >
                        <div className="flex justify-between items-center">
                            <div className="prose dark:prose-invert prose-neutral">
                                <h2>{member.fields.memberName}</h2>
                            </div>
                            <div className="flex gap-2 items-center">
                                <a
                                    href={member.fields.websiteLink}
                                    className={cn(
                                        buttonVariants({
                                            variant: 'outline',
                                            size: 'icon',
                                        })
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Link2 className="h-4 w-4" />
                                </a>
                                <a
                                    href={member.fields.githubLink}
                                    className={cn(
                                        buttonVariants({
                                            variant: 'outline',
                                            size: 'icon',
                                        })
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="h-4 w-4" />
                                </a>
                                <a
                                    href={member.fields.instaLink}
                                    className={cn(
                                        buttonVariants({
                                            variant: 'outline',
                                            size: 'icon',
                                        })
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Instagram className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </LayoutWrapper>
    );
};

export default page;
