import { cn } from '@/lib/utils';
import {
    ChevronDown,
    Github,
    Heart,
    Instagram,
    LibraryBig,
    Menu,
    Star,
} from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { ModeToggle } from './ModeToggle';
import Btech from './courses/Btech';
import { Button, buttonVariants } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';

interface NavLinksProps {}

const NavLinks: FC<NavLinksProps> = ({}) => {
    return (
        <div>
            <div className="lg:hidden flex gap-2 items-center">
                <ModeToggle />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <div className="relative flex flex-col h-full gap-5 justify-center items-center">
                            <DropdownMenu>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="gap-2"
                                                >
                                                    <LibraryBig className="h-6 w-6" />{' '}
                                                    Courses{' '}
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Browse Courses</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <DropdownMenuContent className="p-2.5 space-y-2.5">
                                    <DropdownMenuItem asChild>
                                        <Btech />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <a
                                                href="https://github.com/akshat-OwO/syllabusx-client"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(
                                                    buttonVariants({
                                                        variant: 'outline',
                                                        size: 'icon',
                                                    })
                                                )}
                                                aria-label="github link"
                                            >
                                                <Github className="h-6 w-6" />
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="flex items-center gap-2">
                                                <Star className="text-foreground h-4 w-4" />
                                                Star This Project
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <a
                                                href="https://www.instagram.com/syllabusx_.live/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(
                                                    buttonVariants({
                                                        variant: 'outline',
                                                        size: 'icon',
                                                    })
                                                )}
                                                aria-label="instagram link"
                                            >
                                                <Instagram className="h-6 w-6" />
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="flex items-center gap-2">
                                                <Heart className="text-foreground h-4 w-4" />
                                                Follow Us
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden lg:flex gap-5 items-center">
                <DropdownMenu>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="gap-2">
                                        <LibraryBig className="h-6 w-6" />{' '}
                                        Courses{' '}
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Browse Courses</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DropdownMenuContent className="p-2.5 space-y-2.5">
                        <DropdownMenuItem asChild>
                            <Btech />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex gap-2 items-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a
                                    href="https://github.com/akshat-OwO/syllabusx-client"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        buttonVariants({
                                            variant: 'outline',
                                            size: 'icon',
                                        })
                                    )}
                                    aria-label="github link"
                                >
                                    <Github className="h-6 w-6" />
                                </a>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="flex items-center gap-2">
                                    <Star className="text-foreground h-4 w-4" />
                                    Star This Project
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a
                                    href="https://www.instagram.com/syllabusx_.live/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        buttonVariants({
                                            variant: 'outline',
                                            size: 'icon',
                                        })
                                    )}
                                    aria-label="instagram link"
                                >
                                    <Instagram className="h-6 w-6" />
                                </a>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="flex items-center gap-2">
                                    <Heart className="text-foreground h-4 w-4" />
                                    Follow Us
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <ModeToggle />
            </div>
        </div>
    );
};

export default NavLinks;
