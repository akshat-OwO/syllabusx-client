'use client';

import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { buttonVariants } from './ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';

interface BtechSearchStepCardProps {}

const BtechSearchStepCard: FC<BtechSearchStepCardProps> = ({}) => {
    const searchParams = useSearchParams();

    const semester = searchParams.get('semester');
    const branch = searchParams.get('branch');

    if (semester && branch) {
        return <></>;
    }

    return (
        <Card className="col-span-3 lg:col-span-2 shadow-2xl">
            <CardHeader>
                <CardTitle>Simplified Subject Search</CardTitle>
                <CardDescription>
                    Effortlessly explore subjects in just three easy steps.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid sm:grid-cols-3 items-center gap-5">
                    <div
                        className={cn(
                            buttonVariants({
                                variant: 'secondary',
                                className:
                                    'prose dark:prose-invert prose-neutral h-full flex-col gap-2 items-start',
                            })
                        )}
                    >
                        <h4>Step 1</h4>
                        <p>Enter your Semester.</p>
                    </div>
                    <div
                        className={cn(
                            buttonVariants({
                                variant: 'secondary',
                                className:
                                    'prose dark:prose-invert prose-neutral h-full flex-col gap-2 items-start',
                            })
                        )}
                    >
                        <h4>Step 2</h4>
                        <p>Enter your Branch.</p>
                    </div>
                    <div
                        className={cn(
                            buttonVariants({
                                variant: 'secondary',
                                className:
                                    'prose dark:prose-invert prose-neutral h-full flex-col gap-2 items-start',
                            })
                        )}
                    >
                        <h4>Step 3</h4>
                        <p>There is no Step 3.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BtechSearchStepCard;
