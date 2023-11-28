import LayoutWrapper from '@/layouts/LayoutWrapper';
import { cn } from '@/lib/utils';
import { Gift, Heart, MessageSquarePlus, Star } from 'lucide-react';
import { FC } from 'react';
import { buttonVariants } from './ui/button';

interface PricingProps {}

const Pricing: FC<PricingProps> = ({}) => {
    return (
        <LayoutWrapper className="py-20">
            <div className="flex flex-col gap-10 justify-center">
                <div className="prose dark:prose-invert prose-neutral text-center self-center">
                    <h2>Pricing</h2>
                    <p>No wallet required! SyllabusX is free and open-source</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-center gap-2 md:gap-0">
                    <div className="flex flex-col gap-2 justify-center items-center md:items-start md:pr-10 md:border-r border-border">
                        <a
                            href="https://github.com/akshat-OwO/syllabusx-client"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({
                                    variant: 'outline',
                                    className: 'w-full gap-2 items-center',
                                })
                            )}
                        >
                            <Star className="h-4 w-4" />
                            Give us a star
                        </a>
                        <a
                            href="https://www.instagram.com/syllabusx_.live/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({
                                    variant: 'outline',
                                    className: 'w-full gap-2 items-center',
                                })
                            )}
                        >
                            <Heart className="h-4 w-4" />
                            Follow us on Instagram
                        </a>
                        <a
                            href="https://forms.gle/BFTv1uy8L33ptic6A"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({
                                    variant: 'outline',
                                    className: 'w-full gap-2 items-center',
                                })
                            )}
                        >
                            <MessageSquarePlus className="h-4 w-4" />
                            Give us feedback
                        </a>
                    </div>
                    <div className="md:pl-10 flex flex-col items-center md:items-start gap-2">
                        <a
                            href="https://github.com/sponsors/akshat-OwO"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({
                                    variant: 'outline',
                                    className:
                                        'w-full gap-2 md:justify-self-end md:items-center',
                                })
                            )}
                        >
                            <Gift className="h-4 w-4" />
                            Become a sponsor
                        </a>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Pricing;
