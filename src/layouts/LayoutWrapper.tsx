import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
    className?: string;
}

const LayoutWrapper: FC<LayoutProps> = ({ children, className }) => {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
                className
            )}
        >
            {children}
        </div>
    );
};

export default LayoutWrapper;
