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

interface BcaSearchStepCardProps {}

const BcaSearchStepCard: FC<BcaSearchStepCardProps> = ({}) => {
    const searchParams = useSearchParams();

    const semester = searchParams.get('semester');

    if (semester) {
        return <></>;
    }

    return (
        <Card className="col-span-3 lg:col-span-2 shadow-2xl">
            <CardHeader>
                <CardTitle>Simplified Subject Search</CardTitle>
                <CardDescription>
                    Effortlessly explore subjects in just two easy steps.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 items-center gap-5">
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
                        <p>There is no Step 2.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BcaSearchStepCard;
