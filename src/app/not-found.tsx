import LayoutWrapper from '@/layouts/LayoutWrapper';
import Link from 'next/link';
import { FC } from 'react';

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}) => {
    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-7rem)]">
            <div className="flex flex-col gap-y-2 items-center">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Oops! Page Not{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500">
                            Found
                        </span>
                    </h1>
                </div>
                <div className="prose prose-sm prose-neutral dark:prose-invert">
                    <p className="text-center">
                        It seems you&apos;ve ventured into uncharted territory.
                        The page you are looking for might have taken a detour
                        or never existed in the first place.
                    </p>
                    <p className="text-center">
                        You can return to the <Link href="/">Homepage</Link> or
                        try searching for what you&apos;re looking for.
                    </p>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default NotFound;
