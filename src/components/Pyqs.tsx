import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { buttonVariants } from './ui/button';

interface PyqsProps {
    pyq: string;
}

const Pyqs: FC<PyqsProps> = ({ pyq }) => {
    const params = useParams();

    const { semester, branch, subject } = params;

    const { data, isLoading, error } = useQuery({
        queryKey: ['pyqs', semester, branch, subject],
        queryFn: async () => {
            const response = (await axios.get(
                `https://server.syllabusx.live/drive/pyq/${pyq}`
            )) as AxiosResponse;
            return response.data as Drive[];
        },
        staleTime: 1000 * 60 * 60 * 2,
    });

    if (error instanceof AxiosError)
        return (
            <div className="p-4 bg-neutral-900 rounded-lg grid place-content-center text-center">
                <h1 className="text-3xl">404 Not Found</h1>
                <p>{error.message}</p>
            </div>
        );

    return (
        <div className="grid bg-neutral-800/80 lg:mt-5 rounded-lg p-2">
            <h3 className="text-lg lg:text-xl mb-2">PYQs</h3>
            {isLoading && (
                <Loader2 className="h-24 w-24 animate-spin mt-5 mx-auto sm:col-span-2 md:col-span-3 lg:col-span-4" />
            )}
            {data && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((d) => (
                        <a
                            target='_blank'
                            key={d.id}
                            className={cn(
                                buttonVariants({
                                    variant: 'default',
                                    className:
                                        'relative text-center h-full self-center hover:ring-2 hover:ring-neutral-50 hover:ring-offset-4 transition',
                                })
                            )}
                            href={d.webViewLink}
                        >
                            {d.description?.includes('new') && (
                                <span className="absolute top-0 left-0 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-600"></span>
                                </span>
                            )}
                            {d.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Pyqs;
