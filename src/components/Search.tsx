'use client';

import { branchList, semesterList } from '@/config';
import { cn } from '@/lib/utils';
import { ChevronsUpDown, Loader2, SendHorizonal } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { Button, buttonVariants } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from './ui/use-toast';

interface SearchProps {
    where?: string;
}

const Search: FC<SearchProps> = ({ where }) => {
    const params = useParams();

    const [semester, setSemester] = useState<string>(
        semesterList.find((s) => params.semester === s.label)?.value || ''
    );
    const [branch, setBranch] = useState<string>(
        branchList.find((b) => params.branch === b.label)?.value || ''
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const router = useRouter();

    const handleSearch = async () => {
        setIsLoading(true);
        if (!semester || !branch) {
            toast({
                title: 'Invalid Input',
                description: 'Please provide semester and branch.',
                variant: 'destructive',
            });
            setIsLoading(false);
        }
        if (semester && branch) {
            router.push(
                `/${semesterList.find((s) => semester === s.value)?.label}/${
                    branchList.find((b) => branch === b.value)?.label
                }`
            );
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="lg:col-start-2">
                    <div
                        className={cn(
                            buttonVariants({
                                size: 'lg',
                                className:
                                    'min-w-[12rem] sm:min-w-[16rem] xl:min-w-[20rem] xl:text-lg justify-between px-2',
                            })
                        )}
                    >
                        {semester
                            ? semesterList.find((s) => semester === s.value)
                                  ?.label
                            : 'Semester'}
                        <ChevronsUpDown className="h-4 w-4 xl:h-6 xl:w-6" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-900 border-black shadow-lg min-w-[12rem] sm:min-w-[16rem] xl:min-w-[20rem] xl:text-lg">
                    <ScrollArea className="h-32">
                        {semesterList.map((s) => (
                            <DropdownMenuItem
                                key={s.value}
                                onClick={() => setSemester(s.value)}
                            >
                                {s.label}
                            </DropdownMenuItem>
                        ))}
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger className="lg:col-start-2">
                    <div
                        className={cn(
                            buttonVariants({
                                size: 'lg',
                                className:
                                    'min-w-[12rem] sm:min-w-[16rem] xl:min-w-[20rem] xl:text-lg justify-between px-2',
                            })
                        )}
                    >
                        {branch
                            ? branchList.find((b) => branch === b.value)?.label
                            : 'Branch'}
                        <ChevronsUpDown className="h-4 w-4 xl:h-6 xl:w-6" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-900 border-black shadow-lg min-w-[12rem] sm:min-w-[16rem] xl:min-w-[20rem] xl:text-lg">
                    <ScrollArea className="h-32">
                        {branchList.map((b) => (
                            <DropdownMenuItem
                                key={b.value}
                                onClick={() => setBranch(b.value)}
                            >
                                {b.label}
                            </DropdownMenuItem>
                        ))}
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button
                disabled={isLoading}
                onClick={handleSearch}
                className={
                    'self-end lg:col-start-2 lg:flex lg:justify-self-end lg:self-start' +
                    `${where === 'sidebar' ? ' lg:self-end' : ''}`
                }
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 xl:h-6 xl:w-6 animate-spin" />
                ) : (
                    <SendHorizonal className="w-4 h-4 xl:h-6 xl:w-6" />
                )}
            </Button>
        </>
    );
};

export default Search;
