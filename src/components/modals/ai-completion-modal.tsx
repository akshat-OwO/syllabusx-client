"use client";

import { useAi } from "@/hooks/use-ai";
import useStore from "@/hooks/use-store";
import { AiCompletionSchema, TAiCompletionSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "@mantine/hooks";
import { useCompletion } from "ai/react";
import { StopCircle } from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import Markdown from "react-markdown";
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
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

interface AiCompletionModalProps {}

const AiCompletionModal: FC<AiCompletionModalProps> = ({}) => {
    const ai = useStore(useAi, (state) => state);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (!isDesktop) {
        return (
            <Drawer
                open={ai?.completion.isOpen}
                onOpenChange={ai?.offConfiguring}
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
            <DialogContent className="max-w-2xl">
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

    const form = useForm<TAiCompletionSchema>({
        resolver: zodResolver(AiCompletionSchema),
    });

    const { complete, completion, setCompletion, stop, isLoading, error } =
        useCompletion();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (!ai) return;
        form.reset({
            prompt: ai.completion.prompt,
        });
    }, [ai?.completion.prompt]);

    const onSubmit = async (values: TAiCompletionSchema) => {
        if (!ai?.key)
            return form.setError("root", { message: "Missing API key!" });

        if (isLoading) return stop();

        const completion = await complete(values.prompt, {
            body: { key: ai.key },
        });

        if (!completion && error) {
            return form.setError("root", { message: "Something went wrong!" });
        }
    };

    return (
        <Form {...form}>
            <form
                className="space-y-1.5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {completion && (
                    <div className="">
                        <Label>Generated Content</Label>
                        <ScrollArea tw="max-h-[50vh] md:max-h-[70vh]">
                            <Markdown className="prose h-full dark:prose-invert">
                                {completion}
                            </Markdown>
                        </ScrollArea>
                    </div>
                )}
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

export default AiCompletionModal;
