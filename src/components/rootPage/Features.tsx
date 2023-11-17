import LayoutWrapper from '@/layouts/LayoutWrapper';
import {
    BookCheck,
    CalendarCheck,
    CheckCircle2,
    MessageSquarePlus,
    PackageOpen,
    Repeat,
    TabletSmartphone,
} from 'lucide-react';
import { FC } from 'react';
import ShowCard from '../ui/show-card';

interface FeaturesProps {}

const Features: FC<FeaturesProps> = ({}) => {
    return (
        <div className='w-full'>
            <LayoutWrapper className="z-10 py-20">
                <div className="flex flex-col items-center gap-10">
                    <div className='prose dark:prose-invert prose-neutral text-center'>
                        <h2 className="text-accent-foreground font-semibold text-xl md:text-3xl">
                            We&apos;ve got your back
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-5 sm:gap-y-10 justify-center items-center">
                        <ShowCard
                            title="Up-to-Date Information"
                            iconRight={<CalendarCheck className="h-4 w-4" />}
                        >
                            Current, Never Outdated Information.
                        </ShowCard>
                        <div className="block lg:hidden">
                            <ShowCard
                                title="Comprehensive Coverage"
                                iconLeft={<BookCheck className="h-4 w-4" />}
                            >
                                Inclusive grasp of entire curriculum.
                            </ShowCard>
                        </div>
                        <div className="hidden lg:block">
                            <ShowCard
                                title="Comprehensive Coverage"
                                iconRight={<BookCheck className="h-4 w-4" />}
                            >
                                Inclusive grasp of entire curriculum.
                            </ShowCard>
                        </div>
                        <ShowCard
                            title="User Friendly Interface"
                            iconRight={<TabletSmartphone className="h-4 w-4" />}
                        >
                            Intuitive. Navigational Bliss.
                        </ShowCard>
                        <ShowCard
                            title="Open Source"
                            iconLeft={<PackageOpen className="h-4 w-4" />}
                        >
                            Knowledge for All, Code Together.
                        </ShowCard>
                        <div className="block lg:hidden">
                            <ShowCard
                                title="Constant Updates"
                                iconRight={<Repeat className="h-4 w-4" />}
                            >
                                Always Improving, Never Stagnant.
                            </ShowCard>
                        </div>
                        <div className="hidden lg:block">
                            <ShowCard
                                title="Constant Updates"
                                iconLeft={<Repeat className="h-4 w-4" />}
                            >
                                Always Improving, Never Stagnant.
                            </ShowCard>
                        </div>
                        <ShowCard
                            title="Feedback Loop"
                            iconLeft={<MessageSquarePlus className="h-4 w-4" />}
                        >
                            Your Input Shapes SyllabusX.
                        </ShowCard>
                    </div>
                </div>
            </LayoutWrapper>
        </div>
    );
};

export default Features;
