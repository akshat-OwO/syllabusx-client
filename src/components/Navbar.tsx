import LayoutWrapper from '@/layouts/LayoutWrapper';
import Link from 'next/link';
import { FC } from 'react';
import { Icons } from './Icons';
import NavLinks from './NavLinks';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
    return (
        <nav className="sticky inset-x-0 top-0 z-10 h-14 w-full bg-background/50 border-b border-border backdrop-blur-sm transition-all">
            <LayoutWrapper>
                <div className="h-14 flex items-center justify-between border-b border-border">
                    <Link
                        href="/"
                        aria-label='home page'
                        className="flex items-center gap-x-2.5 z-40 font-semibold"
                    >
                        <Icons.x
                            aria-label="syllabus x"
                            className="w-10 h-full"
                        />{' '}
                        <p className="text-primary text-lg hover:text-primary/75 transition">
                            SyllabusX
                        </p>
                    </Link>
                    <NavLinks />
                </div>
            </LayoutWrapper>
        </nav>
    );
};

export default Navbar;
