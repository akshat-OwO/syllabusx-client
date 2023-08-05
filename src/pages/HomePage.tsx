import {
    ChevronsUpDown,
    Github,
    Loader2,
    MessageSquarePlus,
    SendHorizonal,
} from 'lucide-react';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, buttonVariants } from '../components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { branchList, semesterList } from '../config';
import { useToast } from '../hooks/use-toast';
import { cn } from '../lib/utils';

// type FormOutput = {
//     semester: string;
//     branch: string;
// };

// export const HomeAction: ActionFunction = async ({
//     request,
// }: ActionFunctionArgs) => {
//     const formData = await request.formData();
//     const { semester, branch } = Object.fromEntries(formData) as FormOutput;
//     return redirect(`/${semester}/${branch}`);
// };

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
    const [semester, setSemester] = useState<string>('');
    const [branch, setBranch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSearch = async () => {
        setIsLoading(true);
        if (!semester || !branch) {
            toast({
                title: 'Invalid Input',
                description: 'Please provide semester and branch.',
                variant: 'destructive',
            });
        }
        if (semester || branch) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            navigate(`/search/${semester}/${branch}`);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col gap-4 mt-32 lg:grid lg:grid-cols-3 lg:gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger className="lg:col-start-2">
                    <div
                        className={cn(
                            buttonVariants({
                                size: 'lg',
                                className:
                                    'min-w-[12rem] sm:min-w-[16rem] justify-between px-2',
                            })
                        )}
                    >
                        {semester
                            ? semesterList.find((s) => semester === s.value)
                                  ?.label
                            : 'Semester'}
                        <ChevronsUpDown className="h-4 w-4" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-900 border-black shadow-lg">
                    {semesterList.map((s) => (
                        <DropdownMenuItem
                            key={s.value}
                            onClick={() => setSemester(s.value)}
                        >
                            {s.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger className="lg:col-start-2">
                    <div
                        className={cn(
                            buttonVariants({
                                size: 'lg',
                                className:
                                    'min-w-[12rem] sm:min-w-[16rem] justify-between px-2',
                            })
                        )}
                    >
                        {branch
                            ? branchList.find((b) => branch === b.value)?.label
                            : 'Branch'}
                        <ChevronsUpDown className="h-4 w-4" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-neutral-900 border-black shadow-lg">
                    {branchList.map((b) => (
                        <DropdownMenuItem
                            key={b.value}
                            onClick={() => setBranch(b.value)}
                        >
                            {b.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <Button
                disabled={isLoading}
                isLoading={isLoading}
                onClick={handleSearch}
                className="self-end lg:col-start-2 lg:flex lg:justify-self-end lg:self-start"
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <SendHorizonal className="w-4 h-4" />
                )}
            </Button>
            <a
                className={cn(
                    buttonVariants({
                        variant: 'default',
                        className:
                            'mt-5 gap-3 text-sm lg:row-start-1 lg:col-start-3 lg:justify-self-end lg:self-center lg:mt-0',
                    })
                )}
                href="https://forms.gle/BFTv1uy8L33ptic6A"
                target="_blank"
            >
                Give Us Feedback <MessageSquarePlus className="w-4 h-4" />
            </a>
            <a
                className={cn(
                    buttonVariants({
                        variant: 'default',
                        className:
                            'hidden lg:flex mt-5 gap-3 text-sm lg:row-start-2 lg:col-start-3 lg:justify-self-end lg:self-center lg:mt-0',
                    })
                )}
                href="https://github.com/akshat-OwO/syllabusx-client/"
                target="_blank"
            >
                Contribute to SyllabusX <Github className="w-4 h-4" />
            </a>
        </div>
    );
};

export default HomePage;
