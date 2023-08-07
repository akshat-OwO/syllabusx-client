'use client';

import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import { buttonVariants } from './ui/button';

interface NotesProps {
    note: string | null;
    setEmbed: React.Dispatch<React.SetStateAction<Embed>>;
    setTab: React.Dispatch<React.SetStateAction<string>>;
}

const Notes: FC<NotesProps> = ({ note, setEmbed, setTab }) => {
    const params = useParams();

    const { semester, branch, subject } = params;

    const { data, isLoading, error } = useQuery({
        queryKey: ['notes', semester, branch, subject],
        queryFn: async () => {
            const response = (await axios.get(
                `https://server.syllabusx.live/drive/notes/${note}`
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
            <h3 className="text-lg lg:text-xl mb-2">Notes</h3>
            {isLoading && (
                <Loader2 className="h-24 w-24 animate-spin mt-5 mx-auto sm:col-span-2 md:col-span-3 lg:col-span-4" />
            )}
            {data && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((d) => (
                        <div
                            key={d.id}
                            className={cn(
                                buttonVariants({
                                    variant: 'default',
                                    className:
                                        'relative text-center h-full self-center hover:ring-2 hover:ring-neutral-50 hover:ring-offset-4 transition',
                                })
                            )}
                            onClick={() => {
                                setTab('pdf');
                                setEmbed({
                                    embedLink:
                                        d.webViewLink.slice(0, -17) + 'preview',
                                    name: d.name.slice(0, -4),
                                });
                            }}
                        >
                            {!(
                                new Date(Date.parse(d.createdTime)).getTime() <
                                new Date(
                                    Date.now() - 2 * 24 * 60 * 60 * 1000
                                ).getTime()
                            ) && (
                                <span className="absolute top-0 left-0 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-600"></span>
                                </span>
                            )}
                            {d.name.slice(0, -4)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notes;