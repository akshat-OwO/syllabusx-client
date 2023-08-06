import { ChevronsUpDown, Loader2, SendHorizonal } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Drawer } from 'vaul';
import { branchList, semesterList } from '../config';
import { useToast } from '../hooks/use-toast';
import { cn } from '../lib/utils';
import { Button, buttonVariants } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface SearchProps {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: FC<SearchProps> = ({ setOpen }) => {
    const [semester, setSemester] = useState<string>('');
    const [branch, setBranch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.semester) setSemester(params.semester);
        if (params.branch) setBranch(params.branch);
    }, [params]);

    const handleSearch = async () => {
        setIsLoading(true);
        if (!semester || !branch) {
            toast({
                title: 'Invalid Input',
                description: 'Please provide semester and branch.',
                variant: 'destructive',
            });
        }
        if (semester || branch) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            navigate(`/search/${semester}/${branch}`);
        }
        if (setOpen) setOpen(false);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-2 mt-0">
            <DropdownMenu>
                <DropdownMenuTrigger>
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
            <Drawer.Close asChild>
                <Button
                    disabled={isLoading}
                    isLoading={isLoading}
                    onClick={handleSearch}
                    className="self-end"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 xl:h-6 xl:w-6 animate-spin" />
                    ) : (
                        <SendHorizonal className="w-4 h-4 xl:h-6 xl:w-6" />
                    )}
                </Button>
            </Drawer.Close>
        </div>
    );
};

export default Search;
