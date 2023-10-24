import LayoutWrapper from '@/layouts/LayoutWrapper';

export default function Home() {
    return (
        <div className="h-[calc(100vh-3.5rem)] flex justify-center items-center">
            <LayoutWrapper className='flex h-full justify-between items-center"'>
                <div className="rounded-md px-10 w-[42rem] flex flex-col justify-center gap-5">
                    <h1 className="text-5xl font-bold text-foreground">
                        SyllabusX
                    </h1>

                    <p className="text-2xl font-semibold text-muted-foreground">
                        Your Ultimate IPU resource.
                    </p>
                </div>
                
            </LayoutWrapper>
        </div>
    );
}
