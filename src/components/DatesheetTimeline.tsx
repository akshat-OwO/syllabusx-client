"use client";

import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DatesheetTimelineProps {
    dates: { name: string; date: number }[];
    interactive?: boolean;
    onItemClick?: (date: { name: string; date: number }) => void;
}

export const DatesheetTimeline: React.FC<DatesheetTimelineProps> = ({
    dates,
    interactive = false,
    onItemClick,
}) => {
    return (
        <ScrollArea className="flex-grow pr-4">
            <div className="flex flex-1 flex-col gap-2">
                {dates.map((d, index) => (
                    <div key={d.date} className="flex items-center">
                        <div className="relative">
                            <div className="flex items-center">
                                <div
                                    className={cn(
                                        "h-3 w-3 rounded-full bg-muted",
                                        {
                                            "bg-primary":
                                                d.date > new Date().getTime(),
                                        }
                                    )}
                                />
                                <div
                                    className={cn("h-1 w-4 bg-muted", {
                                        "bg-primary":
                                            d.date > new Date().getTime(),
                                    })}
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
                                {index !== dates.length - 1 && (
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
                        <div
                            onClick={
                                interactive ? () => onItemClick?.(d) : undefined
                            }
                            className={cn(
                                "group h-fit w-full whitespace-normal rounded-md border py-1.5 pl-3 pr-2",
                                {
                                    "cursor-pointer transition-colors hover:bg-secondary/50":
                                        interactive,
                                }
                            )}
                        >
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
    );
};
