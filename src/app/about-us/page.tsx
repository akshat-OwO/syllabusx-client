import { buttonVariants } from "@/components/ui/button";
import LayoutWrapper from "@/layouts/LayoutWrapper";
import { getAboutUs, getSyllabusxTeam } from "@/lib/contentful";
import { cn } from "@/lib/utils";
import { Github, Instagram, Link2 } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { FC } from "react";

export const revalidate = 43200;

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Discover the faces behind SyllabusX – where it's not just about the code, but the passion and dedication of individuals. Meet Akshat, Shourya, and Sparsh, the dynamic team propelling SyllabusX towards a future of simplified academic exploration.",
    openGraph: {
        title: "SyllabusX | About Us",
        description:
            "Discover the faces behind SyllabusX – where it's not just about the code, but the passion and dedication of individuals. Meet Akshat, Shourya, and Sparsh, the dynamic team propelling SyllabusX towards a future of simplified academic exploration.",
        url: "https://syllabusx.live",
        siteName: "SyllabusX",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "SyllabusX | About Us",
        description:
            "Discover the faces behind SyllabusX – where it's not just about the code, but the passion and dedication of individuals. Meet Akshat, Shourya, and Sparsh, the dynamic team propelling SyllabusX towards a future of simplified academic exploration.",
        card: "summary_large_image",
        site: "https://syllabusx.live",
    },
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    const team: any = await getSyllabusxTeam();
    const aboutContent: any = await getAboutUs();

    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-20">
            <div className="flex flex-col items-center gap-y-2">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Unveiling the Minds Behind{" "}
                        <span className="text-highlight">SyllabusX</span>
                    </h1>
                </div>
                <div className="prose prose-sm prose-neutral dark:prose-invert">
                    <p className="text-center">
                        Because at SyllabusX, it&apos;s not just about the code;
                        it&apos;s about the people who make it happen.
                    </p>
                </div>
            </div>
            <div className="w-full py-10">
                <div className="relative aspect-video rounded-md">
                    <div className="conic-center absolute h-full w-full" />
                    <div className="z-10 aspect-video w-full rounded-md bg-accent/20 p-2 shadow-2xl">
                        <Image
                            src={
                                aboutContent
                                    ? "https:" +
                                      aboutContent.teamImage.fields.file.url
                                    : "/placeholder.png"
                            }
                            alt="Team Image"
                            fill
                            className="rounded-md p-2"
                        />
                    </div>
                </div>
            </div>
            {team ? (
                <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-3">
                    {team.map((member: any) => (
                        <div
                            key={member.sys.id}
                            className="w-full rounded-md bg-accent p-5 shadow-2xl"
                        >
                            <div className="flex items-center justify-between">
                                <div className="prose prose-neutral dark:prose-invert">
                                    <h2>{member.fields.memberName}</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={member.fields.websiteLink}
                                        className={cn(
                                            buttonVariants({
                                                variant: "outline",
                                                size: "icon",
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
                                                variant: "outline",
                                                size: "icon",
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
                                                variant: "outline",
                                                size: "icon",
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
            ) : null}
        </LayoutWrapper>
    );
};

export default page;
