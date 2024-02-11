import LayoutWrapper from "@/layouts/LayoutWrapper";
import { octokit } from "@/lib/octokit";
import { format } from "date-fns";
import { Metadata } from "next";
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

interface pageProps { }

async function getReleases(pageSize = 8, page = 1) {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/releases",
      {
        owner: "akshat-OwO",
        repo: "syllabusx-client",
        per_page: pageSize, 
        page, 
      }
    );
  
    return response.data;
  }

const page: FC<pageProps> = async ({ }) => {
    const releases = await getReleases();

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
                        Your backstage pass to witness the heartbeat of academic innovation.
                    </p>
                </div>
            </div>

            <div className="grid gap-10 py-20 md:grid-cols-3">
                {releases.map((release) => (
                    <ChangeLogCard
                        key={release.id}
                        title={release.name}
                        href={release.html_url}
                    >
                        Release Date: {format(release.published_at!, "dd/MM/yyyy")}
                    </ChangeLogCard>
                ))}


                <a href="https://github.com/akshat-OwO/syllabusx-client/releases" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">View More</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">See all releases on GitHub</p>
                </a>


            </div>
        </LayoutWrapper>
    );
};

interface ChangeLogCardProps {
    href: string;
    title: string | null;
    children: React.ReactNode;
}

const ChangeLogCard: FC<ChangeLogCardProps> = ({ children, href, title }) => {
    return (
        <a
            target="_blank"
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            href={href}
        >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
            </p>
        </a>
    );
};

export default page;
