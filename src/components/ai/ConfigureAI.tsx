"use client";

import { useAi } from "@/hooks/use-ai";
import useStore from "@/hooks/use-store";
import { AiSchema, TAiSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotebookPen, Search, Sparkles, Undo } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";

interface ConfigureAIProps {}

const ConfigureAI: FC<ConfigureAIProps> = ({}) => {
    const [mounted, setMounted] = useState<boolean>(false);
    const ai = useStore(useAi, (state) => state);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex items-center space-x-2">
            <Drawer open={ai?.isConfiguring} onClose={ai?.offConfiguring}>
                <DrawerTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={!mounted}
                        onClick={ai?.onConfiguring}
                        className="md:hidden"
                    >
                        <Sparkles className="h-4 w-4" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="px-6 pb-6">
                    {mounted && <AiForm />}
                </DrawerContent>
            </Drawer>
            <div className="hidden md:flex">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" disabled={!mounted} size="icon">
                            <Sparkles className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        align="end"
                        className="z-50 w-[340px] rounded-[0.5rem] p-6"
                    >
                        {mounted && <AiForm />}
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

function AiForm() {
    const ai = useStore(useAi, (state) => state);

    const form = useForm<TAiSchema>({
        resolver: zodResolver(AiSchema),
        defaultValues: {
            key: "",
        },
    });

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (!ai) return;
        form.reset({
            key: ai.key,
        });
    }, [ai?.key]);

    const onSubmit = (values: TAiSchema) => {
        ai?.setKey(values.key);
        toast.success("AI configured!");
    };

    if (!ai) return <></>;

    return (
        <div className="flex flex-col space-y-4 md:space-y-6">
            <div className="flex items-start pt-6 md:pt-0">
                <div className="space-y-1 pr-2">
                    <div className="font-semibold leading-none tracking-tight">
                        AI (Beta)
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Configure AI
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto rounded-[0.5rem]"
                    onClick={ai?.setClear}
                >
                    <Undo />
                    <span className="sr-only">Reset</span>
                </Button>
            </div>
            <div className="flex flex-1 flex-col space-y-4">
                <Label
                    htmlFor="toggle-ai"
                    className="flex items-center justify-between"
                >
                    <span>Toggle AI</span>
                    <Switch
                        id="toggle-ai"
                        checked={ai.toggle}
                        onCheckedChange={ai.setToggle}
                    />
                </Label>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="key"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>API key</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="GEMINI_API_KEY"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Configure
                        </Button>
                    </form>
                </Form>
                <Separator />
                <Label>AI Features</Label>
                <AIFeature
                    title="Search with AI"
                    description="Ask literally anything"
                    onClick={ai.completion.onOpen}
                    icon={<Search className="h-5 w-5" />}
                />
                <AIFeature
                    title="AI note builder"
                    description=""
                    onClick={() => {}}
                    preview
                    icon={<NotebookPen className="h-5 w-5" />}
                />
            </div>
        </div>
    );
}

function AIFeature({
    title,
    description,
    icon,
    preview,
    onClick,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    preview?: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            disabled={preview}
            className="h-fit justify-start gap-2 border border-border/75 p-2 text-start hover:border-border hover:bg-transparent"
        >
            <div className="rounded-md border border-border p-2">{icon}</div>
            <div className="flex flex-col justify-center gap-0.5">
                <p className="text-sm font-medium leading-none">{title}</p>
                <span className="text-sm text-muted-foreground">
                    {preview ? "Coming soon..." : description}
                </span>
            </div>
        </Button>
    );
}

export default ConfigureAI;
