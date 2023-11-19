'use client';

import { bcaSemesterList } from '@/config';
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

interface BcaCardProps {}

const BcaCard: FC<BcaCardProps> = ({}) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const semester = searchParams.get('semester');

    const semesterPusher = (label: string) => {
        return router.push(`?semester=${label}`, { scroll: false });
    };

    return (
        <Card className="col-span-3 lg:col-span-1 h-fit shadow-2xl">
            <CardHeader>
                <CardTitle>BCA</CardTitle>
                <CardDescription>
                    The degree that turns caffeine into code.
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
                            {bcaSemesterList.map((s) => (
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
            </CardContent>
        </Card>
    );
};

export default BcaCard;
