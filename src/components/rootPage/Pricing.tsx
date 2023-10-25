import LayoutWrapper from '@/layouts/LayoutWrapper';
import { Gift, Heart, MessageSquarePlus, Star } from 'lucide-react';
import { FC } from 'react';
import { Button } from '../ui/button';

interface PricingProps {}

const Pricing: FC<PricingProps> = ({}) => {
    return (
        <LayoutWrapper className="py-20">
            <div className="flex flex-col gap-10 justify-center">
                <div className="flex flex-col items-center gap-5">
                    <h3 className="text-accent-foreground font-semibold text-xl md:text-3xl">
                        Pricing
                    </h3>
                    <p className="text-muted-foreground text-base md:text-2xl font-semibold">
                        Just kidding, SyllabusX is free and open-source
                    </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-center gap-2 md:gap-0">
                    <div className="flex flex-col gap-2 justify-center items-center md:items-start md:pr-10 md:border-r border-border">
                        <Button
                            variant={'outline'}
                            className="gap-2 items-center"
                        >
                            <Star className="h-4 w-4" />
                            Give us a star
                        </Button>
                        <Button
                            variant={'outline'}
                            className="gap-2 items-center"
                        >
                            <Heart className="h-4 w-4" />
                            Follow us on Instagram
                        </Button>
                        <Button
                            variant={'outline'}
                            className="gap-2 items-center"
                        >
                            <MessageSquarePlus className="h-4 w-4" />
                            Give us feedback
                        </Button>
                    </div>
                    <div className="md:pl-10 flex flex-col items-center md:items-start gap-2">
                        <Button
                            variant={'outline'}
                            className="md:justify-self-end md:items-center gap-2"
                        >
                            <Gift className="h-4 w-4" />
                            Become a sponsor
                        </Button>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Pricing;
