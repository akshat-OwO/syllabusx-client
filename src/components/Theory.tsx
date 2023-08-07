import { FC } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion';

interface TheoryProps {
    theory: Theory[];
}

const Theory: FC<TheoryProps> = ({ theory }) => {
    return (
        <div className="grid bg-neutral-800/80 text-neutral-50 lg:mt-5 rounded-lg p-2">
            <h3 className="text-lg lg:text-xl">Theory</h3>
            <Accordion type="single" collapsible>
                {theory.map((t) => (
                    <AccordionItem key={t.unit} value={`unit ${t.unit}`}>
                        <AccordionTrigger className="lg:text-base hover:bg-neutral-700 rounded-lg p-2">{`Unit ${t.unit}`}</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col items-center gap-2">
                                {t.topics.map((topic) => (
                                    <div
                                        className="text-sm lg:text-base w-full p-2 rounded-md bg-neutral-700"
                                        key={topic}
                                    >
                                        {topic}
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default Theory;
