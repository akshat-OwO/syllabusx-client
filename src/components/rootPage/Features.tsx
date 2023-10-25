import LayoutWrapper from '@/layouts/LayoutWrapper';
import { CheckCircle2 } from 'lucide-react';
import { FC } from 'react';

interface FeaturesProps {}

const Features: FC<FeaturesProps> = ({}) => {
    return (
        <LayoutWrapper className="pb-20">
            <div className="flex flex-col items-center gap-10">
                <h2 className="text-accent-foreground font-semibold text-xl md:text-3xl">
                    We&apos;ve got your back
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-5 sm:gap-y-10 justify-center items-center">
                    <div className="flex gap-2 items-center">
                        <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                        <p>Up-to-Date Information</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                        <p>Comprehensive Coverage</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                        <p>User Friendly Interface</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                        <p>Open Source</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                        <p>Constant Updates</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                        <p>Feedback Loop</p>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Features;
