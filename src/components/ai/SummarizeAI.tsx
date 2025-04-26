import { useAi, useAiSummarizer } from "@/hooks/use-ai";
import useStore from "@/hooks/use-store";
import React, { useEffect, useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useMediaQuery } from "@mantine/hooks";
import { useChat } from "ai/react";
import { SendHorizonal, Sparkles, StopCircle, User } from "lucide-react";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Message } from "ai";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Tab } from "@/config";

const SummarizeAI = () => {
    const ai = useStore(useAi, (state) => state);
    const aiSummarizer = useStore(useAiSummarizer, (state) => state);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [prompt, setPrompt] = useState("");

    const params = useParams<{ slug: string[] }>();

    const { messages, setMessages, isLoading, reload, append } = useChat({
        api: "/api/ai",
        body: {
            type: "search",
            ai: {
                key: ai?.key,
                model: ai?.model,
            },
        },
    });

    const handleappend = async () => {
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

        if (prompt == "") {
            toast.error("Please write appropriate prompt!");
            return;
        }

        await append({ content: prompt, role: "user" }).then(() => {
            setPrompt("");
        });
    };

    useEffect(() => {
        const fetch = async () => {
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

            const semester = params.slug[0];
            const branch = params.slug[1].toUpperCase();
            const subject = params.slug[2].toUpperCase();

            setPrompt("");

            if (aiSummarizer?.currentTab == Tab.THEORY) {
                setMessages([
                    {
                        id: "1",
                        content:
                            "You are my personal assistant kindly respond to questions only that I will ask",
                        role: "system",
                    },
                    {
                        id: "2",
                        content: `I am ${branch} student of ${semester} semester , learning ${subject} subject .  \nYou need to summarize me these topics :- ${aiSummarizer?.topic}`,
                        role: "user",
                    },
                ]);
            } else if (aiSummarizer?.currentTab == Tab.LAB) {
                setMessages([
                    {
                        id: "1",
                        content:
                            "You are my personal assistant kindly respond to questions only that I will ask",
                        role: "system",
                    },
                    {
                        id: "2",
                        content: `I am ${branch} student of ${semester} semester , learning ${subject} subject .  \nYou need to write 2-3 lines of theory and program code for this experiment  :- ${aiSummarizer?.topic}`,
                        role: "user",
                    },
                ]);
            }
            await reload();
        };
        if (aiSummarizer?.isOpen) {
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aiSummarizer?.isOpen]);

    if (!isDesktop) {
        return (
            <Drawer open={aiSummarizer?.isOpen} onClose={aiSummarizer?.onClose}>
                <DrawerContent className="mt-0 max-h-[90vh] px-5 pb-10">
                    <DrawerHeader className="px-0">
                        <DrawerTitle>Summarize with AI</DrawerTitle>
                    </DrawerHeader>
                    <div className="h-full w-full overflow-y-auto">
                        <Content
                            messages={messages}
                            isLoading={isLoading}
                            handleappend={handleappend}
                            setprompt={setPrompt}
                            prompt={prompt}
                            isDesktop={isDesktop || false}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog
            open={aiSummarizer?.isOpen}
            onOpenChange={aiSummarizer?.onClose}
        >
            <DialogContent className="max-h-[90vh] max-w-5xl">
                <DialogHeader style={{ position: "static" }}>
                    <DialogTitle>Summarize with AI</DialogTitle>
                </DialogHeader>
                <div className="h-[80vh] w-full overflow-y-auto">
                    <Content
                        messages={messages}
                        isLoading={isLoading}
                        handleappend={handleappend}
                        setprompt={setPrompt}
                        prompt={prompt}
                        isDesktop={isDesktop}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Content = ({
    messages,
    isLoading,
    handleappend,
    setprompt,
    prompt,
    isDesktop,
}: {
    messages: Message[];
    isLoading: boolean;
    handleappend: any;
    setprompt: any;
    prompt: string;
    isDesktop: boolean;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const aiSummarizer = useStore(useAiSummarizer, (state) => state);

    if (!messages[1]) {
        return;
    }

    const topics = messages[1].content.split(":-")[1].split(",");

    return (
        <div
            className={`flex h-full w-full flex-col gap-3 pr-5 ${isLoading && "animate-pulse"}`}
        >
            {messages.map(
                (m, index) =>
                    index != 0 && (
                        <div
                            className={cn("flex items-end gap-2", {
                                "justify-end": m.role === "user",
                            })}
                            key={m.id}
                        >
                            {m.role !== "user" && (
                                <div className="flex gap-2">
                                    <div className="rounded-md border border-border bg-accent p-1.5">
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                </div>
                            )}
                            <Markdown
                                className={`prose rounded-md border border-border bg-secondary p-4 pr-8 dark:prose-invert ${!isDesktop && "text-sm"}`}
                            >
                                {m.content}
                            </Markdown>
                            {m.role === "user" && (
                                <div className="rounded-md border border-border bg-accent p-1.5">
                                    <User className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    )
            )}
            <div className="mt-8 flex w-full gap-3 rounded-xl bg-secondary p-5 py-3 align-middle">
                {aiSummarizer?.currentTab == Tab.THEORY &&
                    messages[1]?.content && (
                        <select
                            value={"Topics..."}
                            onChange={(e) => {
                                setprompt(e.target.value);
                                inputRef?.current?.focus();
                            }}
                            disabled={isLoading}
                            className={`w-1/4 bg-background px-2 ${!isDesktop && "w-1/12"} h-full cursor-pointer self-center rounded-sm text-sm outline-none`}
                        >
                            <option disabled value={"Topics..."}>
                                Select Topic
                            </option>
                            {topics.map((q) => {
                                return (
                                    <option key={q} value={q}>
                                        {q}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                <Input
                    disabled={isLoading}
                    placeholder="Enter custom prompt here ..."
                    style={{ scrollbarWidth: "none" }}
                    ref={inputRef}
                    value={prompt}
                    onChange={(e) => {
                        setprompt(e.target.value);
                    }}
                    className={`h-10 w-full resize-none self-center overflow-y-auto rounded-sm p-5 ${!isDesktop && "p-1"}`}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleappend();
                        }
                    }}
                />
                <Button
                    onClick={() => {
                        handleappend();
                    }}
                    variant={isLoading ? "secondary" : "default"}
                    className="bottom-2 right-2 self-center transition-all"
                    size="sm"
                >
                    {isLoading ? (
                        <StopCircle className="h-4 w-4" />
                    ) : (
                        <SendHorizonal className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default SummarizeAI;
