import { getSharedDatesheet } from "@/lib/shared-datesheet";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { ImportDatesheetButton } from "@/components/ImportDatesheetButton";
import LayoutWrapper from "@/layouts/LayoutWrapper";

export default async function SharedDatesheetPage({
    params,
}: {
    params: { shareId: string };
}) {
    const datesheet = await getSharedDatesheet(params.shareId);
    if (!datesheet) return notFound();

    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-16">
            <div>
                <div className="mx-auto max-w-2xl">
                    <h1 className="mb-2 text-2xl font-bold">
                        {datesheet.title}
                    </h1>
                    <p className="text-muted-foreground">
                        Shared by {datesheet.authorName}
                    </p>

                    <div className="mt-8">
                        <h2 className="mb-4 font-semibold">Exam Schedule</h2>
                        <div className="space-y-3">
                            {datesheet.dates.map((date) => (
                                <div
                                    key={date.date}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                >
                                    <span className="font-medium">
                                        {date.name}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {format(date.date, "PPp")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
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
