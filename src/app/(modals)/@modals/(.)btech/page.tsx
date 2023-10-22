'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { branchList, semesterList } from '@/config';
import {
    ChevronLeft,
    ChevronsUpDown,
    Loader2,
    SendHorizonal,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
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
        <div className="fixed flex justify-center items-center inset-0 h-screen z-50 bg-background/50 backdrop-blur-sm">
            <Card>
                <CardHeader>
                    <CardTitle>BTECH</CardTitle>
                    <CardDescription>
                        Enter your SEMESTER and BRANCH.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
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
                                    ? branchList.find((b) => branch === b.value)
                                          ?.label
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
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="w-4 h-4 xl:h-6 xl:w-6" />
                    </Button>
                    <Button
                        onClick={handleSearch}
                        disabled={isLoading}
                        size={'icon'}
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin w-4 h-4 xl:h-6 xl:w-6" />
                        ) : (
                            <SendHorizonal className="w-4 h-4 xl:h-6 xl:w-6" />
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Page;
