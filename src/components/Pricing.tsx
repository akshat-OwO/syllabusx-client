import LayoutWrapper from "@/layouts/LayoutWrapper";
import { cn } from "@/lib/utils";
import { Gift, Heart, MessageSquarePlus, Star } from "lucide-react";
import { FC } from "react";
import { buttonVariants } from "./ui/button";

interface PricingProps {}

const Pricing: FC<PricingProps> = ({}) => {
    return (
        <LayoutWrapper className="py-20">
            <div className="mx-auto flex max-w-md flex-col justify-center gap-8">
                <div className="prose prose-neutral self-center text-center dark:prose-invert">
                    <h2 className="mb-2 text-3xl font-bold">Pricing</h2>
                    <p className="text-muted-foreground">
                        No wallet required! SyllabusX is free and open-source
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <a
                        href="https://github.com/akshat-OwO/syllabusx-client"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                className:
                                    "h-12 w-full items-center justify-start gap-2",
                            })
                        )}
                    >
                        <Star className="h-5 w-5 fill-highlight text-highlight" />
                        Give us a star
                    </a>
                    <a
                        href="https://www.instagram.com/syllabusx_.live/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                className:
                                    "h-12 w-full items-center justify-start gap-2",
                            })
                        )}
                    >
                        <Heart className="h-5 w-5 fill-highlight text-highlight" />
                        Follow us on Instagram
                    </a>
                    <a
                        href="https://forms.gle/BFTv1uy8L33ptic6A"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                className:
                                    "h-12 w-full items-center justify-start gap-2",
                            })
                        )}
                    >
                        <MessageSquarePlus className="h-5 w-5 fill-highlight text-highlight" />
                        Give us feedback
                    </a>
                    <div className="mt-2 flex flex-col items-center gap-4 rounded-lg border border-secondary p-6">
                        <Gift className="h-20 w-20 stroke-1 text-highlight" />
                        <a
                            href="https://github.com/sponsors/akshat-OwO"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({
                                    className: "h-10 w-full items-center gap-2",
                                })
                            )}
                        >
                            Become a sponsor
                        </a>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Pricing;
