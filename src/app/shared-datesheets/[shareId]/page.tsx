import { getSharedDatesheet } from "@/lib/shared-datesheet";
import { notFound } from "next/navigation";
import { ImportDatesheetButton } from "@/components/ImportDatesheetButton";
import LayoutWrapper from "@/layouts/LayoutWrapper";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatesheetTimeline } from "@/components/DatesheetTimeline";

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

                    <DatesheetTimeline dates={datesheet.dates} />
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
