import { FC } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion';

interface LabProps {
    lab: Lab[];
}

const Lab: FC<LabProps> = ({ lab }) => {
    return (
        <div className="grid bg-neutral-800/80 lg:mt-5 rounded-lg p-2">
            <h3 className="text-lg lg:text-xl">Lab</h3>
            {lab.length === 0 && (
                <div className="bg-neutral-700 grid place-content-center gap-2 p-2 rounded-lg">
                    <h4 className="text-center">No Data Found</h4>
                    <p className="text-sm">
                        It seems this is not a practical subject
                    </p>
                </div>
            )}
            {lab.length > 0 && (
                <Accordion type="single" collapsible>
                    {lab.map((l) => (
                        <AccordionItem
                            key={l.experiment}
                            value={`experiment ${l.experiment}`}
                        >
                            <AccordionTrigger className="lg:text-base">
                                <div className="flex flex-col gap-1">
                                    <p>{`Experiment ${l.experiment}`}</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="text-sm lg:text-base w-full p-2 rounded-md bg-neutral-700">
                                        {l.aim.objective}
                                    </div>
                                    {l.aim.steps.length > 0 && (
                                        <div className="flex flex-col w-full items-center gap-2">
                                            {l.aim.steps.map((s, index) => (
                                                <div
                                                    key={index}
                                                    className="text-sm lg:text-base w-full p-2 rounded-md bg-neutral-700"
                                                >
                                                    {`${index + 1}) ${s}`}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>
    );
};

export default Lab;
