import CourseList from "@/components/CourseList";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Letter from "@/components/Letter";
import Pricing from "@/components/Pricing";
import { getHomePageData } from "@/lib/contentful";
import { octokit } from "@/lib/octokit";

export const revalidate = 43200;

const latestRelease = async () => {
    const response = await octokit.request(
        "GET /repos/{owner}/{repo}/releases/latest",
        {
            owner: "akshat-OwO",
            repo: "syllabusx-client",
        }
    );
    return response.data;
};

export default async function Home() {
    const fields = await getHomePageData();
    const release = await latestRelease();

    return (
        <div className="flex flex-col items-center justify-center">
            <Hero
                releaseTag={release.tag_name}
                releaseUrl={release.html_url}
                content={fields}
            />
            <Features />
            <CourseList content={fields} />
            <Pricing />
            <Letter content={fields} />
        </div>
    );
}
