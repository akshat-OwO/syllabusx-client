import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';

function App() {
    const queryClient = new QueryClient();

    const routes: RouteObject[] = [
        {
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
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
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
