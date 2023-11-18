'use client';

import { cn } from '@/lib/utils';
import { Instagram, Menu, Star } from 'lucide-react';
import { FC } from 'react';
import { ModeToggle } from './ModeToggle';
import { Button, buttonVariants } from './ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';

interface NavLinksProps {}

const NavLinks: FC<NavLinksProps> = ({}) => {
    return (
        <>
            <div className="hidden md:flex items-center gap-2">
                <a
                    className={cn(
                        buttonVariants({ variant: 'ghost', className: 'gap-2' })
                    )}
                    href="https://github.com/akshat-OwO/syllabusx-client"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Star className="h-4 w-4" />
                    Star this project
                </a>
                <a
                    className={cn(
                        buttonVariants({ variant: 'ghost', size: 'icon' })
                    )}
                    href="https://www.instagram.com/syllabusx_.live/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Instagram className="h-4 w-4" />
                </a>
                <ModeToggle />
            </div>
            <div className="block md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant={'ghost'} size={'icon'}>
                            <Menu className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <ul className="mt-5 grid gap-5">
                            <ListAnchor title="Courses" href="/courses">
                                Swipe through the academic menu, and let the
                                learning feast begin!
                            </ListAnchor>
                            <ListAnchor title="Change Log" href="/changelog">
                                Witness the magic behind SyllabusX&apos;s
                                updates. Stay nerdy, stay updated!
                            </ListAnchor>
                        </ul>
                        <div className="mt-5 flex justify-center items-center gap-2">
                            <a
                                className={cn(
                                    buttonVariants({
                                        variant: 'ghost',
                                        size: 'icon',
                                    })
                                )}
                                href="https://www.instagram.com/syllabusx_.live/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a
                                className={cn(
                                    buttonVariants({
                                        variant: 'ghost',
                                        className: 'gap-2',
                                    })
                                )}
                                href="https://github.com/akshat-OwO/syllabusx-client"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Star className="h-4 w-4" />
                                Star this project
                            </a>
                            <ModeToggle />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
};

interface ListAnchorProps {
    href: string;
    title: string;
    children: React.ReactNode;
}

const ListAnchor: FC<ListAnchorProps> = ({ children, href, title }) => {
    return (
        <a
            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            href={href}
        >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
            </p>
        </a>
    );
};

export default NavLinks;
