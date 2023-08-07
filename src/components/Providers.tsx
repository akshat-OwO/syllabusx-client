'use client';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { FC, ReactNode } from 'react';

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 60 * 8,
                cacheTime: 1000 * 60 * 60 * 8,
            },
        }, // 8 hours
    });
    
    const persister = createSyncStoragePersister({
        storage: typeof window !== 'undefined' ? window.localStorage : null,
    });

    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            {children}
        </PersistQueryClientProvider>
    );
};

export default Providers;
