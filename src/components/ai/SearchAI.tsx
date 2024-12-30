"use client";

import { useAi } from "@/hooks/use-ai";
import useStore from "@/hooks/use-store";
import { AiSearchSchema, TAiSearchSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "@mantine/hooks";
import { useChat } from "ai/react";
import { Sparkles, StopCircle, User } from "lucide-react";
import { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

interface SearchAIProps {}

const SearchAI: FC<SearchAIProps> = ({}) => {
    const ai = useStore(useAi, (state) => state);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (!isDesktop) {
        return (
            <Drawer
                open={ai?.completion.isOpen}
                onOpenChange={ai?.onClose}
                onClose={ai?.completion.onClose}
            >
                <DrawerContent className="mt-0 max-h-[90vh] px-5 pb-10">
                    <DrawerHeader className="px-0">
                        <DrawerTitle>Search with AI</DrawerTitle>
                    </DrawerHeader>
                    <AiCompletionForm />
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog
            open={ai?.completion.isOpen}
            onOpenChange={ai?.completion.onClose}
        >
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Search with AI</DialogTitle>
                    <DialogDescription>
                        Ask for a youtube video, clear your doubts, or
                        summarize.
                    </DialogDescription>
                </DialogHeader>
                <AiCompletionForm />
            </DialogContent>
        </Dialog>
    );
};

function AiCompletionForm() {
    const ai = useStore(useAi, (state) => state);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const form = useForm<TAiSearchSchema>({
        resolver: zodResolver(AiSearchSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const { messages, append, isLoading, stop } = useChat({
        api: ai?.model.includes("gemini-pro")
            ? "/api/google-search"
            : ai?.model.includes("claude")
                ? "/api/claude-search"
                : "/api/openai-search",
        body: {
            key: ai?.key,
            model: ai?.model,
        },
    });

    const onSubmit = async (values: TAiSearchSchema) => {
        if (!ai?.toggle) {
            toast.error("Toggle AI first!");
            return form.setError("prompt", { message: "Toggle AI first!" });
        }

        if (!ai?.key) {
            toast.error("Missing API key!");
            return form.setError("prompt", { message: "Missing API key!" });
        }

        if (!ai.model) {
            toast.error("Select model first!");
            return form.setError("prompt", { message: "Select model first!" });
        }

        if (isLoading) return stop();

        await append({ content: values.prompt, role: "user" })
            .catch((error) => {
                toast.error("Something went wrong!");
                form.setError("prompt", { message: "Something went wrong!" });
            })
            .finally(() => {
                form.reset();
                textAreaRef.current?.focus();
            });
    };

    return (
        <Form {...form}>
            <form
                className="space-y-1.5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <ScrollArea
                    type="hover"
                    className="py-2"
                    tw="max-h-[50vh] md:max-h-[70vh]"
                >
                    <div className="flex w-full flex-col gap-5">
                        {messages.map((m) => (
                            <div
                                className={cn(
                                    "flex items-end gap-2 self-start",
                                    {
                                        "self-end": m.role === "user",
                                    }
                                )}
                                key={m.id}
                            >
                                {m.role !== "user" && (
                                    <div className="rounded-md border border-border bg-accent p-1.5">
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                )}
                                <Markdown className="prose rounded-md border border-border bg-secondary p-2 dark:prose-invert">
                                    {m.content}
                                </Markdown>
                                {m.role === "user" && (
                                    <div className="rounded-md border border-border bg-accent p-1.5">
                                        <User className="h-4 w-4" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter your prompt</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Textarea
                                        minRows={3}
                                        maxRows={5}
                                        disabled={isLoading}
                                        placeholder="Summarize this..."
                                        {...field}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" &&
                                                !e.shiftKey
                                            ) {
                                                e.preventDefault();
                                                form.handleSubmit(onSubmit)();
                                                textAreaRef.current?.focus();
                                            }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        variant={
                                            isLoading ? "secondary" : "default"
                                        }
                                        className="absolute bottom-2 right-2 transition-all"
                                        size="sm"
                                    >
                                        {isLoading ? (
                                            <StopCircle className="h-4 w-4" />
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

export default SearchAI;
