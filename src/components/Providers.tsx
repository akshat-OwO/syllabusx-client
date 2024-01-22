"use client";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
    PersistQueryClientProvider,
    persistQueryClient,
    removeOldestQuery,
} from "@tanstack/react-query-persist-client";
import { Analytics } from "@vercel/analytics/react";
import { compress, decompress } from "lz-string";
import { FC, ReactNode } from "react";
import ModalProvider from "./modals/modal-provider";
import { ThemeProvider } from "./theme/theme-provider";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { Toaster } from "./ui/toaster";

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 60 * 24 * 15,
                gcTime: 1000 * 60 * 60 * 24 * 15,
            },
        }, // 15 days
    });

    const persister = createSyncStoragePersister({
        storage: typeof window !== "undefined" ? window.localStorage : null,
        retry: removeOldestQuery,
        serialize: (data) => compress(JSON.stringify(data)),
        deserialize: (data) => JSON.parse(decompress(data)),
    });

    persistQueryClient({
        queryClient,
        persister,
        maxAge: 1000 * 60 * 60 * 24 * 15,
    });

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
        >
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {children}
                <ModalProvider />
                <Toaster />
            </ThemeProvider>
            <ThemeSwitcher />
            <Analytics />
            <ReactQueryDevtools />
        </PersistQueryClientProvider>
    );
};

export default Providers;
