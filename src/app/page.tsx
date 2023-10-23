import BoxesContainer from '@/components/animated/BoxesContainer';
import LayoutWrapper from '@/layouts/LayoutWrapper';

export default function Home() {
    return (
        <div className="h-[calc(100vh-3.5rem)] flex justify-center items-center">
            <LayoutWrapper className='flex h-full justify-between items-center"'>
                <div className="rounded-md px-10 w-[42rem] flex flex-col items-center justify-center gap-5">
                    <h1 className="text-5xl font-bold text-foreground">
                        SyllabusX
                    </h1>

                    <p className="text-2xl font-semibold text-muted-foreground">
                        Your Ultimate IPU resource.
                    </p>
                </div>
                <div className="relative rounded-md w-full overflow-hidden flex justify-center items-center">
                    <div className="absolute inset-0 w-full h-full bg-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
                    <BoxesContainer />
                    <div className='z-30 h-96 w-96 bg-background rounded-md'></div>
                </div>
            </LayoutWrapper>
        </div>
    );
}
