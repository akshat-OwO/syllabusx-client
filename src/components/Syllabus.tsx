"use client";
import { Tab } from "@/config";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@mantine/hooks";
import { ExternalLink } from "lucide-react";
import { FC, useState, useRef } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import { buttonVariants } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { TabsContent } from "./ui/tabs";

import useSound from "use-sound";

interface SyllabusProps {
    theory: Theory[];
    lab: Lab[];
}

const Syllabus: FC<SyllabusProps> = ({ theory, lab }) => {
    const [completed, setCompleted] = useLocalStorage<string[]>({
        key: "completed",
        defaultValue: [],
    });
    const [playbackRate, setplaybackRate] = useState(0);
    const lastClickTime = useRef<number>(0);

    const playRate = () => {
        const currentTime = Date.now();
        const timeSinceLastClick = currentTime - lastClickTime.current;

        if (timeSinceLastClick <= 500 && lastClickTime.current !== 0) {
            setplaybackRate(playbackRate + 0.05);
        } else {
            setplaybackRate(1);
        }

        lastClickTime.current = currentTime;
    };

    const [playUncheck] = useSound("/topic_uncheck.mp3", {
        playbackRate,
        volume: 0.35,
    });
    const [playCheck] = useSound("/topic_check.mp3", {
        playbackRate,
        volume: 0.35,
    });

    const handleComplete = (topic: string) => {
        playRate();

        if (!completed.includes(topic)) {
            playUncheck();

            setCompleted((current) => {
                return [...current, topic];
            });
        } else {
            playCheck();

            setCompleted((current) => {
                return current.filter((curr) => curr !== topic);
            });
        }
    };

    return (
        <>
            <TabsContent value={Tab.THEORY}>
                <Accordion type="multiple">
                    {theory.map((t) => (
                        <AccordionItem
                            key={t.unit}
                            value={`unit ${t.unit}`}
                            className="border-b-0 bg-accent px-2 py-1 first:rounded-t-md first:pt-2 last:rounded-b-md last:pb-2"
                        >
                            <AccordionTrigger className="rounded-md bg-background p-2 shadow-sm [&[data-state=open]]:bg-accent">{`Unit ${t.unit}`}</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col items-center gap-2 first:mt-2">
                                    {t.topics.map((topic, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "flex w-full items-center gap-4 rounded-md p-2 text-sm shadow-sm transition-colors lg:text-base",
                                                completed.includes(topic)
                                                    ? "bg-accent"
                                                    : "bg-background"
                                            )}
                                        >
                                            <Checkbox
                                                checked={completed.includes(
                                                    topic
                                                )}
                                                onCheckedChange={() =>
                                                    handleComplete(topic)
                                                }
                                            />
                                            <p
                                                className={cn(
                                                    completed.includes(topic) &&
                                                        "line-through"
                                                )}
                                            >
                                                {topic}
                                            </p>
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
                    <div className="flex h-[7.5rem] flex-col items-center justify-center rounded-md bg-accent">
                        <p>It seems this is not a practical subject.</p>
                    </div>
                ) : null}
                {lab.length > 0 ? (
                    <Accordion type="multiple">
                        {lab.map((l, i) => (
                            <AccordionItem
                                key={l.experiment}
                                value={`experiment ${l.experiment}`}
                                className="border-b-0 bg-accent px-2 py-1 first:rounded-t-md first:pt-2 last:rounded-b-md last:pb-2"
                            >
                                <AccordionTrigger className="rounded-md bg-background p-2 shadow-sm [&[data-state=open]]:bg-accent">
                                    {`Experiment ${l.experiment}`}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col items-center gap-2 first:mt-2">
                                        <div
                                            key={i}
                                            className={cn(
                                                "flex w-full items-center gap-4 rounded-md p-2 text-sm shadow-sm transition-colors lg:text-base",
                                                completed.includes(
                                                    l.aim.objective
                                                )
                                                    ? "bg-accent"
                                                    : "bg-background"
                                            )}
                                        >
                                            <Checkbox
                                                checked={completed.includes(
                                                    l.aim.objective
                                                )}
                                                onCheckedChange={() =>
                                                    handleComplete(
                                                        l.aim.objective
                                                    )
                                                }
                                            />
                                            <p
                                                className={cn(
                                                    completed.includes(
                                                        l.aim.objective
                                                    ) && "line-through"
                                                )}
                                            >
                                                {l.aim.objective}
                                            </p>
                                        </div>
                                        {l.aim.steps.length > 0
                                            ? l.aim.steps.map((step, index) => (
                                                  <div
                                                      className={cn(
                                                          "flex w-full items-center gap-4 rounded-md p-2 text-sm shadow-sm transition-colors lg:text-base",
                                                          completed.includes(
                                                              l.aim.objective
                                                          ) ||
                                                              completed.includes(
                                                                  step
                                                              )
                                                              ? "bg-accent"
                                                              : "bg-background"
                                                      )}
                                                      key={index}
                                                  >
                                                      <Checkbox
                                                          checked={
                                                              completed.includes(
                                                                  l.aim
                                                                      .objective
                                                              ) ||
                                                              completed.includes(
                                                                  step
                                                              )
                                                          }
                                                          onCheckedChange={() =>
                                                              handleComplete(
                                                                  step
                                                              )
                                                          }
                                                      />
                                                      <p
                                                          className={cn(
                                                              completed.includes(
                                                                  l.aim
                                                                      .objective
                                                              ) &&
                                                                  "line-through",
                                                              completed.includes(
                                                                  step
                                                              ) &&
                                                                  "line-through"
                                                          )}
                                                      >{`${
                                                          index + 1
                                                      }) ${step}`}</p>
                                                  </div>
                                              ))
                                            : null}
                                        {l.aim.externalLinks ? (
                                            <a
                                                href={l.aim.externalLinks}
                                                className={cn(
                                                    buttonVariants({
                                                        variant: "tertiary",
                                                        className:
                                                            "gap-2 self-start rounded-md",
                                                    })
                                                )}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Image{" "}
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
