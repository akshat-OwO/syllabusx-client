import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

function App() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
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
                    element: <SubjectPage />,
                },
            ],
        },
    ];

    const router = createBrowserRouter(routes);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="color-theme">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <Toaster />
                {/* <ReactQueryDevtools /> */}
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
