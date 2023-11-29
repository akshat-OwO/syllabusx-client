import LayoutWrapper from '@/layouts/LayoutWrapper';
import { FC } from 'react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

interface WallOfLoveProps {}

const WallOfLove: FC<WallOfLoveProps> = ({}) => {
    return (
        <LayoutWrapper className="py-20">
            <div className="flex flex-col gap-10 justify-center">
                <div className="flex flex-col items-center gap-5">
                    <h3 className="text-accent-foreground font-semibold text-xl md:text-3xl">
                        Wall of love
                    </h3>
                    <p className="text-muted-foreground text-base md:text-2xl font-semibold">
                        Collecting praises from students
                    </p>
                </div>
                <ScrollArea className="max-w-xs sm:max-w-lg mx-auto md:m-0 md:max-w-none lg:hidden">
                    <div className="w-[100vw] md:w-auto grid place-items-center grid-cols-3 gap-5">
                        <div className="bg-accent w-full h-32 rounded-md" />
                        <div className="bg-accent w-full h-32 rounded-md" />
                        <div className="bg-accent w-full h-32 rounded-md" />
                        <div className="bg-accent w-full h-32 rounded-md" />
                        <div className="bg-accent w-full h-32 rounded-md" />
                        <div className="bg-accent w-full h-32 rounded-md" />
                        <div className="bg-accent w-full h-32 rounded-md" />
                        <div className="bg-accent w-full h-32 rounded-md" />
                        <div className="bg-accent w-full h-32 rounded-md" />
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <div className="hidden lg:grid place-items-center grid-cols-3 gap-5">
                    <div className="bg-accent w-full h-32 rounded-md" />
                    <div className="bg-accent w-full h-32 rounded-md" />
                    <div className="bg-accent w-full h-32 rounded-md" />
                    <div className="bg-accent w-full h-32 rounded-md" />
                    <div className="bg-accent w-full h-32 rounded-md" />
                    <div className="bg-accent w-full h-32 rounded-md" />
                    <div className="bg-accent w-full h-32 rounded-md" />
                    <div className="bg-accent w-full h-32 rounded-md" />
                    <div className="bg-accent w-full h-32 rounded-md" />
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default WallOfLove;
