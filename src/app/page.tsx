import Footer from '@/components/Footer';
import { Icons } from '@/components/Icons';
import Search from '@/components/Search';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    Github,
    MessageSquarePlus
} from 'lucide-react';

export default function Home() {

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-neutral-900 to-black">
            <Icons.logo className="w-52 py-5 mx-auto sm:w-64 xl:w-80" />
            <div className='grid place-content-center px-5"'>
                <div className="flex flex-col gap-4 mt-32 lg:grid lg:grid-cols-3 lg:gap-2 xl:gap-6">
                    <Search />
                    <a
                        className={cn(
                            buttonVariants({
                                variant: 'default',
                                className:
                                    'mt-5 gap-3 text-sm lg:row-start-1 lg:col-start-3 lg:justify-self-end lg:self-center lg:mt-0 xl:text-lg',
                            })
                        )}
                        href="https://forms.gle/BFTv1uy8L33ptic6A"
                        target="_blank"
                    >
                        Give Us Feedback{' '}
                        <MessageSquarePlus className="w-4 h-4 xl:h-6 xl:w-6" />
                    </a>
                    <a
                        className={cn(
                            buttonVariants({
                                variant: 'default',
                                className:
                                    'hidden lg:flex mt-5 gap-3 text-sm lg:row-start-2 lg:col-start-3 lg:justify-self-end lg:self-center lg:mt-0 xl:text-lg',
                            })
                        )}
                        href="https://github.com/akshat-OwO/syllabusx-client/"
                        target="_blank"
                    >
                        Contribute to SyllabusX{' '}
                        <Github className="w-4 h-4 xl:h-6 xl:w-6" />
                    </a>
                </div>
            </div>
            <Footer type='' />
        </div>
    );
}
