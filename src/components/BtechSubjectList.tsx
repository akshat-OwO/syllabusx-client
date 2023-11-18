'use client';

import { branchList, semesterList, server } from '@/config';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { Button } from './ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { Skeleton } from './ui/skeleton';

interface BtechSubjectListProps {}

const BtechSubjectList: FC<BtechSubjectListProps> = ({}) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const semester = searchParams.get('semester');
    const branch = searchParams.get('branch');

    const queryClient = useQueryClient();

    const {
        data: list,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['btech', 'subjects', `${semester}`, `${branch}`],
        queryFn: async () => {
            if (
                !semesterList.some((s) => semester === s.label) ||
                !branchList.some((b) => branch === b.value)
            ) {
                throw new AxiosError('Please check semester and branch.');
            }
            const response = (await axios.get(
                `${server}${
                    semesterList.find((s) => semester === s.label)?.value
                }/${branchList.find((b) => branch === b.label)?.value}`
            )) as AxiosResponse;
            return response.data;
        },
    });

    if (!semester || !branch) <></>;

    if (isLoading) {
        return (
            <Card className="col-span-3 lg:col-span-2 shadow-2xl h-fit">
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-8 w-48" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="h-5 w-52 " />
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-5">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="col-span-3 lg:col-span-2 shadow-2xl h-fit">
                <CardHeader>
                    <CardTitle>Temporary Glitch in the Matrix</CardTitle>
                    <CardDescription>
                        Something went wrong! {error.message}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-accent rounded-md h-[7.5rem] w-full" />
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            {list && (
                <Card className="col-span-3 lg:col-span-2 shadow-2xl">
                    <CardHeader>
                        <CardTitle>Subjects</CardTitle>
                        <CardDescription>
                            Click on any subject to unveil its syllabus. Spoiler
                            alert: courage required
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea type="always" className="h-28 pr-5">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-5">
                                {list.map((subject: string) => (
                                    <Button
                                        className="whitespace-normal h-auto shadow-md"
                                        variant={'secondary'}
                                        size={'default'}
                                        key={subject}
                                        onClick={() =>
                                            router.push(
                                                `?semester=${semester}&branch=${branch}&subject=${_.kebabCase(
                                                    subject
                                                )}`
                                            )
                                        }
                                    >
                                        {subject}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar />
                        </ScrollArea>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default BtechSubjectList;
