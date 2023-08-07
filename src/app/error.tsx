'use client';

import { Icons } from '@/components/Icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

interface errorProps {}

const error: FC<errorProps> = ({}) => {
    return (
        <div className="relative min-h-screen text-neutral-50 bg-gradient-to-br from-neutral-900 to-black">
            <Icons.logo className="w-52 py-5 mx-auto sm:w-64 xl:w-80" />
            <div className='grid gap-4 place-content-center px-5"'>
                <h1 className="text-3xl">404 Page Not Found</h1>
                <p className="text-center">
                    Go back to{' '}
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'sm' })
                        )}
                    >
                        Home
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default error;
