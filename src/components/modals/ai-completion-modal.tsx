"use client";

import { useAi } from "@/hooks/use-ai";
import useStore from "@/hooks/use-store";
import { AiCompletionSchema, TAiCompletionSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompletion } from "ai/react";
import { StopCircle } from "lucide-react";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface AiCompletionModalProps {}

const AiCompletionModal: FC<AiCompletionModalProps> = ({}) => {
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
                <Form {...form}>
                    <form
                        className="space-y-1.5"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="">
                            <Label htmlFor="generated-content">
                                Generated Content
                            </Label>
                            <Textarea
                                id="generated-content"
                                maxRows={10}
                                disabled={!!!completion}
                                value={completion}
                                onChange={(e) => setCompletion(e.target.value)}
                                placeholder="Ask me anything..."
                            />
                        </div>
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
                                                placeholder="Summarize this..."
                                                {...field}
                                                onKeyDown={(e) => {
                                                    if (
                                                        e.key === "Enter" &&
                                                        !e.shiftKey
                                                    ) {
                                                        e.preventDefault();
                                                        form.handleSubmit(
                                                            onSubmit
                                                        )();
                                                    }
                                                }}
                                            />
                                            <Button
                                                type="submit"
                                                variant={
                                                    isLoading
                                                        ? "secondary"
                                                        : "default"
                                                }
                                                className="absolute bottom-2 right-2"
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
            </DialogContent>
        </Dialog>
    );
};

export default AiCompletionModal;
