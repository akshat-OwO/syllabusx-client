import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
    PersistQueryClientProvider,
    removeOldestQuery,
} from "@tanstack/react-query-persist-client";
import { compress, decompress } from "lz-string";
import { FC, ReactNode, useEffect, useState } from "react";
import { Icons } from "../Icons";
import { ThemeProvider } from "./theme-provider";

interface QueryProviderProps {
    children: ReactNode;
}

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
    // const [isMounted, setIsMounted] = useState<boolean>(false);
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 60 * 24 * 15,
                        gcTime: 1000 * 60 * 60 * 24 * 15,
                    },
                }, // 15 days
            })
    );

    const persister = createSyncStoragePersister({
        storage: typeof window !== "undefined" ? window.localStorage : null,
        retry: removeOldestQuery,
        serialize: (data) => compress(JSON.stringify(data)),
        deserialize: (data) => JSON.parse(decompress(data)),
    });

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

    // if (!isMounted)
    //     return (
    //         <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    //             <div className="flex h-screen items-center justify-center bg-background">
    //                 <div className="flex items-center gap-10">
    //                     <Icons.x className="h-36 w-36" />
    //                 </div>
    //             </div>
    //         </ThemeProvider>
    //     );

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
        >
            {children}
            <ReactQueryDevtools />
        </PersistQueryClientProvider>
    );
};

export default QueryProvider;
