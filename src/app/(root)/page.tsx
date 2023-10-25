import CourseList from '@/components/rootPage/CourseList';
import Features from '@/components/rootPage/Features';
import Footer from '@/components/rootPage/Footer';
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
            <Pricing />
            <WallOfLove />
            <Letter />
            <Footer />
        </div>
    );
}
