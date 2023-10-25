import LayoutWrapper from '@/layouts/LayoutWrapper';
import { FC } from 'react';

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
    return (
        <LayoutWrapper className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] gap-10 md:gap-0 justify-center md:justify-between items-center">
            <div className="flex flex-col justify-center gap-5">
                <h1 className="text-2xl md:text-5xl font-bold text-foreground">
                    SyllabusX
                </h1>

                <p className="text-lg md:text-2xl font-semibold text-muted-foreground">
                    Your Ultimate IPU resource.
                </p>
            </div>
            <div className="h-64 md:h-96 max-w-xl w-full bg-accent rounded-md md:flex-1 self-center" />
        </LayoutWrapper>
    );
};

export default Hero;
