"use client";

import { cn } from "@/lib/utils";
import { Calendar, Github, Instagram, Menu, Search, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import ConfigureAI from "./ai/ConfigureAI";
import ThemeCustomizer from "./theme/theme-customizer";
import AccessibleToolTip from "./ui/accessible-tooltip";
import { Button, buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { useDatesheet } from "@/hooks/use-datesheet";
import { useSearch } from "@/hooks/use-search";
import { CommandShortcut } from "./ui/command";

interface NavLinksProps {}

const kbdKey = () => {
    let isMac = false;
    if (navigator?.userAgent) {
        isMac = navigator.userAgent.includes("Mac");
    }
    return isMac ? "⌘" : "Ctrl";
};

const NavLinks: FC<NavLinksProps> = ({}) => {
    const { onOpen } = useDatesheet();
    const search = useSearch();

    return (
        <>
            <div className="hidden items-center gap-2 md:flex">
                <AccessibleToolTip label="Search">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => search.onOpen()}
                    >
                        <Search className="h-4 w-4" />
                        Search
                        <CommandShortcut>{kbdKey()} K</CommandShortcut>
                    </Button>
                </AccessibleToolTip>
                <AccessibleToolTip label="Github">
                    <a
                        className={cn(
                            buttonVariants({
                                variant: "ghost",
                                size: "icon",
                            })
                        )}
                        href="https://github.com/akshat-OwO/syllabusx-client"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Star className="h-4 w-4" />
                    </a>
                </AccessibleToolTip>
                <AccessibleToolTip label="Instagram">
                    <a
                        className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" })
                        )}
                        href="https://www.instagram.com/syllabusx_.live/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Instagram className="h-4 w-4" />
                    </a>
                </AccessibleToolTip>
                <ConfigureAI />
                <ThemeCustomizer />
            </div>
            <div className="flex gap-2 md:hidden">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => search.onOpen()}
                >
                    <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onOpen()}>
                    <Calendar className="h-4 w-4" />
                </Button>
                <ConfigureAI.MobileTrigger />
                <ConfigureAI />
                <ThemeCustomizer />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <Menu className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <ScrollArea className="h-full pb-10">
                            <ul className="mt-5 grid gap-5">
                                <ListAnchor title="Courses" href="/courses">
                                    Swipe through the academic menu, and let the
                                    learning feast begin!
                                </ListAnchor>
                                <ListAnchor
                                    title="Change Log"
                                    href="/changelog"
                                >
                                    Witness the magic behind SyllabusX&apos;s
                                    updates. Stay nerdy, stay updated!
                                </ListAnchor>
                                <ListAnchor title="About Us" href="/about-us">
                                    Because at SyllabusX, it&apos;s not just
                                    about the code; it&apos;s about the people
                                    who make it happen.
                                </ListAnchor>
                                <ListAnchor
                                    title="Contact Us"
                                    href="/contact-us"
                                >
                                    Navigate to our Contact Us page and shoot a
                                    signal our way!
                                </ListAnchor>
                                <ListAnchor
                                    title="Terms & Conditions"
                                    href="/t&c"
                                >
                                    These guidelines outline the rules of
                                    engagement, responsibilities, and the
                                    collaborative spirit that fuels our
                                    open-source initiative.
                                </ListAnchor>
                                <ListAnchor
                                    title="Privacy Policy"
                                    href="privacy-policy"
                                >
                                    Our Privacy Policy is your trusty guide,
                                    detailing how we collect, use, and protect
                                    your information in this collaborative,
                                    open-source space.
                                </ListAnchor>
                            </ul>
                            <div className="mt-5 flex items-center justify-center gap-2">
                                <AccessibleToolTip label="Instagram">
                                    <a
                                        className={cn(
                                            buttonVariants({
                                                variant: "ghost",
                                                size: "icon",
                                            })
                                        )}
                                        href="https://www.instagram.com/syllabusx_.live/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Instagram className="h-4 w-4" />
                                    </a>
                                </AccessibleToolTip>
                                <AccessibleToolTip label="Github">
                                    <a
                                        className={cn(
                                            buttonVariants({
                                                variant: "ghost",
                                                size: "icon",
                                            })
                                        )}
                                        href="https://github.com/akshat-OwO/syllabusx-client"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github className="h-4 w-4" />
                                    </a>
                                </AccessibleToolTip>
                            </div>
                        </ScrollArea>
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
    const router = useRouter();
    return (
        <SheetClose>
            <button
                className="block select-none space-y-1 rounded-md p-3 text-start leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                onClick={() => router.push(href)}
            >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {children}
                </p>
            </button>
        </SheetClose>
    );
};

export default NavLinks;
