'use client';

import {
    Book,
    BookCopy,
    ChevronLeft,
    FileQuestion,
    FileText,
    FlaskConical,
    Pencil,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';

interface SubjectNavProps {
    tab: string;
    previousTab: string | undefined;
    setTab: React.Dispatch<React.SetStateAction<string>>;
}

const SubjectNav: FC<SubjectNavProps> = ({ tab, setTab, previousTab }) => {
    const params = useParams();
    const router = useRouter();

    const { semester, branch } = params;

    return (
        <TooltipProvider>
            <div className="fixed grid place-items-center bottom-0 left-0 w-full lg:w-auto lg:bottom-auto lg:left-10 lg:top-[12.9rem] xl:left-10 xl:top-1/2 xl:-translate-y-1/2 bg-neutral-900 z-[2] rounded-t-lg lg:rounded-b-lg p-2">
                <div className="grid grid-cols-7 lg:grid-rows-[7] lg:grid-cols-1 place-items-center w-full gap-1 rounded-lg">
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => {
                                    if (tab === 'pdf')
                                        return setTab(previousTab!);
                                    router.push(`/${semester}/${branch}`);
                                }}
                                className="bg-neutral-50 text-black rounded-md p-2 cursor-pointer"
                            >
                                <ChevronLeft className="h-5 w-5 sm:h-4 sm:w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Go Back
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>Go Back</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('theory')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'theory'
                                            ? 'bg-neutral-300'
                                            : 'bg-neutral-500'
                                    }`
                                }
                            >
                                <Book className="h-5 w-5 sm:h-4 sm:w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Theory
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>Theory</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('lab')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'lab'
                                            ? 'bg-neutral-300'
                                            : 'bg-neutral-500'
                                    }`
                                }
                            >
                                <FlaskConical className="h-5 w-5 sm:h-4 sm:w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Lab
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>Lab</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('notes')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'notes'
                                            ? 'bg-neutral-300'
                                            : 'bg-neutral-500'
                                    }`
                                }
                            >
                                <Pencil className="h-5 w-5 sm:h-4 sm:w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Notes
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>Notes</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('pyqs')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'pyqs'
                                            ? 'bg-neutral-300'
                                            : 'bg-neutral-500'
                                    }`
                                }
                            >
                                <FileQuestion className="h-5 w-5 sm:h-4 sm:w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                PYQs
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>PYQs</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('books')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'books'
                                            ? 'bg-neutral-300'
                                            : 'bg-neutral-500'
                                    }`
                                }
                            >
                                <BookCopy className="h-5 w-5 sm:h-4 sm:w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Books
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>Books</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('practical files')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'practical files'
                                            ? 'bg-neutral-300'
                                            : 'bg-neutral-500'
                                    }`
                                }
                            >
                                <FileText className="h-5 w-5 sm:h-4 sm:w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Practical Files
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>Practical Files</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default SubjectNav;
