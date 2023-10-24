import Btech from '@/components/courses/Btech';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import LayoutWrapper from '@/layouts/LayoutWrapper';
import { CheckCircle2 } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <LayoutWrapper className='flex h-[calc(100vh-3.5rem)] justify-between items-center"'>
                <div className="flex flex-col justify-center gap-5">
                    <h1 className="text-5xl font-bold text-foreground">
                        SyllabusX
                    </h1>

                    <p className="text-2xl font-semibold text-muted-foreground">
                        Your Ultimate IPU resource.
                    </p>
                </div>
                <div className="h-96 max-w-xl bg-accent rounded-md flex-1 self-center" />
            </LayoutWrapper>
            <LayoutWrapper className="pb-20">
                <div className="flex flex-col items-center gap-10">
                    <h2 className="text-accent-foreground font-semibold text-3xl">
                        We&apos;ve got your back
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-5 sm:gap-y-10 justify-center items-center">
                        <div className="flex gap-2 items-center">
                            <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                            <p>Up-to-Date Information</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                            <p>Comprehensive Coverage</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                            <p>User Friendly Interface</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                            <p>Open Source</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                            <p>Constant Updates</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <CheckCircle2 className="h-8 w-8 fill-green-500 stroke-background" />
                            <p>Feedback Loop</p>
                        </div>
                    </div>
                </div>
            </LayoutWrapper>
            <LayoutWrapper className="py-20">
                <div className="flex justify-center gap-20">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-accent-foreground font-semibold text-3xl">
                                Live on the edge
                            </h3>
                            <p className="text-muted-foreground text-2xl font-semibold">
                                We plan to support every IPU course.
                            </p>
                        </div>
                        <div className="h-72 w-72 bg-accent rounded-md" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Btech>
                            <Button
                                variant={'secondary'}
                                className="w-48 h-full"
                            >
                                B.TECH
                            </Button>
                        </Btech>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-48 h-full"
                        >
                            BCA
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-48 h-full"
                        >
                            BBA
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-48 h-full"
                        >
                            B.COM
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-48 h-full"
                        >
                            B.Ed
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-48 h-full"
                        >
                            LLB
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-48 h-full"
                        >
                            B.A
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-48 h-full"
                        >
                            BHMCT
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-48 h-full"
                        >
                            B.Voc
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-48 h-full"
                        >
                            B.DESIGN
                        </Button>
                        <Button
                            variant={'outline'}
                            disabled
                            className="w-48 h-full"
                        >
                            Coming Soon...
                        </Button>
                    </div>
                </div>
            </LayoutWrapper>
        </div>
    );
}
