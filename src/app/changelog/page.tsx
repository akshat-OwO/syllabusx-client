import LayoutWrapper from '@/layouts/LayoutWrapper';
import { getChanges } from '@/lib/contentful';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';

export const revalidate = 43200;

export const metadata: Metadata = {
    title: 'Changelog',
    description:
        'Dive into the Changelog Chronicles at SyllabusX, your backstage pass to witness the evolution of academic innovation. Explore the journey through previous versions, unveiling the heartbeat of enhancements and updates that shape your seamless educational experience.',
    openGraph: {
        title: 'SyllabusX | Changelog',
        description:
            'Dive into the Changelog Chronicles at SyllabusX, your backstage pass to witness the evolution of academic innovation. Explore the journey through previous versions, unveiling the heartbeat of enhancements and updates that shape your seamless educational experience.',
    },
    twitter: {
        title: 'SyllabusX | Changelog',
        description:
            'Dive into the Changelog Chronicles at SyllabusX, your backstage pass to witness the evolution of academic innovation. Explore the journey through previous versions, unveiling the heartbeat of enhancements and updates that shape your seamless educational experience.',
    },
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    const logs: any = await getChanges();

    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-7rem)]">
            <div className="flex flex-col gap-y-2 items-center">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Changelog{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500">
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
            <div className="py-20 grid md:grid-cols-3 gap-10">
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
