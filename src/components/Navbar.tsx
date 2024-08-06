import LayoutWrapper from "@/layouts/LayoutWrapper";
import Link from "next/link";
import { FC } from "react";
import { Icons } from "./Icons";
import NavLinks from "./NavLinks";
import NavMenu from "./NavMenu";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
    return (
        <nav className="sticky inset-x-0 top-0 z-50 h-14 w-full bg-background/50 backdrop-blur-lg transition-all">
            <LayoutWrapper className="md:max-w-none md:px-16">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex items-center gap-x-10">
                        <Link
                            href="/"
                            aria-label="home page"
                            className="z-40 flex items-center gap-x-1.5 font-semibold"
                        >
                            <Icons.x aria-label="syllabus x" className="w-6" />{" "}
                            <p className="text-lg text-neutral-900 transition hover:opacity-75 dark:text-neutral-50">
                                SyllabusX
                            </p>
                        </Link>
                        <div className="hidden lg:flex">
                            <NavMenu />
                        </div>
                    </div>
                    <NavLinks />
                </div>
            </LayoutWrapper>
        </nav>
    );
};

export default Navbar;
