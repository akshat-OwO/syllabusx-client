"use client";

import { useDatesheet } from "@/hooks/use-datesheet";
import { Sheet, SheetClose, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { CalendarIcon, Share2Icon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { TDatesheetSchema, datesheetSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "../ui/input";
import { useState } from "react";
import { DateTimePicker } from "../ui/datetime-picker";
import { ScrollArea } from "../ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { useMediaQuery } from "@mantine/hooks";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "../ui/drawer";
import { ShareDatesheetDialog } from "../share-datesheet-dialog";
import { DatesheetTimeline } from "../DatesheetTimeline";

const DatesheetModal = () => {
    const { isOpen, onClose } = useDatesheet();

    const isMobile = useMediaQuery("(max-width: 768px)");

    if (isMobile) {
        return (
            <Drawer open={isOpen} onClose={onClose}>
                <DrawerContent className="max-h-[90vh] pb-5 pl-6 pr-0">
                    <DatesheetModal.Content closeTriggerHidden />
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent
                className="pr-0"
                isCloseTriggerVisible={false}
                side="left"
            >
                <DatesheetModal.Content />
            </SheetContent>
        </Sheet>
    );
};

DatesheetModal.Content = function DatesheetModalContent({
    closeTriggerHidden = false,
}: {
    closeTriggerHidden?: boolean;
}) {
    const { dates, isFirstInter, setIsFirstInter } = useDatesheet();
    return (
        <div className="flex h-full flex-col gap-4">
            <DatesheetModal.ContentHeader
                closeTriggerHidden={closeTriggerHidden}
            />
            <Accordion
                defaultValue={isFirstInter ? "add-form" : ""}
                type="single"
                collapsible
                className="pr-6"
            >
                <AccordionItem value="add-form" className="border-b-0">
                    <AccordionTrigger
                        className="mb-2 rounded-md bg-secondary px-3 py-2 text-secondary-foreground"
                        onClick={() => setIsFirstInter()}
                    >
                        Add Subject
                    </AccordionTrigger>
                    <AccordionContent className="p-1">
                        <DatesheetModal.Form />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="flex-grow overflow-hidden">
                <DatesheetModal.Dates dates={dates} />
            </div>
        </div>
    );
};

DatesheetModal.ContentHeader = function DatesheetModalContentHeader({
    closeTriggerHidden,
}: {
    closeTriggerHidden: boolean;
}) {
    const [isShareOpen, setIsShareOpen] = useState(false);
    const { dates } = useDatesheet();

    return (
        <div className="flex items-start justify-between pr-6 pt-6 md:pt-0">
            <div className="space-y-1">
                <div className="font-semibold leading-none tracking-tight">
                    Datesheet
                </div>
                <div className="text-xs text-muted-foreground">
                    Track your exams within SyllabusX!
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-[0.5rem]"
                    disabled={dates.length === 0}
                    onClick={() => setIsShareOpen(true)}
                >
                    <Share2Icon className="h-4 w-4" />
                    <span className="sr-only">Share Datesheet</span>
                </Button>
                {!closeTriggerHidden && (
                    <SheetClose asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto rounded-[0.5rem]"
                        >
                            <X />
                            <span className="sr-only">Close</span>
                        </Button>
                    </SheetClose>
                )}
            </div>
            <ShareDatesheetDialog
                open={isShareOpen}
                onOpenChange={setIsShareOpen}
            />
        </div>
    );
};

DatesheetModal.Form = function DatesheetModalForm({
    isEditForm,
    currentDate,
    onFormAction,
}: {
    currentDate?: { name: string; date: number };
    isEditForm?: boolean;
    onFormAction?: () => void;
}) {
    const [currDate, setCurrDate] = useState<
        | {
              name: string;
              date: number;
          }
        | undefined
    >(currentDate);
    const form = useForm<TDatesheetSchema>({
        resolver: zodResolver(datesheetSchema),
        defaultValues: {
            name: currDate?.name || "",
            date: currDate?.date ? new Date(currDate.date) : new Date(),
        },
    });

    const { addDate, editDate, removeDate } = useDatesheet();

    const onSubmit = (values: TDatesheetSchema) => {
        if (isEditForm) {
            if (currDate) {
                editDate(currDate, {
                    name: values.name,
                    date: values.date.getTime(),
                });
            }
        } else {
            addDate({ name: values.name, date: values.date.getTime() });
        }
        onFormAction?.();
    };

    const handleDelete = () => {
        if (currDate) {
            removeDate(currDate);
            onFormAction?.();
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-2.5"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter subject name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Subject..." />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Enter exam date</FormLabel>
                            <FormControl>
                                <div className="flex flex-wrap items-center gap-2">
                                    <DateTimePicker
                                        hourCycle={12}
                                        value={field.value}
                                        onChange={(e) => {
                                            setCurrDate((prev) => {
                                                if (prev) {
                                                    const timestamp =
                                                        e?.getTime();
                                                    if (timestamp) {
                                                        return {
                                                            name: prev.name,
                                                            date: timestamp,
                                                        };
                                                    }
                                                }
                                                return prev;
                                            });
                                            field.onChange(e);
                                        }}
                                    />
                                    {!isEditForm && (
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            variant="outline"
                                        >
                                            Add
                                        </Button>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                {isEditForm && (
                    <div className="flex w-full items-center gap-2">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleDelete()}
                        >
                            Delete
                        </Button>
                        <Button
                            type="submit"
                            variant="outline"
                            className="flex-1"
                        >
                            Edit
                        </Button>
                    </div>
                )}
            </form>
        </Form>
    );
};

DatesheetModal.Dates = function DatesheetModalDates({
    dates,
}: {
    dates: { name: string; date: number }[];
}) {
    const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);

    const handleItemClick = (date: { name: string; date: number }) => {
        const index = dates.findIndex((d) => d.date === date.date);
        setOpenPopoverId(index);
    };

    return (
        <div className="flex h-full flex-col pr-2">
            <DatesheetTimeline dates={dates} onItemClick={handleItemClick} />
            {dates.map((d, index) => (
                <Popover
                    key={d.date}
                    open={openPopoverId === index}
                    onOpenChange={(isOpen) =>
                        setOpenPopoverId(isOpen ? index : null)
                    }
                >
                    <PopoverContent align="start">
                        <DatesheetModal.Form
                            isEditForm
                            currentDate={{
                                name: d.name,
                                date: d.date,
                            }}
                            onFormAction={() => setOpenPopoverId(null)}
                        />
                    </PopoverContent>
                </Popover>
            ))}
        </div>
    );
};

export default DatesheetModal;
