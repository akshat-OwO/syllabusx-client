import { cn } from "@/lib/utils";
import { FC } from "react";
import { buttonVariants } from "./button";

interface ShowCardProps {
    title: string;
    className?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    children?: React.ReactNode;
}

const ShowCard: FC<ShowCardProps> = ({
    className,
    children,
    title,
    iconLeft,
    iconRight,
}) => {
    return (
        <div
            className={cn(
                "flex select-none items-center justify-between gap-x-5 space-y-1 rounded-md bg-accent p-3 leading-none text-accent-foreground no-underline shadow-md outline-none transition-colors",
                className
            )}
        >
            {iconLeft ? (
                <div
                    className={cn(
                        buttonVariants({
                            variant: "outline",
                            size: "icon",
                            className:
                                "hover:bg-background hover:text-foreground",
                        })
                    )}
                >
                    {iconLeft}
                </div>
            ) : null}
            <div className="flex flex-col justify-center gap-2">
                <div
                    className={cn(
                        "text-sm font-medium leading-none",
                        iconRight ? "text-start" : "text-end"
                    )}
                >
                    {title}
                </div>
                {children ? (
                    <p
                        className={cn(
                            "line-clamp-2 text-sm leading-snug text-muted-foreground",
                            iconRight ? "text-start" : "text-end"
                        )}
                    >
                        {children}
                    </p>
                ) : null}
            </div>
            {iconRight ? (
                <div
                    className={cn(
                        buttonVariants({
                            variant: "outline",
                            size: "icon",
                            className:
                                "hover:bg-background hover:text-foreground",
                        })
                    )}
                >
                    {iconRight}
                </div>
            ) : null}
        </div>
    );
};

export default ShowCard;
