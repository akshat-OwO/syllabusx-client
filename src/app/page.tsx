import Footer from '@/components/Footer';
import { Icons } from '@/components/Icons';
import Search from '@/components/Search';

export default function Home() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-neutral-900 to-black">
            <Icons.logo className="w-52 py-5 mx-auto sm:w-64 xl:w-80" />
            <div className="grid place-content-center px-5">
                <div className="flex flex-col gap-4 mt-32 lg:grid lg:grid-cols-3 lg:gap-2 xl:gap-6">
                    {/* Commented out or deleted the Contribute and Feedback buttons
                    <div className="flex flex-col gap-2 w-full justify-center items-center">
                        <a
                            className={cn(
                                buttonVariants({
                                    variant: 'secondary',
                                    className: 'text-sm',
                                })
                            )}
                            href="https://forms.gle/BFTv1uy8L33ptic6A"
                            target="_blank"
                        >
                            Give Us Feedback {' '}
                            <MessageSquarePlus
                                style={{ marginLeft: '5px' }}
                                className="h-4 w-4 xl:h-6 xl:w-6"
                            />
                        </a>
                        <a
                            className={cn(
                                buttonVariants({
                                    variant: 'secondary',
                                    className: 'text-sm',
                                })
                            )}
                            href="https://github.com/akshat-OwO/syllabusx-client/"
                            target="_blank"
                        >
                            Contribute to SyllabusX {' '}
                            <Github
                                style={{ marginLeft: '5px' }}
                                className="w-4 h-4 xl:h-6 xl:w-6"
                            />
                        </a>
                    </div>
                    */}
                    <Search />
                </div>
            </div>
            <Footer type='' />
        </div>
    );
}
