"use client";

import { useFeedback } from "@/hooks/use-feedback";
import { FeedbackSchema, TFeedbackSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CornerRightUp, MessageSquare, UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button, buttonVariants } from "./ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";

const FeedbackForm = ({}) => {
    const feedback = useFeedback();

    const form = useForm<TFeedbackSchema>({
        resolver: zodResolver(FeedbackSchema),
    });

    const onSubmit = async (values: TFeedbackSchema) => {
        toast.promise(axios.post("/api/send", { values }), {
            loading: "Submitting...",
            success: () => {
                return "Form submitted!";
            },
            error: "Something went wrong! Try again later",
        });
    };

    return (
        <>
            <Form {...form}>
                <ScrollArea className="h-[70vh] pb-2 md:h-fit md:pb-0">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-1 gap-5 px-1 md:grid-cols-3"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Shourya"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        The title of your autobiography.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="mail@example.com"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your mail so we can spam.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="college"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>College / Institution</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="BVCOE" />
                                    </FormControl>
                                    <FormDescription>
                                        The academic HQ you call home.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="course"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="B.Tech"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your academic journey&apos;s chosen
                                        path.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="semester"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Course</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="3" />
                                    </FormControl>
                                    <FormDescription>
                                        Your academic chapter number.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="branch"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Branch</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="ECE" />
                                    </FormControl>
                                    <FormDescription>
                                        Your academic superhero identity.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="query"
                            render={({ field }) => (
                                <FormItem className="col-span-full">
                                    <FormLabel>Branch</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            minRows={2}
                                            maxRows={5}
                                            {...field}
                                            placeholder="Very bad project 2/10 should not exist"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Spill the academic tea or drop some
                                        wisdom!
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Alert className="col-span-full">
                            <UploadCloud className="h-4 w-4" />
                            <AlertTitle>
                                Don&apos;t see file uploader?
                            </AlertTitle>
                            <AlertDescription>
                                File uploader will be made available soon! Till
                                then DM us on{" "}
                                <a
                                    href="https://www.instagram.com/syllabusx_.live/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        buttonVariants({
                                            variant: "link",
                                            className:
                                                "h-fit px-0 py-0 underline",
                                        })
                                    )}
                                >
                                    Instagram
                                </a>
                            </AlertDescription>
                        </Alert>
                    </form>
                </ScrollArea>
            </Form>
            <Button
                className="w-full"
                onClick={() => form.handleSubmit(onSubmit)()}
            >
                Submit
            </Button>
        </>
    );
};

export function FeedbackFormTrigger() {
    const feedback = useFeedback();

    return (
        <Button className="gap-2" onClick={feedback.onOpen}>
            Give us feedback <MessageSquare className="h-4 w-4" />
        </Button>
    );
}

export default FeedbackForm;
