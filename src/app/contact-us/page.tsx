import { buttonVariants } from '@/components/ui/button';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import { cn } from '@/lib/utils';
import { Instagram, Mail, MessageSquare } from 'lucide-react';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
    title: 'Contact Us',
    description:
        "Let's connect! Have questions, suggestions, or just want to say hello? Navigate to our Contact Us page – the portal to connect with the SyllabusX team. Your feedback fuels our commitment to simplifying student life. Give us your insights, and let's shape the future of academic navigation together.",
};

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
            <div className="py-10 grid gap-5 md:grid-cols-3 md:justify-center">
                <a
                    href="https://forms.gle/BFTv1uy8L33ptic6A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ className: 'gap-2' }))}
                >
                    Give Us Feedback
                    <MessageSquare className="h-4 w-4" />
                </a>
                <a
                    href="https://www.instagram.com/syllabusx_.live/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ className: 'gap-2' }))}
                >
                    DM on Instagram <Instagram className="h-4 w-4" />
                </a>
                <a
                    href="mailto:iboard990@gmail.com"
                    target="_blank"
                    className={cn(buttonVariants({ className: 'gap-2' }))}
                >
                    Mail us <Mail className="h-4 w-4" />
                </a>
            </div>
        </LayoutWrapper>
    );
};

export default page;
