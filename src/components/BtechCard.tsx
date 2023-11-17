'use client';

import { branchList, semesterList } from '@/config';
import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { buttonVariants } from './ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ScrollArea } from './ui/scroll-area';

interface BtechCardProps {}

const BtechCard: FC<BtechCardProps> = ({}) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const semester = searchParams.get('semester');
    const branch = searchParams.get('branch');

    const semesterPusher = (label: string) => {
        if (branch) {
            return router.push(`?semester=${label}&branch=${branch}`)
        }
        return router.push(`?semester=${label}`)
    }

    const branchPusher = (label: string) => {
        if (semester) {
            return router.push(`?semester=${semester}&branch=${label}`)
        }
        return router.push(`?branch=${label}`)
    }

    return (
        <Card className="h-fit shadow-2xl">
            <CardHeader>
                <CardTitle>B.TECH</CardTitle>
                <CardDescription>
                    Who needs sleep when you can engineer dreams?
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className={cn(
                            buttonVariants({
                                variant: !semester ? 'default' : 'outline',
                                className: 'justify-between',
                            })
                        )}
                    >
                        {!semester ? 'Semester' : semester}
                        <ChevronsUpDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                        <ScrollArea className="h-36">
                            {semesterList.map((s) => (
                                <DropdownMenuItem
                                    key={s.value}
                                    onClick={() => semesterPusher(s.label)}
                                >
                                    {s.label}
                                </DropdownMenuItem>
                            ))}
                        </ScrollArea>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className={cn(
                            buttonVariants({
                                variant: !branch ? 'default' : 'outline',
                                className: 'justify-between',
                            })
                        )}
                    >
                        {!branch ? 'Branch' : branch}
                        <ChevronsUpDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                        <ScrollArea className="h-36">
                            {branchList.map((b) => (
                                <DropdownMenuItem
                                    key={b.value}
                                    onClick={() => branchPusher(b.label)}
                                >
                                    {b.label}
                                </DropdownMenuItem>
                            ))}
                        </ScrollArea>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardContent>
        </Card>
    );
};

export default BtechCard;
