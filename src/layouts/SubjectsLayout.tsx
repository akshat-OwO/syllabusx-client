'use client';

import Footer from '@/components/Footer';
import { Icons } from '@/components/Icons';
import Search from '@/components/Search';
import Sidebar from '@/components/Sidebar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';
import { Drawer } from 'vaul';

interface SubjectsLayoutProps {
    children: React.ReactNode;
}

const SubjectsLayout: FC<SubjectsLayoutProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();

    return (
        <Drawer.Root shouldScaleBackground>
            <div className="relative pb-14 sm:pb-20 lg:pb-2 min-h-screen bg-gradient-to-br from-neutral-900 to-black">
                <div className="hidden md:block">
                    <Sidebar open={open} setOpen={setOpen} />
                </div>
                <div className="flex justify-between items-center p-5 shadow-sm">
                    <Icons.logo
                        className="w-36 sm:w-44 xl:w-60 cursor-pointer"
                        onClick={() => router.push('/')}
                    />
                    <div
                        onClick={() => setOpen(!open)}
                        className={cn(
                            buttonVariants({
                                variant: 'default',
                                className: 'px-2 hidden md:flex cursor-pointer',
                            })
                        )}
                    >
                        <Menu className="h-6 w-6" />
                    </div>
                    <Drawer.Trigger asChild className="md:hidden">
                        <div
                            className={cn(
                                buttonVariants({
                                    variant: 'default',
                                    className: 'px-2 cursor-pointer',
                                })
                            )}
                        >
                            <Menu className="h-6 w-6" />
                        </div>
                    </Drawer.Trigger>
                </div>
                {children}
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed h-full inset-0 bg-black/40 md:hidden" />
                    <Drawer.Content className="z-10 bg-gradient-to-br from-neutral-900 to-black flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 md:hidden">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8 mt-4" />
                        <div className="grid justify-center">
                            <Drawer.Title className="mx-auto mb-32">
                                <Icons.logo className="w-36" />
                            </Drawer.Title>
                            <div className="flex flex-col gap-2 mt-0">
                                <Search />
                            </div>
                        </div>
                        <Footer type="" />
                    </Drawer.Content>
                </Drawer.Portal>
            </div>
        </Drawer.Root>
    );
};
export default SubjectsLayout;
