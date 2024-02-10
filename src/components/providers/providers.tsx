"use client";

import { Analytics } from "@vercel/analytics/react";
import { FC, ReactNode } from "react";
import { ThemeSwitcher } from "../theme/theme-switcher";
import { Toaster as SonnerToaster } from "../ui/sonner";
import { Toaster } from "../ui/toaster";
import ModalProvider from "./modal-provider";
import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme-provider";

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {children}
                <ModalProvider />
                <Toaster />
                <SonnerToaster />
            </ThemeProvider>
            <ThemeSwitcher />
            <Analytics />
        </QueryProvider>
    );
};

export default Providers;
