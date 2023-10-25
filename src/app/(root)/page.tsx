import CourseList from '@/components/rootPage/CourseList';
import Features from '@/components/rootPage/Features';
import Hero from '@/components/rootPage/Hero';
import Letter from '@/components/rootPage/Letter';
import Pricing from '@/components/rootPage/Pricing';
import WallOfLove from '@/components/rootPage/WallOfLove';

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <Hero />
            <Features />
            <CourseList />
            <Letter />
            <Pricing />
            <WallOfLove />
        </div>
    );
}
