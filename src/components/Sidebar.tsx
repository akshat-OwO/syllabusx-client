import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { FC, Fragment } from 'react';
import Footer from './Footer';
import { Icons } from './Icons';
import Search from './Search';
import { Button } from './ui/button';

interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({ open, setOpen }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute -left-2 -top-1 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <Button
                                                type="button"
                                                className="relative rounded-md focus:outline-none focus:ring-2 focus:ring-white px-2"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">
                                                    Close panel
                                                </span>
                                                <X
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        </div>
                                    </Transition.Child>
                                    <div className="grid justify-center min-h-screen bg-gradient-to-b from-neutral-800 to-black py-6 shadow-xl">
                                        <div className="justify-self-center">
                                            <Dialog.Title className="text-base text-center font-semibold leading-6 text-gray-900">
                                                <Icons.logo className="w-36" />
                                            </Dialog.Title>
                                        </div>
                                        <div className="relative sm:px-6">
                                            <Search setOpen={setOpen} />
                                        </div>
                                        <Footer type="search" />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Sidebar;
