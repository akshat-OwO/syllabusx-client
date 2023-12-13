import LayoutWrapper from "@/layouts/LayoutWrapper";
import { getChanges } from "@/lib/contentful";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";

export const revalidate = 43200;

export const metadata: Metadata = {
    title: "Changelog",
    description:
        "Dive into the Changelog Chronicles at SyllabusX, your backstage pass to witness the evolution of academic innovation. Explore the journey through previous versions, unveiling the heartbeat of enhancements and updates that shape your seamless educational experience.",
    openGraph: {
        title: "SyllabusX | Changelog",
        description:
            "Dive into the Changelog Chronicles at SyllabusX, your backstage pass to witness the evolution of academic innovation. Explore the journey through previous versions, unveiling the heartbeat of enhancements and updates that shape your seamless educational experience.",
        url: "https://syllabusx.live",
        siteName: "SyllabusX",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "SyllabusX | Changelog",
        description:
            "Dive into the Changelog Chronicles at SyllabusX, your backstage pass to witness the evolution of academic innovation. Explore the journey through previous versions, unveiling the heartbeat of enhancements and updates that shape your seamless educational experience.",
        card: "summary_large_image",
        site: "https://syllabusx.live",
    },
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    const logs: any = await getChanges();

    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-20">
            <div className="flex flex-col items-center gap-y-2">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Changelog{" "}
                        <span className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 bg-clip-text text-transparent">
                            Chronicles
                        </span>
                    </h1>
                </div>
                <div className="prose prose-sm prose-neutral dark:prose-invert">
                    <p className="text-center">
                        Your backstage pass to witness the heartbeat of academic
                        innovation.
                    </p>
                </div>
            </div>
            {logs ? (
                <div className="grid gap-10 py-20 md:grid-cols-3">
                    {logs.map((log: any) => (
                        <ChangeLogCard
                            key={log.fields.version}
                            href={`/changelog/${log.sys.id}`}
                            title={`Version ${log.fields.version}`}
                        >
                            Release Date: {log.fields.releaseDate}
                        </ChangeLogCard>
                    ))}
                </div>
            ) : null}
        </LayoutWrapper>
    );
};

interface ChangeLogCardProps {
    href: string;
    title: string;
    children: React.ReactNode;
}

const ChangeLogCard: FC<ChangeLogCardProps> = ({ children, href, title }) => {
    return (
        <Link
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            href={href}
        >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
            </p>
        </Link>
    );
};

export default page;
