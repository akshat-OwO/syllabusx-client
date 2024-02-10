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
import { compress, decompress } from "lz-string";

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
                },
            })
    );

    const persister = createSyncStoragePersister({
        storage: typeof window !== "undefined" ? window.localStorage : null,
        retry: removeOldestQuery,
        serialize: (data) => compress(JSON.stringify(data)),
        deserialize: (data) => JSON.parse(decompress(data)),
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
