import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ChevronRight, Loader2 } from 'lucide-react';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { branchList, semesterList } from '../config';

interface SubjectsPageProps {}

const SubjectsPage: FC<SubjectsPageProps> = () => {
    const params = useParams();
    const navigate = useNavigate();

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
        <div className="grid px-10 pb-5 gap-4 w-full mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <h1 className="text-3xl text-center sm:col-span-2 md:col-span-3 lg:col-span-4">
                Subjects
            </h1>
            <div className="flex gap-2 sm:col-span-2 md:col-span-3 lg:col-span-4">
                <h2 className="text-sm flex gap-2">
                    {semesterList.find((s) => semester === s.value)?.label}{' '}
                    <ChevronRight className="h-4 w-4" />
                </h2>
                <h2 className="text-sm flex gap-2">
                    {branchList.find((b) => branch === b.value)?.label}
                </h2>
            </div>
            {isLoading && (
                <Loader2 className="h-24 w-24 animate-spin mt-5 mx-auto sm:col-span-2 md:col-span-3 lg:col-span-4" />
            )}
            {data &&
                data.map((d: string) => (
                    <Button onClick={() => navigate(`/subject/${semester}/${branch}/${d}`)} size="lg" key={d}>
                        {d}
                    </Button>
                ))}
        </div>
    );
};

export default SubjectsPage;
