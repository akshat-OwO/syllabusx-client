"use client";

import { useAi, useAiSummarizer } from "@/hooks/use-ai";
import useStore from "@/hooks/use-store";
import { AiSchema, TAiSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "@mantine/hooks";
import { BookOpenIcon, NotebookPen, NotepadTextDashed, Search, Sparkles, Undo } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AccessibleToolTip from "../ui/accessible-tooltip";
import { Button } from "../ui/button";
import { Drawer, DrawerContent } from "../ui/drawer";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";

interface ConfigureAIProps {}

const ConfigureAI = ({}: ConfigureAIProps) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="hidden items-center space-x-2 md:flex">
            <div className="hidden md:flex">
                <Popover>
                    <AccessibleToolTip label="AI">
                        <PopoverTrigger asChild>
                            <Button variant="ghost" disabled={!mounted} size="icon">
                                <Sparkles className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                    </AccessibleToolTip>
                    <PopoverContent align="end" className="z-50 w-[340px] rounded-[0.5rem] p-6">
                        {mounted && <AiForm />}
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

function AiForm() {
    const ai = useStore(useAi, (state) => state);
    const aiSummarizer = useStore(useAiSummarizer, (state) => state);

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
            model: ai.model,
        });
    }, [ai?.key, ai?.model]);

    const onSubmit = (values: TAiSchema) => {
        ai?.setKey(values.key);
        ai?.setModel(values.model);
        toast.success("AI configured!");
    };

    if (!ai) return <></>;

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-start pt-6 md:pt-0">
                <div className="space-y-1 pr-2">
                    <div className="font-semibold leading-none tracking-tight">AI (Beta)</div>
                    <div className="text-xs text-muted-foreground">Configure AI</div>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto rounded-[0.5rem]" onClick={ai?.setClear}>
                    <Undo />
                    <span className="sr-only">Reset</span>
                </Button>
            </div>
            <div className="flex flex-1 flex-col space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <div className="flex items-center justify-between space-y-0.5">
                            <Label htmlFor="toggle-ai" className="space-y-1">
                                <span>Toggle AI</span>
                                <p className="text-sm text-muted-foreground">You hate it, you turn it off.</p>
                            </Label>
                            <Switch id="toggle-ai" checked={ai.toggle} onCheckedChange={ai.setToggle} />
                        </div>
                        <FormField
                            control={form.control}
                            name="key"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>API key</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} placeholder="xxxxxxxxxxxxxxx" />
                                    </FormControl>
                                    <FormDescription>API key provided by model.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Model</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={ai.model}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose your preferred AI model..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent
                                            ref={(ref) => {
                                                if (!ref) return;
                                                ref.ontouchstart = (e) => e.preventDefault();
                                            }}
                                        >
                                            <SelectGroup>
                                                <SelectLabel>Google</SelectLabel>
                                                <SelectItem value={"gemini-1.5-pro"}>gemini-1.5-pro</SelectItem>
                                                <SelectItem value={"gemini-1.5-flash"}>gemini-1.5-flash</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>OpenAI</SelectLabel>
                                                <SelectItem value={"gpt-4o"}>gpt-4o</SelectItem>
                                                <SelectItem value={"gpt-4o-mini"}>gpt-4o-mini</SelectItem>
                                                <SelectItem value={"gpt-4-turbo"}>gpt-4-turbo</SelectItem>
                                                <SelectItem value={"gpt-4"}>gpt-4</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Anthropic</SelectLabel>
                                                <SelectItem value={"claude3-sonnet"}>claude3-sonnet </SelectItem>
                                                <SelectItem value={"claude3-opus"}>claude3-opus </SelectItem>
                                                <SelectItem value={"claude3-haiku"}>claude3-haiku </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                        <FormDescription>Check pricing before using.</FormDescription>
                                        <FormMessage />
                                    </Select>
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
                <ScrollArea type="scroll" className="flex max-h-40 flex-col overflow-y-scroll">
                    <div className="w-full space-y-4">
                        <AIFeature
                            title="Search with AI"
                            description="Ask literally anything"
                            onClick={() => ai.completion.onOpen()}
                            icon={<Search className="h-5 w-5" />}
                        />
                        <AIFeature
                            title="Summary with AI"
                            description="Key points at a glance"
                            togglable={true}
                            toggledState={aiSummarizer?.toggled}
                            onCheckedChange={aiSummarizer?.setToggled}
                            onClick={() => {}}
                            icon={<BookOpenIcon className="h-5 w-5" />}
                        />
                        <AIFeature
                            title="Generate Mock Tests"
                            description="Predict question paper"
                            onClick={() => ai.mock.onOpen()}
                            icon={<NotepadTextDashed className="h-5 w-5" />}
                        />
                        <AIFeature
                            title="AI note builder"
                            description=""
                            onClick={() => {}}
                            preview
                            icon={<NotebookPen className="h-5 w-5" />}
                        />
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}

ConfigureAI.Mobile = function ConfigureAIMobile() {
    const ai = useStore(useAi, (state) => state);

    return (
        <Drawer open={ai?.isOpen} onClose={ai?.onClose}>
            <DrawerContent className="px-6 pb-6">
                <AiForm />
            </DrawerContent>
        </Drawer>
    );
};

ConfigureAI.MobileTrigger = function ConfigureAIMobileTrigger() {
    const ai = useStore(useAi, (state) => state);
    const [mounted, setMounted] = useState<boolean>(false);

    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (isDesktop) return <></>;

    return (
        <AccessibleToolTip label="AI">
            <Button onClick={ai?.onOpen} variant="ghost" disabled={!mounted} size="icon">
                <Sparkles className="h-4 w-4" />
            </Button>
        </AccessibleToolTip>
    );
};

function AIFeature({
    title,
    description,
    icon,
    preview,
    togglable,
    toggledState,
    onClick,
    onCheckedChange,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    preview?: boolean;
    togglable?: boolean;
    toggledState?: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    onCheckedChange?: (checked: boolean) => void;
}) {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            disabled={preview}
            className={cn(
                "h-fit w-full items-center justify-between gap-2 border border-border/75 p-2 text-start hover:border-border hover:bg-transparent",
                {
                    "border-primary hover:border-primary": toggledState,
                }
            )}
        >
            <div className="flex items-center gap-2">
                <div className="rounded-md border border-border p-2">{icon}</div>
                <div className="flex flex-col justify-center gap-0.5">
                    <p className="text-sm font-medium leading-none">{title}</p>
                    <span className="text-sm text-muted-foreground">{preview ? "Coming soon..." : description}</span>
                </div>
            </div>
            {togglable && <Checkbox checked={toggledState} onCheckedChange={onCheckedChange} />}
        </Button>
    );
}

export default ConfigureAI;
