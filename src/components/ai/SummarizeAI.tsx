import { useAi, useAiSummarizer } from '@/hooks/use-ai';
import useStore from '@/hooks/use-store';
import React, { FC, useEffect, useRef, useState } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { useMediaQuery } from '@mantine/hooks';
import { useChat } from 'ai/react';
import { RefreshCcw, SendHorizonal, Sparkles, StopCircle, User } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Message } from 'ai';
import { useParams } from 'next/navigation';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Tab } from '@/config';


interface SummarizeAiProps { }


const SummarizeAI: FC<SummarizeAiProps> = ({ }) => {
    const ai = useStore(useAi, (state) => state);
    const aiSummarizer = useStore(useAiSummarizer, (state) => state);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [prompt, setPrompt] = useState('');

    const params = useParams<{ slug: string[] }>();


    const { messages, setMessages, isLoading, stop, reload, append } = useChat({
        api: ai?.model.includes("gemini")
            ? "/api/google-search"
            : "/api/openai-search",
        body: {
            key: ai?.key,
            model: ai?.model,
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

        if (prompt == '') {
            toast.error("Please write appropriate prompt!");
            return;
        }

        await append({ content: prompt, role: "user" }).then(() => {
            setPrompt('');
        })
    }

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

            setPrompt('');

            if (aiSummarizer?.currentTab == Tab.THEORY) {
                setMessages([
                    { id: "1", content: 'You are my personal assistant kindly respond to questions only that I will ask', role: "system" },
                    { id: "2", content: `I am ${branch} student of ${semester} semester , learning ${subject} subject .  \nYou need to summarize me these topics :- ${aiSummarizer?.topic}`, role: "user" }
                ]);
            } else if (aiSummarizer?.currentTab == Tab.LAB) {
                setMessages([
                    { id: "1", content: 'You are my personal assistant kindly respond to questions only that I will ask', role: "system" },
                    { id: "2", content: `I am ${branch} student of ${semester} semester , learning ${subject} subject .  \nYou need to write 2-3 lines of theory and program code for this experiment  :- ${aiSummarizer?.topic}`, role: "user" }
                ]);
            }
            await reload();
        }
        if (aiSummarizer?.isOpen) {
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aiSummarizer?.isOpen])

    if (!isDesktop) {
        return (
            <Drawer
                open={aiSummarizer?.isOpen}
                onClose={aiSummarizer?.onClose}
            >
                <DrawerContent className="mt-0 max-h-[90vh] px-5 pb-10">
                    <DrawerHeader className="px-0">
                        <DrawerTitle>Summarize with AI</DrawerTitle>
                    </DrawerHeader>
                    <div className='w-full h-full overflow-y-auto'>
                        <Content messages={messages} isLoading={isLoading} handleappend={handleappend} setprompt={setPrompt} prompt={prompt} isDesktop={isDesktop || false} />
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
            <DialogContent className="max-w-5xl max-h-[90vh]">
                <DialogHeader style={{ position: 'static' }}>
                    <DialogTitle>Summarize with AI</DialogTitle>
                </DialogHeader>
                <div className='w-full h-[80vh] overflow-y-auto'>
                    <Content messages={messages} isLoading={isLoading} handleappend={handleappend} setprompt={setPrompt} prompt={prompt} isDesktop={isDesktop}/>
                </div>
            </DialogContent>
        </Dialog>
    );
}

const Content = ({ messages, isLoading, handleappend, setprompt, prompt,isDesktop }: { messages: Message[], isLoading: boolean, handleappend: any, setprompt: any, prompt: string,isDesktop:boolean }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const aiSummarizer = useStore(useAiSummarizer, (state) => state);

    if (!messages[1]) {
        return;
    }

    const topics = messages[1].content.split(':-')[1].split(',');


    return <div className={`w-full h-full flex flex-col gap-3 pr-5 ${isLoading && "animate-pulse"}`}>
        {messages.map((m, index) => (
            index != 0 && <div
                className={cn(
                    "flex items-end gap-2",
                    {
                        "justify-end": m.role === "user",
                    }
                )}
                key={m.id}
            >
                {m.role !== "user" && (
                    <div className='flex gap-2'>
                        <div className="rounded-md border border-border bg-accent p-1.5">
                            <Sparkles className="h-4 w-4" />
                        </div>
                    </div>
                )}
                <Markdown className={`prose rounded-md pr-8 border border-border bg-secondary p-4 dark:prose-invert ${!isDesktop && "text-sm"}`}>
                    {m.content}
                </Markdown>
                {m.role === "user" && (
                    <div className="rounded-md border border-border bg-accent p-1.5">
                        <User className="h-4 w-4" />
                    </div>
                )}
            </div>
        ))}
        <div className="w-full flex gap-3 mt-8 p-5 py-3 bg-secondary rounded-xl align-middle">
            {aiSummarizer?.currentTab == Tab.THEORY && messages[1]?.content && <select value={'Topics...'} onChange={(e) => {
                setprompt(e.target.value);
                inputRef?.current?.focus();
            }} disabled={isLoading} className={`px-2 bg-background w-1/4 ${!isDesktop && "w-1/12"} h-full outline-none text-sm rounded-sm self-center cursor-pointer`} placeholder='Topics'>
                <option disabled value={'Topics...'}>Select Topic</option>
                {topics.map((q) => {
                    return <option key={q} value={q}>{q}</option>
                })}
            </select>}
            <Input
                disabled={isLoading}
                placeholder="Enter custom prompt here ..."
                style={{ scrollbarWidth: 'none' }}
                ref={inputRef}
                value={prompt}
                onChange={(e) => { setprompt(e.target.value); }}
                className={`w-full h-10 resize-none self-center p-5 rounded-sm overflow-y-auto ${!isDesktop && "p-1"}`}
                onKeyDown={(e) => {
                    if (
                        e.key === "Enter" &&
                        !e.shiftKey
                    ) {
                        e.preventDefault();
                        handleappend();
                    }
                }}
            />
            <Button
                onClick={() => {
                    handleappend();
                }}
                variant={
                    isLoading ? "secondary" : "default"
                }
                className="bottom-2 right-2 transition-all self-center"
                size="sm"
            >
                {isLoading ? (
                    <StopCircle className="h-4 w-4" />
                ) : (
                    <SendHorizonal className="h-4 w-4"/>
                )}
            </Button>
        </div>
    </div>
}

export default SummarizeAI
