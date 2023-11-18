import CourseList from "@/components/CourseList";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Letter from "@/components/Letter";
import Pricing from "@/components/Pricing";
import { getHomePageData } from "@/lib/contentful";

export default async function Home() {
    const fields = await getHomePageData();

    return (
        <div className="flex flex-col justify-center items-center">
            <Hero />
            <Features />
            <CourseList />
            <Pricing />
            {/* <WallOfLove /> */}
            <Letter content={fields} />
        </div>
    );
}