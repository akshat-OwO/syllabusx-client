import { Analytics } from "@vercel/analytics/react";
import { FC, ReactNode } from "react";
import { ThemeSwitcher } from "../theme/theme-switcher";
import { Toaster as SonnerToaster } from "../ui/sonner";
import { Toaster } from "../ui/toaster";
import ModalProvider from "./modal-provider";
import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "../ui/tooltip";

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <TooltipProvider>
                    {children}
                    <ModalProvider />
                </TooltipProvider>
                <Toaster />
                <SonnerToaster />
                <ThemeSwitcher />
                <Analytics />
            </ThemeProvider>
        </QueryProvider>
    );
};

export default Providers;
