"use client";
import { Tab } from "@/config";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@mantine/hooks";
import { ExternalLink, Sparkles } from "lucide-react";
import { FC, useState, useRef, useMemo, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { buttonVariants } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { TabsContent } from "./ui/tabs";
import useSound from "use-sound";
import useStore from "@/hooks/use-store";
import { useAi, useAiSummarizer } from "@/hooks/use-ai";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

interface Theory {
    unit: number;
    topics: string[];
}

interface Lab {
    experiment: number;
    aim: {
        objective: string;
        steps: string[];
        externalLinks?: string;
    };
}

interface SyllabusProps {
    theory: Theory[];
    lab: Lab[];
    tab: string;
}

const Syllabus: FC<SyllabusProps> = ({ theory, lab, tab }) => {
    const [completed, setCompleted] = useLocalStorage<string[]>({
        key: "completed",
        defaultValue: [],
    });

    const [isHovered, setIsHovered] = useState<Record<string, boolean>>({});
    const [hoverTimers, setHoverTimers] = useState<Record<string, NodeJS.Timeout>>({});

    const [playbackRate, setplaybackRate] = useState(0);
    const lastClickTime = useRef<number>(0);

    const ai = useStore(useAi, (state) => state);
    const aiSummarizer = useStore(useAiSummarizer, (state) => state);

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
            setCompleted((current) => [...current, topic]);
        } else {
            playCheck();
            setCompleted((current) => current.filter((curr) => curr !== topic));
        }
    };

    const unitProgress = useMemo(() => {
        return theory.map((t) => {
            const totalTopics = t.topics.length;
            const completedTopics = t.topics.filter((topic, index) => completed.includes(topic + index)).length;
            return (completedTopics / totalTopics) * 100;
        });
    }, [theory, completed]);

    const handleHoverEnter = (topic: string) => {
        if (!aiSummarizer?.toggled) return;
        const timer = setTimeout(() => {
            setIsHovered((prev) => ({
                ...prev,
                [topic]: true,
            }));
        }, 500);
        setHoverTimers((prev) => ({
            ...prev,
            [topic]: timer,
        }));
    };

    const handleHoverLeave = (topic: string) => {
        if (!aiSummarizer?.toggled) return;
        if (hoverTimers[topic]) {
            clearTimeout(hoverTimers[topic]);
        }
        setIsHovered((prev) => ({
            ...prev,
            [topic]: false,
        }));
    };

    const handleAiClick = async (topic: string) => {
        if (!ai?.toggle) {
            toast.error("Toggle AI first!");
            return;
        }

        if (!ai?.key) {
            toast.error("Missing API key!");
            return;
        }

        if (!ai?.model) {
            toast.error("Select model first!");
            return;
        }
        aiSummarizer?.setTab(tab);
        aiSummarizer?.setTopic(topic);
        aiSummarizer?.onOpen();
    };

    useEffect(() => {
        return () => {
            Object.values(hoverTimers).forEach((timer) => clearTimeout(timer));
        };
    }, [hoverTimers]);

    useEffect(() => {
        if (ai) {
            ai.mock.setTopics(theory.map((t) => t.topics));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ai?.mock.isOpen]);

    return (
        <>
            <TabsContent value={Tab.THEORY}>
                <Accordion type="multiple">
                    {theory.map((t, i) => (
                        <AccordionItem
                            key={t.unit}
                            value={`unit ${t.unit}`}
                            className="overflow-hidden border-b-0 bg-accent px-1.5 py-1 first:rounded-t-md first:pt-2 last:rounded-b-md last:pb-2"
                        >
                            <div className="h-1 overflow-hidden  bg-transparent px-1">
                                <div
                                    className="h-full rounded-t-lg bg-primary transition-all duration-300 ease-in-out"
                                    style={{ width: `${unitProgress[i]}%` }}
                                ></div>
                            </div>
                            <AccordionTrigger className="rounded-md bg-background p-2 shadow-sm [&[data-state=open]]:bg-accent">
                                {`Unit ${t.unit}`}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col items-center gap-2 first:mt-2">
                                    {t.topics.map((topic, index) => (
                                        <div
                                            onMouseEnter={() => handleHoverEnter(`${topic}-${index}`)}
                                            onMouseLeave={() => handleHoverLeave(`${topic}-${index}`)}
                                            key={index}
                                            className={cn(
                                                "relative flex w-full items-center gap-4 rounded-md p-2 text-sm shadow-sm transition-colors lg:text-base",
                                                completed.includes(topic + index) ? "bg-accent" : "bg-background"
                                            )}
                                        >
                                            {aiSummarizer?.toggled && (
                                                <AnimatePresence>
                                                    {isHovered[`${topic}-${index}`] && (
                                                        <motion.button
                                                            title="Summarise with AI"
                                                            key={`${topic}-${index}`}
                                                            initial={{
                                                                top: "50%",
                                                                translateY: "-50%",
                                                                right: 0,
                                                                opacity: 0,
                                                                width: 0,
                                                                height: 0,
                                                            }}
                                                            animate={{
                                                                right: "12px",
                                                                opacity: 100,
                                                                width: "fit-content",
                                                                height: "fit-content",
                                                            }}
                                                            exit={{ right: 0, opacity: 0, width: 0, height: 0 }}
                                                            transition={{ duration: 0.12 }}
                                                            className={cn(
                                                                buttonVariants({
                                                                    className: "absolute overflow-hidden px-1 py-0.5",
                                                                })
                                                            )}
                                                            onClick={() => handleAiClick(topic)}
                                                        >
                                                            <Sparkles className="h-4 w-4" />
                                                        </motion.button>
                                                    )}
                                                </AnimatePresence>
                                            )}
                                            <Checkbox
                                                checked={completed.includes(topic + index)}
                                                onCheckedChange={() => handleComplete(topic + index)}
                                            />
                                            <p
                                                className={cn(
                                                    "flex-1",
                                                    completed.includes(topic + index) && "line-through"
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
                ) : (
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
                                            onMouseEnter={() => handleHoverEnter(`${l.aim.objective}-${i}`)}
                                            onMouseLeave={() => handleHoverLeave(`${l.aim.objective}-${i}`)}
                                            className={cn(
                                                "relative flex w-full items-center gap-4 rounded-md p-2 text-sm shadow-sm transition-colors lg:text-base",
                                                completed.includes(l.aim.objective) ? "bg-accent" : "bg-background"
                                            )}
                                        >
                                            {aiSummarizer?.toggled && (
                                                <AnimatePresence>
                                                    {isHovered[`${l.aim.objective}-${i}`] && (
                                                        <motion.button
                                                            title="Summarise with AI"
                                                            key={`${l.aim.objective}-${i}`}
                                                            initial={{
                                                                top: "50%",
                                                                translateY: "-50%",
                                                                right: 0,
                                                                opacity: 0,
                                                                width: 0,
                                                                height: 0,
                                                            }}
                                                            animate={{
                                                                right: "12px",
                                                                opacity: 100,
                                                                width: "fit-content",
                                                                height: "fit-content",
                                                            }}
                                                            exit={{ right: 0, opacity: 0, width: 0, height: 0 }}
                                                            transition={{ duration: 0.12 }}
                                                            className={cn(
                                                                buttonVariants({
                                                                    className: "absolute overflow-hidden px-1 py-0.5",
                                                                })
                                                            )}
                                                            onClick={() => handleAiClick(l.aim.objective)}
                                                        >
                                                            <Sparkles className="h-4 w-4" />
                                                        </motion.button>
                                                    )}
                                                </AnimatePresence>
                                            )}
                                            <Checkbox
                                                checked={completed.includes(l.aim.objective)}
                                                onCheckedChange={() => handleComplete(l.aim.objective)}
                                            />
                                            <p className={cn(completed.includes(l.aim.objective) && "line-through")}>
                                                {l.aim.objective}
                                            </p>
                                        </div>
                                        {l.aim.steps.length > 0 &&
                                            l.aim.steps.map((step, index) => (
                                                <div
                                                    className={cn(
                                                        "flex w-full items-start gap-4 rounded-md p-2 text-sm shadow-sm transition-colors lg:text-base",
                                                        completed.includes(l.aim.objective) || completed.includes(step)
                                                            ? "bg-accent"
                                                            : "bg-background"
                                                    )}
                                                    key={index}
                                                >
                                                    <div className="flex flex-1 items-center gap-4">
                                                        <Checkbox
                                                            checked={
                                                                completed.includes(l.aim.objective) ||
                                                                completed.includes(step)
                                                            }
                                                            onCheckedChange={() => handleComplete(step)}
                                                        />
                                                        <p
                                                            className={cn(
                                                                completed.includes(l.aim.objective) && "line-through",
                                                                completed.includes(step) && "line-through"
                                                            )}
                                                        >{`${index + 1}) ${step}`}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        {l.aim.externalLinks && (
                                            <a
                                                href={l.aim.externalLinks}
                                                className={cn(
                                                    buttonVariants({
                                                        variant: "tertiary",
                                                        className: "gap-2 self-start rounded-md",
                                                    })
                                                )}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Image <ExternalLink className="h-4 w-4" />
                                            </a>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </TabsContent>
        </>
    );
};

export default Syllabus;
