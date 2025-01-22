import { getAllSharedDatesheets } from "@/lib/shared-datesheet";
import { format } from "date-fns";

export default async function SharedDatesheets() {
    const datesheets = await getAllSharedDatesheets();

    return (
        <div className="container py-10">
            <h1 className="mb-6 text-2xl font-bold">Shared Datesheets</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {datesheets.map((sheet) => (
                    <a
                        key={sheet.id}
                        href={`/shared-datesheets/${sheet.id}`}
                        className="block rounded-lg border p-6 transition-colors hover:border-primary"
                    >
                        <h2 className="text-lg font-semibold">{sheet.title}</h2>
                        <p className="text-sm text-muted-foreground">
                            Shared by {sheet.authorName}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Created {format(sheet.createdAt, "PPp")}
                        </p>
                        <p className="mt-2 text-sm">
                            {sheet.dates.length} exam
                            {sheet.dates.length === 1 ? "" : "s"}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
}
