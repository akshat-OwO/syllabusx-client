import { Menu } from 'lucide-react';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Drawer } from 'vaul';
import Footer from '../components/Footer';
import { Icons } from '../components/Icons';
import Search from '../components/Search';
import { buttonVariants } from '../components/ui/button';
import { cn } from '../lib/utils';

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
    const navigate = useNavigate();
    return (
        <Drawer.Root shouldScaleBackground>
            <div className="h-screen bg-gradient-to-b from-neutral-800 to-black">
                <div className="flex justify-between items-center p-5 shadow-md">
                    <Icons.logo
                        className="w-36 sm:w-64 xl:w-80"
                        onClick={() => navigate('/')}
                    />
                    <Drawer.Trigger asChild>
                        <div
                            className={cn(
                                buttonVariants({
                                    variant: 'default',
                                    className: 'px-2',
                                })
                            )}
                        >
                            <Menu className="h-8 w-8" />
                        </div>
                    </Drawer.Trigger>
                </div>
                <Outlet />
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="bg-gradient-to-b from-neutral-800 to-black flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8 mt-4" />
                        <div className="grid justify-center h-full">
                            <Drawer.Title className="mx-auto">
                                <Icons.logo className="w-36" />
                            </Drawer.Title>
                            <Search />
                        </div>
                        <Footer type="" />
                    </Drawer.Content>
                </Drawer.Portal>
            </div>
        </Drawer.Root>
    );
};

export default Layout;
