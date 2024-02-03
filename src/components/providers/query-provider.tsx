"use client";

import { CACHE_TIME, STALE_TIME } from "@/config";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
    PersistQueryClientProvider,
    removeOldestQuery,
} from "@tanstack/react-query-persist-client";
import { FC, ReactNode, useState } from "react";

interface QueryProviderProps {
    children: ReactNode;
}

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: STALE_TIME,
                        gcTime: CACHE_TIME,
                    },
                }, // 15 days
            })
    );

    const persister = createSyncStoragePersister({
        storage: typeof window !== "undefined" ? window.localStorage : null,
        retry: removeOldestQuery,
    });

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister, maxAge: CACHE_TIME }}
        >
            {children}
            <ReactQueryDevtools />
        </PersistQueryClientProvider>
    );
};

export default QueryProvider;
