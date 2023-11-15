import LayoutWrapper from '@/layouts/LayoutWrapper';
import Link from 'next/link';
import { FC } from 'react';
import { Icons } from './Icons';
import NavLinks from './NavLinks';
import NavMenu from './NavMenu';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
    return (
        <nav className="sticky inset-x-0 top-0 z-10 h-14 w-full bg-background/50 border-b border-border backdrop-blur-sm transition-all">
            <LayoutWrapper>
                <div className="h-14 flex items-center justify-between border-b border-border">
                    <div className="flex items-center gap-x-10">
                        <Link
                            href="/"
                            aria-label="home page"
                            className="flex items-center gap-x-1.5 z-40 font-semibold"
                        >
                            <Icons.x aria-label="syllabus x" className="w-6" />{' '}
                            <p className="text-primary text-lg hover:text-primary/75 transition">
                                SyllabusX
                            </p>
                        </Link>
                        <div className="hidden md:flex">
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
