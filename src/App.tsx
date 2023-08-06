import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import {
    RouteObject,
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import HomeLayout from './layouts/HomeLayout';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import SubjectPage from './pages/SubjectPage';
import SubjectsPage from './pages/SubjectsPage';

function App() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { staleTime: 1000 * 60 * 60 * 8, cacheTime: 1000 * 60 * 60 * 8 } }, // 8 hours
    });

    const persister = createSyncStoragePersister({
        storage: window.localStorage,
    });

    const routes: RouteObject[] = [
        {
            element: <HomeLayout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                },
            ],
        },
        {
            element: <Layout />,
            children: [
                {
                    path: '/search/:semester/:branch',
                    element: <SubjectsPage />,
                },
                {
                    path: '/subject/:semester/:branch/:subject',
                    element: <SubjectPage />,
                },
            ],
        },
    ];

    const router = createBrowserRouter(routes);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="color-theme">
            <PersistQueryClientProvider
                client={queryClient}
                persistOptions={{ persister }}
            >
                <RouterProvider router={router} />
                <Toaster />
                {/* <ReactQueryDevtools /> */}
            </PersistQueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
