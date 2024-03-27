import { FC, ReactNode } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./tooltip";

interface AccessibleToolTipProps {
    children: ReactNode;
    label: string;
    className?: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}

const AccessibleToolTip: FC<AccessibleToolTipProps> = ({
    children,
    label,
    className,
    side = "bottom",
    align = "center",
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align} className={className}>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AccessibleToolTip;
