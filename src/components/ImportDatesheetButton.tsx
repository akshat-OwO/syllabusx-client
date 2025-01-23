"use client";
import { Button } from "@/components/ui/button";
import { useDatesheet } from "@/hooks/use-datesheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImportDatesheetButton({
    dates,
}: {
    dates: Array<{ name: string; date: number }>;
}) {
    const [showConfirm, setShowConfirm] = useState(false);
    const { dates: existingDates, importDatesheet } = useDatesheet();

    const handleImport = () => {
        if (existingDates.length > 0) {
            setShowConfirm(true);
        } else {
            importDatesheet(dates);
        }
    };

    return (
        <>
            <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleImport}
            >
                Import Datesheet
            </Button>

            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent className="border-border bg-background">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-foreground">
                            Current Datesheet
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground">
                            This will override your existing datesheet with{" "}
                            {dates.length} new dates.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <ScrollArea className="mt-4 h-[300px] rounded-md border border-border p-4">
                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 font-semibold text-foreground">
                                    Your Current Datesheet
                                </h3>
                                <div className="space-y-2">
                                    {existingDates.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            No dates found
                                        </p>
                                    ) : (
                                        existingDates.map((date) => (
                                            <div
                                                key={date.date}
                                                className="flex items-center justify-between rounded-lg border border-border bg-card p-2 text-sm"
                                            >
                                                <span className="font-medium text-card-foreground">
                                                    {date.name}
                                                </span>
                                                <span className="flex items-center gap-2 text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    {format(date.date, "PPp")}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-2 font-semibold text-foreground">
                                    New Datesheet
                                </h3>
                                <div className="space-y-2">
                                    {dates.map((date) => (
                                        <div
                                            key={date.date}
                                            className="flex items-center justify-between rounded-lg border border-border bg-card p-2 text-sm"
                                        >
                                            <span className="font-medium text-card-foreground">
                                                {date.name}
                                            </span>
                                            <span className="flex items-center gap-2 text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                {format(date.date, "PPp")}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => {
                                importDatesheet(dates);
                                setShowConfirm(false);
                            }}
                        >
                            Import
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
