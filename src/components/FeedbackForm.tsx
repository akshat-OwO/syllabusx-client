"use client";

import { useFeedback } from "@/hooks/use-feedback";
import { FeedbackSchema, TFeedbackSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CornerRightUp, UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
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
        defaultValues: {
            name: "",
            email: "",
            branch: "",
            semester: 1,
            college: "",
            course: "",
            query: feedback.query,
        },
    });

    const onSubmit = (values: TFeedbackSchema) => {};

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <ScrollArea className="h-[70vh] pb-2 md:h-fit">
                    <div className="grid grid-cols-1 gap-2 px-2 md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your good name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="md:col-start-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your email so we can spam you.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="college"
                            render={({ field }) => (
                                <FormItem className="md:col-start-2 md:row-start-1">
                                    <FormLabel>College / Institution</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your college / institution name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="course"
                            render={({ field }) => (
                                <FormItem className="md:col-start-3 md:row-start-1">
                                    <FormLabel>Course</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Really? You chose this?
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
                                    <FormLabel>Semester</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your current semester.
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
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your current branch.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="query"
                            render={({ field }) => (
                                <FormItem className="md:col-span-3">
                                    <FormLabel>Query</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your queries / problems which we&apos;ll
                                        try to solve.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Alert className="md:col-span-3">
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
                                                "h-fit py-0 pl-0 underline",
                                        })
                                    )}
                                >
                                    Instagram
                                </a>
                            </AlertDescription>
                        </Alert>
                    </div>
                </ScrollArea>
                <div className="px-2">
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export function FeedbackFormTrigger() {
    const feedback = useFeedback();

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="query">Any queries or feedback?</Label>
            <Textarea
                minRows={3}
                maxRows={5}
                id="query"
                placeholder="Very bad project will give 2/10..."
                value={feedback.query}
                onChange={(e) => feedback.setQuery(e.target.value)}
            />
            <Button
                variant="secondary"
                className="gap-2 self-end"
                onClick={feedback.onOpen}
            >
                Open form <CornerRightUp className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default FeedbackForm;
