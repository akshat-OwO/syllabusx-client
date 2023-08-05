import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';

interface SubjectPageProps {}

const SubjectPage: FC<SubjectPageProps> = () => {
    const params = useParams();

    const { semester, branch } = params;

    const { data, isLoading, error } = useQuery({
        queryKey: ['subjects', `${semester}`, `${branch}`],
        queryFn: async () => {
            const response = (await axios.get(
                `https://server.syllabusx.live/${semester}/${branch}`
            )) as AxiosResponse;
            return response.data;
        },
    });

    if (error instanceof AxiosError)
        return (
            <div className="p-4 bg-neutral-900 rounded-lg grid place-content-center text-center">
                <h1 className="text-3xl">404 Not Found</h1>
                <p>{error.message}</p>
            </div>
        );

    return (
        <div className="grid px-10 gap-4 w-full mt-4">
            {isLoading && <Loader2 className="h-24 w-24 animate-spin mt-5 mx-auto" />}
            {data && (
                data.map((d: string) => (
                    <Button key={d}>{d}</Button>
                ))
            )}
        </div>
    );
};

export default SubjectPage;
