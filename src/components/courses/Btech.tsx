'use client';

import { branchList, semesterList } from '@/config';
import { ChevronsUpDown, Loader2, SendHorizonal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ScrollArea } from '../ui/scroll-area';
import { useToast } from '../ui/use-toast';

interface BtechProps {
    children: React.ReactNode
}

const Btech: FC<BtechProps> = ({children}) => {
    const [semester, setSemester] = useState<string>('');
    const [branch, setBranch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const { toast } = useToast();

    const handleSearch = () => {
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
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>B.Tech</DialogTitle>
                    <DialogDescription>
                        Enter your SEMESTER & BRANCH.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-10">
                    <div className="hidden sm:block h-48 w-48 bg-accent rounded-md" />
                    <div className="flex flex-col gap-5 flex-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={semester ? 'outline' : 'secondary'}
                                    className="justify-between uppercase"
                                >
                                    {semester
                                        ? semesterList.find(
                                              (s) => semester === s.value
                                          )?.label
                                        : 'Semester'}{' '}
                                    <ChevronsUpDown className="h-4 w-4 xl:h-6 xl:w-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                <ScrollArea className="h-32">
                                    {semesterList.map((s) => (
                                        <DropdownMenuItem
                                            key={s.value}
                                            className="font-semibold cursor-pointer"
                                            onClick={() => setSemester(s.value)}
                                        >
                                            {s.label}
                                        </DropdownMenuItem>
                                    ))}
                                </ScrollArea>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={branch ? 'outline' : 'secondary'}
                                    className="justify-between uppercase"
                                >
                                    {branch
                                        ? branchList.find(
                                              (b) => branch === b.value
                                          )?.label
                                        : 'Branch'}{' '}
                                    <ChevronsUpDown className="h-4 w-4 xl:h-6 xl:w-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                <ScrollArea className="h-32">
                                    {branchList.map((b) => (
                                        <DropdownMenuItem
                                            key={b.value}
                                            className="font-semibold cursor-pointer"
                                            onClick={() => setBranch(b.value)}
                                        >
                                            {b.label}
                                        </DropdownMenuItem>
                                    ))}
                                </ScrollArea>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            onClick={handleSearch}
                            disabled={isLoading}
                            className="self-end font-bold gap-2"
                        >
                            <p>GO!</p>
                            {isLoading ? (
                                <Loader2 className="animate-spin w-4 h-4" />
                            ) : (
                                <SendHorizonal className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Btech;
