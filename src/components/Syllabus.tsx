import { Tab } from '@/config';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { FC } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion';
import { buttonVariants } from './ui/button';
import { TabsContent } from './ui/tabs';

interface SyllabusProps {
    theory: Theory[];
    lab: Lab[];
}

const Syllabus: FC<SyllabusProps> = ({ theory, lab }) => {
    return (
        <>
            <TabsContent value={Tab.THEORY}>
                <Accordion type="multiple">
                    {theory.map((t) => (
                        <AccordionItem
                            key={t.unit}
                            value={`unit ${t.unit}`}
                            className="border-b-0 bg-accent first:rounded-t-md last:rounded-b-md first:pt-2 last:pb-2 px-2 py-1"
                        >
                            <AccordionTrigger className="p-2 bg-background rounded-md shadow-sm [&[data-state=open]]:bg-accent">{`Unit ${t.unit}`}</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col items-center gap-2 first:mt-2">
                                    {t.topics.map((topic) => (
                                        <div
                                            key={topic}
                                            className="text-sm lg:text-base w-full p-2 rounded-md shadow-sm bg-background"
                                        >
                                            {topic}
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </TabsContent>
            <TabsContent value={Tab.LAB}>
                {lab.length === 0 ? (
                    <div className="h-[7.5rem] bg-accent rounded-md flex flex-col justify-center items-center">
                        <p>It seems this is not a practical subject.</p>
                    </div>
                ) : null}
                {lab.length > 0 ? (
                    <Accordion type="multiple">
                        {lab.map((l) => (
                            <AccordionItem
                                key={l.experiment}
                                value={`experiment ${l.experiment}`}
                                className="border-b-0 bg-accent first:rounded-t-md last:rounded-b-md first:pt-2 last:pb-2 px-2 py-1"
                            >
                                <AccordionTrigger className="p-2 bg-background rounded-md shadow-sm [&[data-state=open]]:bg-accent">
                                    {`Experiment ${l.experiment}`}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col items-center gap-2 first:mt-2">
                                        <div className="text-sm lg:text-base w-full p-2 rounded-md shadow-sm bg-background">
                                            {l.aim.objective}
                                        </div>
                                        {l.aim.steps.length > 0
                                            ? l.aim.steps.map(
                                                  (steps, index) => (
                                                      <div
                                                          className="text-sm lg:text-base w-full p-2 rounded-md shadow-sm bg-background"
                                                          key={index}
                                                      >{`${
                                                          index + 1
                                                      }) ${steps}`}</div>
                                                  )
                                              )
                                            : null}
                                        {l.aim.externalLinks ? (
                                            <a
                                                href={l.aim.externalLinks}
                                                className={cn(
                                                    buttonVariants({
                                                        variant: 'tertiary',
                                                        className:
                                                            'gap-2 rounded-md self-start',
                                                    })
                                                )}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Image{' '}
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        ) : null}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : null}
            </TabsContent>
        </>
    );
};

export default Syllabus;
