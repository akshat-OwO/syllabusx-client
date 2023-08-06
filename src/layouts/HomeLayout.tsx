import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { Icons } from '../components/Icons';

interface HomeLayoutProps {}

const HomeLayout: FC<HomeLayoutProps> = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-neutral-800 to-black">
            <Icons.logo className="w-52 py-5 mx-auto sm:w-64 xl:w-80" />
            <div className="grid place-content-center">
                <Outlet />
            </div>
            <Footer type="" />
        </div>
    );
};

export default HomeLayout;
