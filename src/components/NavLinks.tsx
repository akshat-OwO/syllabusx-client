import { cn } from '@/lib/utils';
import { ChevronDown, Github, Instagram, Menu } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { ModeToggle } from './ModeToggle';
import { Button, buttonVariants } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

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
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="gap-2">
                                        Courses{' '}
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="p-2.5 space-y-2.5">
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/btech"
                                            className="flex justify-center font-semibold cursor-pointer"
                                        >
                                            BTECH
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/bca"
                                            className="flex justify-center font-semibold cursor-pointer"
                                        >
                                            BCA
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 items-center">
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
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="hidden lg:flex gap-5 items-center">
                <Link
                    href="/#pricing"
                    className={cn(buttonVariants({ variant: 'outline' }))}
                >
                    Pricing
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            Courses <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2.5 space-y-2.5">
                        <DropdownMenuItem asChild>
                            <Link
                                href="/btech"
                                className="flex justify-center font-semibold cursor-pointer"
                            >
                                BTECH
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href="/bca"
                                className="flex justify-center font-semibold cursor-pointer"
                            >
                                BCA
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex gap-2 items-center">
                    <a
                        href="https://github.com/akshat-OwO/syllabusx-client"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({ variant: 'outline', size: 'icon' })
                        )}
                        aria-label="github link"
                    >
                        <Github className="h-6 w-6" />
                    </a>
                    <a
                        href="https://www.instagram.com/syllabusx_.live/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({ variant: 'outline', size: 'icon' })
                        )}
                        aria-label="instagram link"
                    >
                        <Instagram className="h-6 w-6" />
                    </a>
                </div>
                <ModeToggle />
            </div>
        </div>
    );
};

export default NavLinks;
