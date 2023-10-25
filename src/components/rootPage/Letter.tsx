import LayoutWrapper from '@/layouts/LayoutWrapper';
import { FC } from 'react';

interface LetterProps {}

const Letter: FC<LetterProps> = ({}) => {
    return (
        <LayoutWrapper className="py-20">
            <div className="flex flex-col gap-10 justify-center">
                <div className="flex flex-col items-center gap-5">
                    <h3 className="text-accent-foreground font-semibold text-xl md:text-3xl">
                        An Open Letter.
                    </h3>
                </div>
                <div className="p-3.5 prose text-foreground mx-auto bg-accent rounded-md">
                    <p>
                        Hey there, fellow students and academic aficionados!
                        Ever found yourself endlessly scrolling through endless
                        PDFs, desperately searching for syllabi and study
                        materials scattered across the internet? You&apos;re not
                        alone, and we&apos;ve got something that&apos;ll make
                        you wonder why you ever put up with it in the first
                        place.
                    </p>
                    <p className="font-semibold text-lg underline underline-offset-2">
                        Vision: Making Student Life Easier
                    </p>
                    <p>
                        At SyllabusX, we understand the struggles students face
                        when trying to access syllabi and study materials for
                        their courses at Guru Gobind Singh Indraprastha
                        University (GGSIPU). We&apos;ve been there, done that,
                        and we decided it was high time to make student life a
                        whole lot easier.
                    </p>
                    <p>
                        Our vision is simple: No more countless hours wasted
                        scrolling through labyrinthine PDFs, no more hopping
                        from one website to another in search of study
                        materials. We envisioned a world where students could
                        access all their academic needs in one place,
                        hassle-free.
                    </p>
                    <p className="font-semibold text-lg underline underline-offset-2">
                        Goal: Covering All IPU Courses
                    </p>
                    <p>
                        Our goal is as straightforward as it gets: We want to
                        cover all courses offered by GGSIPU. From B.Tech to BCA,
                        from the mainstream to the niche, we&apos;re on a
                        mission to provide comprehensive coverage of the entire
                        GGSIPU curriculum.
                    </p>
                    <p>
                        We want every student, regardless of their program or
                        semester, to find what they need at SyllabusX. We
                        believe in the power of open-source collaboration, and
                        that&apos;s why we&apos;re calling on developers,
                        academics, and students alike to join our cause.
                        Together, we can build a repository of academic
                        resources that&apos;ll make student life easier, fun,
                        and more productive.
                    </p>
                    <p>
                        So, if you&apos;ve ever been a &quot;noob&quot;
                        scrolling through endless syllabus PDFs, we&apos;ve got
                        your back. Let&apos;s embark on this journey to make
                        academic life simpler, more accessible, and just a bit
                        more fun.
                    </p>
                    <p>
                        Join us at SyllabusX, because academic navigation
                        shouldn&apos;t be rocket science. It should be as simple
                        as saying, &quot;SyllabusX, help me out!&quot;
                    </p>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Letter;
