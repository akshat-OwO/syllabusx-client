"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";
import {
    ListItem,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

interface NavMenuProps {}

const NavMenu: FC<NavMenuProps> = ({}) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link href="/courses">Courses</Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                            <ListItem href="/courses/btech" title="B.Tech">
                                Who needs sleep when you can engineer dreams?
                            </ListItem>
                            <ListItem href="/courses/bca" title="BCA">
                                The degree that turns caffeine into code
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/changelog" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Change Log
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavMenu;
