import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ChevronRight, Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubjectNav from '../components/SubjectNav';
import Theory from '../components/Theory';
import { branchList, semesterList } from '../config';

interface SubjectPageProps {}

const SubjectPage: FC<SubjectPageProps> = () => {
    const [tab, setTab] = useState<string>('theory');

    const params = useParams();

    const { semester, branch, subject } = params;

    const { data, isLoading, error } = useQuery({
        queryKey: ['subject', `${semester}`, `${branch}`, `${subject}`],
        queryFn: async () => {
            const response = (await axios.get(
                `https://server.syllabusx.live/${semester}/${branch}/${subject}`
            )) as AxiosResponse;
            console.log(response.data);
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
        <>
            <SubjectNav tab={tab} setTab={setTab} />
            <div className="grid sm:px-10 lg:px-44 xl:px-60 gap-2 w-full mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="flex px-5 gap-2 sm:col-span-2 md:col-span-3 lg:col-span-4">
                    <h2 className="text-sm flex gap-2">
                        {semesterList.find((s) => semester === s.value)?.label}{' '}
                        <ChevronRight className="h-4 w-4" />
                    </h2>
                    <h2 className="text-sm flex gap-2">
                        {branchList.find((b) => branch === b.value)?.label}
                    </h2>
                </div>
                <h1 className="text-2xl lg:text-3xl text-center sm:col-span-2 md:col-span-3 lg:col-span-4">
                    {subject}
                </h1>
                {isLoading && (
                    <Loader2 className="h-24 w-24 animate-spin mt-5 mx-auto sm:col-span-2 md:col-span-3 lg:col-span-4" />
                )}
                {data && (
                    <>
                        <div className="p-2 sm:col-span-2 md:col-span-3 lg:col-span-4 lg:mt-5 grid gap-2 bg-neutral-900/80 rounded-lg">
                            <div className="p-2 bg-neutral-800/80 rounded-lg">
                                <p className="flex text-sm lg:text-base items-center justify-between">
                                    Theory Code{' '}
                                    <span>{data[0].theorypapercode ? (data[0].theorypapercode) : "N/A"}</span>
                                </p>
                                <p className="flex text-sm lg:text-base items-center justify-between">
                                    Theory Credits{' '}
                                    <span>{data[0].theorycredits ? (data[0].theorycredits): "N/A"}</span>
                                </p>
                                <p className="flex text-sm lg:text-base items-center justify-between">
                                    Lab Code <span>{data[0].labpapercode ? (data[0].labpapercode) : "N/A"}</span>
                                </p>
                                <p className="flex text-sm lg:text-base items-center justify-between">
                                    Lab Credits <span>{data[0].labcredits ? (data[0].labcredits) : "N/A"}</span>
                                </p>
                            </div>
                            {tab === 'theory' && <Theory theory={data[0].theory} />}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default SubjectPage;
