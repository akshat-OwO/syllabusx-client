"use client";

import { Tab } from "@/config";
import { useEmbed } from "@/hooks/use-embed";
import { useFeedback } from "@/hooks/use-feedback";
import { getBcaStudyMaterial, getBtechStudyMaterial } from "@/lib/server";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@mantine/hooks";
import {
    QueryKey,
    QueryObserverResult,
    RefetchOptions,
    useQuery,
} from "@tanstack/react-query";
import { AlertCircle, Download, Heart, RotateCw } from "lucide-react";
import { Icons } from "./Icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { TabsContent } from "./ui/tabs";

interface StudyMaterialProps {
    tab: Tab;
    course: string;
    semester: string | null;
    branch: string | null;
    subject: string | null;
    note?: string;
    pyq?: string;
    book?: string;
    practical?: string;
}

const StudyMaterial = ({
    tab,
    book,
    note,
    practical,
    pyq,
    course,
    semester,
    branch,
    subject,
}: StudyMaterialProps) => {
    const [favorites, setFavorites] = useLocalStorage<string[]>({
        key: "favorites",
        defaultValue: [],
    });

    const embed = useEmbed();

    const addFavorite = (materialId: string) => {
        setFavorites((current) => {
            return [...current, materialId];
        });
    };

    const removeFavorite = (materialId: string) => {
        setFavorites((current) => {
            return current.filter((id) => id !== materialId);
        });
    };

    const downloadFile = (fileId: string) => {
        window.open(
            `https://drive.google.com/uc?export=download&id=${fileId}`,
            "_blank"
        );
    };

    const toggleFavorite = (d: Drive) => {
        if (favorites.includes(d.id)) {
            return removeFavorite(d.id);
        }
        return addFavorite(d.id);
    };

    const generateQueryKey = (): QueryKey => {
        if (course == "btech") {
            return [course, tab, semester, branch, subject];
        }
        return [course, tab, semester, subject];
    };

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: generateQueryKey(),
        queryFn: async () => {
            if (course == "btech") {
                return await getBtechStudyMaterial({
                    semester,
                    branch,
                    subject,
                    tab,
                    book,
                    note,
                    practical,
                    pyq,
                });
            }
            return await getBcaStudyMaterial({
                semester,
                subject,
                tab,
                book,
                note,
                practical,
                pyq,
            });
        },
    });

    return (
        <TabsContent value={tab}>
            <StudyMaterial.Header isFetching={isFetching} refetch={refetch} />
            {error ? <StudyMaterial.Error /> : null}

            {isLoading ? <StudyMaterial.Skeleton /> : null}

            {data && !error && (
                <div className="grid grid-cols-2 gap-4 rounded-md bg-accent p-1.5 md:grid-cols-3 xl:grid-cols-4">
                    {data.map((d) => (
                        <div
                            key={d.id}
                            className={cn(
                                "relative flex flex-col justify-center divide-y divide-secondary rounded-md"
                            )}
                        >
                            {!(
                                new Date(Date.parse(d.createdTime)).getTime() <
                                new Date(
                                    Date.now() - 2 * 24 * 60 * 60 * 1000
                                ).getTime()
                            ) && (
                                <div className="absolute left-1 top-1 h-2 w-2 animate-pulse rounded-full bg-primary" />
                            )}
                            <span
                                role="button"
                                title={`${d.name}`}
                                className={cn(
                                    "h-10 truncate rounded-t-md bg-background px-4 py-2 text-center text-sm font-semibold text-foreground transition-colors hover:bg-background/90",
                                    {
                                        "bg-primary text-primary-foreground hover:bg-primary/90":
                                            favorites.includes(d.id),
                                    }
                                )}
                                onClick={() =>
                                    embed.onOpen({
                                        embedLink:
                                            d.webViewLink.slice(0, -17) +
                                            "preview",
                                        name: d.name.slice(0, -4),
                                        embedId: d.id,
                                    })
                                }
                            >
                                {d.name.slice(0, -4)}
                            </span>
                            <div className="flex w-full items-center justify-start divide-x divide-secondary rounded-b-md">
                                <div
                                    role="button"
                                    title={`Vote ${d.name}`}
                                    className="flex flex-1 items-center gap-2 rounded-bl-md bg-background/75 px-2 py-1 font-semibold text-secondary-foreground hover:bg-background/60"
                                >
                                    <Icons.clap className="h-4 w-4 fill-primary" />{" "}
                                    {0}
                                </div>
                                <div
                                    role="button"
                                    title={`Add ${d.name} to favorites`}
                                    className="flex h-full items-center bg-background/75 px-3 py-1 font-semibold text-secondary-foreground hover:bg-background/60"
                                    onClick={() => toggleFavorite(d)}
                                >
                                    <Heart
                                        className={cn("h-4 w-4", {
                                            "fill-red-500 stroke-red-500 transition-colors":
                                                favorites.includes(d.id),
                                        })}
                                    />
                                </div>
                                <div
                                    role="button"
                                    title={`Download ${d.name}`}
                                    className="flex h-full items-center rounded-br-md bg-background/75 px-3 py-1 font-semibold text-secondary-foreground hover:bg-background/60"
                                    onClick={() => downloadFile(d.id)}
                                >
                                    <Download className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </TabsContent>
    );
};

StudyMaterial.Skeleton = function StudyMaterialSkeleton() {
    return (
        <div className="grid gap-5 rounded-md bg-accent p-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <Skeleton className="h-10 w-full bg-background" />
            <Skeleton className="h-10 w-full bg-background" />
            <Skeleton className="h-10 w-full bg-background" />
            <Skeleton className="h-10 w-full bg-background" />
        </div>
    );
};

StudyMaterial.Error = function StudyMaterialError() {
    const feedback = useFeedback();

    return (
        <>
            <Alert variant="secondary" className="border-0">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>No notes found!</AlertTitle>
                <AlertDescription>
                    Looks like this subject is feeling a bit lonely without
                    notes! Be the hero, upload some using our{" "}
                    <Button
                        variant="link"
                        className="h-fit px-0 py-0 underline"
                        onClick={feedback.onOpen}
                    >
                        feedback form
                    </Button>
                    !
                </AlertDescription>
            </Alert>
        </>
    );
};

StudyMaterial.Header = function StudyMaterialHeader({
    isFetching,
    refetch,
}: {
    isFetching: boolean;
    refetch: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<Drive[] | null, Error>>;
}) {
    return (
        <div className="mb-2 flex items-center justify-end gap-2">
            <Button
                variant={"secondary"}
                size={"icon"}
                disabled={isFetching}
                onClick={() => refetch()}
            >
                <RotateCw
                    className={cn("h-4 w-4", isFetching ? "animate-spin" : "")}
                />
            </Button>
        </div>
    );
};

export default StudyMaterial;
