import {
    Book,
    BookCopy,
    ChevronLeft,
    FileQuestion,
    FileText,
    FlaskConical,
    Pencil,
} from 'lucide-react';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';

interface SubjectNavProps {
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
}

const SubjectNav: FC<SubjectNavProps> = ({ tab, setTab }) => {
    const params = useParams();
    const navigate = useNavigate();

    const { semester, branch } = params;

    return (
        <TooltipProvider>
            <div className="fixed grid place-items-center bottom-0 left-0 w-full lg:w-auto lg:bottom-auto lg:left-10 lg:top-[14.4rem] xl:left-10 xl:top-[15.65rem] bg-neutral-900 rounded-lg p-2">
                <div className="grid grid-cols-7 lg:grid-rows-[7] lg:grid-cols-1 place-items-center w-full gap-1 rounded-lg">
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() =>
                                    navigate(`/search/${semester}/${branch}`)
                                }
                                className="bg-primary text-black rounded-md p-2 cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Go Back
                            </p>
                        </TooltipTrigger>
                        <TooltipContent className="bg-primary text-black">
                            Go Back
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('theory')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'theory'
                                            ? 'bg-neutral-600'
                                            : 'bg-neutral-800/80'
                                    }`
                                }
                            >
                                <Book className="h-4 w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Theory
                            </p>
                        </TooltipTrigger>
                        <TooltipContent className="bg-primary text-black">
                            Theory
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('lab')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'lab'
                                            ? 'bg-neutral-600'
                                            : 'bg-neutral-800/80'
                                    }`
                                }
                            >
                                <FlaskConical className="h-4 w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Lab
                            </p>
                        </TooltipTrigger>
                        <TooltipContent className="bg-primary text-black">
                            Lab
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('notes')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'notes'
                                            ? 'bg-neutral-600'
                                            : 'bg-neutral-800/80'
                                    }`
                                }
                            >
                                <Pencil className="h-4 w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Notes
                            </p>
                        </TooltipTrigger>
                        <TooltipContent className="bg-primary text-black">
                            Notes
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('pyqs')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'pyqs'
                                            ? 'bg-neutral-600'
                                            : 'bg-neutral-800/80'
                                    }`
                                }
                            >
                                <FileQuestion className="h-4 w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                PYQs
                            </p>
                        </TooltipTrigger>
                        <TooltipContent className="bg-primary text-black">
                            PYQs
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('books')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'books'
                                            ? 'bg-neutral-600'
                                            : 'bg-neutral-800/80'
                                    }`
                                }
                            >
                                <BookCopy className="h-4 w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Books
                            </p>
                        </TooltipTrigger>
                        <TooltipContent className="bg-primary text-black">
                            Books
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger className="sm:flex sm:flex-col sm:gap-1 sm:items-center sm:justify-center">
                            <div
                                onClick={() => setTab('practical files')}
                                className={
                                    'rounded-md p-2 cursor-pointer transition ' +
                                    `${
                                        tab === 'practical files'
                                            ? 'bg-neutral-600'
                                            : 'bg-neutral-800/80'
                                    }`
                                }
                            >
                                <FileText className="h-4 w-4 pointer-events-none" />
                            </div>
                            <p className="hidden sm:block text-xs text-neutral-400">
                                Practical Files
                            </p>
                        </TooltipTrigger>
                        <TooltipContent className="bg-primary text-black">
                            Practical Files
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default SubjectNav;
