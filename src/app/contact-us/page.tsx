import { buttonVariants } from '@/components/ui/button';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';
import { FC } from 'react';

export const revalidate = 43200;

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    return (
        <LayoutWrapper className="py-20 min-h-[calc(100vh-7rem)]">
            <div className="flex flex-col gap-y-2 items-center">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Let&apos;s Connect: Reach Out to{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500">
                            SyllabusX
                        </span>
                    </h1>
                </div>
                <div className="prose prose-sm prose-neutral dark:prose-invert">
                    <p className="text-center">
                        Have a question, suggestion, or just want to say hello?
                        Our Contact Us page is the portal to connect with the
                        SyllabusX team.
                    </p>
                </div>
            </div>
            <div className="py-10 grid md:justify-center">
                <a
                    href="https://forms.gle/BFTv1uy8L33ptic6A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ className: 'gap-2' }))}
                >
                    Give Us Feedback
                    <MessageSquare className="h-4 w-4" />
                </a>
            </div>
        </LayoutWrapper>
    );
};

export default page;
