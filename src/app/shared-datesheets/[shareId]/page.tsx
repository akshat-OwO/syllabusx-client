import { getSharedDatesheet } from "@/lib/shared-datesheet";
import { notFound } from "next/navigation";
import { ImportDatesheetButton } from "@/components/ImportDatesheetButton";
import LayoutWrapper from "@/layouts/LayoutWrapper";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function SharedDatesheetPage({
    params,
}: {
    params: { shareId: string };
}) {
    const datesheet = await getSharedDatesheet(params.shareId);
    if (!datesheet) return notFound();

    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-16">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8">
                    <h1 className="mb-2 text-2xl font-bold">
                        {datesheet.title}
                    </h1>
                    <p className="text-muted-foreground">
                        Shared by {datesheet.authorName}
                    </p>
                </div>

                <div className="rounded-lg border p-6">
                    <div className="mb-6">
                        <div className="space-y-1">
                            <div className="font-semibold leading-none tracking-tight">
                                Datesheet
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Track your exams within SyllabusX!
                            </div>
                        </div>
                    </div>

                    <ScrollArea className="h-[400px] pr-4">
                        <div className="flex flex-col gap-2">
                            {datesheet.dates.map((d, index) => (
                                <div key={d.date} className="flex items-center">
                                    <div className="relative">
                                        <div className="flex items-center">
                                            <div
                                                className={cn(
                                                    "h-3 w-3 rounded-full bg-muted",
                                                    {
                                                        "bg-primary":
                                                            d.date >
                                                            new Date().getTime(),
                                                    }
                                                )}
                                            />
                                            <div
                                                className={cn(
                                                    "h-1 w-4 bg-muted",
                                                    {
                                                        "bg-primary":
                                                            d.date >
                                                            new Date().getTime(),
                                                    }
                                                )}
                                            />
                                            {index !== 0 && (
                                                <div
                                                    className={cn(
                                                        "absolute bottom-full left-1 h-8 w-1 bg-muted",
                                                        {
                                                            "bg-primary":
                                                                d.date >
                                                                new Date().getTime(),
                                                        }
                                                    )}
                                                />
                                            )}
                                            {index !==
                                                datesheet.dates.length - 1 && (
                                                <div
                                                    className={cn(
                                                        "absolute left-1 top-full h-8 w-1 bg-muted",
                                                        {
                                                            "bg-primary":
                                                                d.date >
                                                                new Date().getTime(),
                                                        }
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="group h-fit w-full whitespace-normal rounded-md border py-1.5 pl-3 pr-2">
                                        <div className="flex flex-1 items-center justify-between">
                                            <div className="flex flex-col">
                                                <p className="line-clamp-1 text-sm font-semibold">
                                                    {d.name}
                                                </p>
                                                <span className="text-muted-foregound text-xs font-medium">
                                                    {format(
                                                        new Date(d.date),
                                                        "do MMMM yyyy hh:mm aaa"
                                                    )}
                                                </span>
                                            </div>
                                            <div className="relative inline-flex items-center justify-center rounded-md border border-input p-1.5">
                                                <CalendarIcon className="h-8 w-8" />
                                                <span className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 text-xs font-semibold">
                                                    {new Date(d.date).getDate()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    <div className="mt-6">
                        <ImportDatesheetButton dates={datesheet.dates} />
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            Note: This will override your existing datesheet if
                            you have one
                        </p>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
