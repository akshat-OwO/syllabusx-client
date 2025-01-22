import { getAllSharedDatesheets } from "@/lib/shared-datesheet";
import { format } from "date-fns";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar, User, BookOpen, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import LayoutWrapper from "@/layouts/LayoutWrapper";

export default async function SharedDatesheets() {
    const datesheets = await getAllSharedDatesheets();
    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-16">
            <div>
                <h1 className="mb-8 text-3xl font-bold tracking-tight">
                    Shared Datesheets
                </h1>
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {datesheets.map((sheet) => (
                        <Card
                            key={sheet.id}
                            className="group relative flex flex-col justify-between transition-all hover:shadow-lg"
                        >
                            <CardHeader className="flex flex-col gap-1 pb-8">
                                <CardTitle className="transition-colors group-hover:text-primary">
                                    {sheet.title}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    {sheet.authorName}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <BookOpen className="h-4 w-4" />
                                    {sheet.dates.length} exam
                                    {sheet.dates.length === 1 ? "" : "s"}
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    {format(sheet.createdAt, "PPp")}
                                </div>
                            </CardFooter>

                            <div className="absolute bottom-6 right-4">
                                <Link
                                    href={`/shared-datesheets/${sheet.id}`}
                                    className={cn(
                                        buttonVariants({
                                            variant: "outline",
                                            size: "sm",
                                        }),
                                        "flex items-center gap-2"
                                    )}
                                >
                                    <Eye className="h-4 w-4" />
                                    View
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </LayoutWrapper>
    );
}
