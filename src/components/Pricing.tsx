import LayoutWrapper from "@/layouts/LayoutWrapper";
import { cn } from "@/lib/utils";
import { Gift, Heart, MessageSquarePlus, Star } from "lucide-react";
import { FC } from "react";
import { buttonVariants } from "./ui/button";

interface PricingProps {}

const Pricing: FC<PricingProps> = ({}) => {
    return (
        <LayoutWrapper className="py-20">
            <div className="flex flex-col justify-center gap-10">
                <div className="prose prose-neutral self-center text-center dark:prose-invert">
                    <h2>Pricing</h2>
                    <p>No wallet required! SyllabusX is free and open-source</p>
                </div>
                <div className="flex flex-col justify-center gap-2 md:flex-row md:items-end md:gap-0">
                    <div className="flex flex-col items-center justify-center gap-2 border-border md:items-start md:border-r md:pr-10">
                        <a
                            href="https://github.com/akshat-OwO/syllabusx-client"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                    className: "w-full items-center gap-2",
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
                                    variant: "outline",
                                    className: "w-full items-center gap-2",
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
                                    variant: "outline",
                                    className: "w-full items-center gap-2",
                                })
                            )}
                        >
                            <MessageSquarePlus className="h-4 w-4" />
                            Give us feedback
                        </a>
                    </div>
                    <div className="flex flex-col items-center gap-2 md:items-start md:pl-10">
                        <a
                            href="https://github.com/sponsors/akshat-OwO"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({
                                    variant: "outline",
                                    className:
                                        "w-full gap-2 md:items-center md:justify-self-end",
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
