'use client';

import { branchList, semesterList } from '@/config';
import { cn } from '@/lib/utils';
import { ChevronsUpDown, Loader2, SendHorizonal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { Button, buttonVariants } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useToast } from './ui/use-toast';

interface SearchProps {
    where?: string;
}

const Search: FC<SearchProps> = ({ where }) => {
    const [semester, setSemester] = useState<string>('');
    const [branch, setBranch] = useState<string>('');
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
        }
        if (semester && branch) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            router.push(`/${semester}/${branch}`);
        }
        setIsLoading(false);
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
                <DropdownMenuContent className="bg-neutral-900 border-black shadow-lg">
                    {semesterList.map((s) => (
                        <DropdownMenuItem
                            key={s.value}
                            onClick={() => setSemester(s.value)}
                        >
                            {s.label}
                        </DropdownMenuItem>
                    ))}
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
                <DropdownMenuContent className="bg-neutral-900 border-black shadow-lg">
                    {branchList.map((b) => (
                        <DropdownMenuItem
                            key={b.value}
                            onClick={() => setBranch(b.value)}
                        >
                            {b.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <Button
                disabled={isLoading}
                isLoading={isLoading}
                onClick={handleSearch}
                className={"self-end lg:col-start-2 lg:flex lg:justify-self-end lg:self-start" + `${where === 'sidebar' ? ' lg:self-end' : ''}`}
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
