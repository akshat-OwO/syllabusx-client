"use client";

import { Tab } from "@/config";
import { getBtechStudyMaterial } from "@/lib/server";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { Check, Frown, Heart, RotateCw, Upload, X } from "lucide-react";
import React, { FC, useState } from "react";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { TabsContent } from "./ui/tabs";

interface StudyMaterialProps {
    tab: Tab;
    semester: string | null;
    branch: string | null;
    subject: string | null;
    note?: string;
    pyq?: string;
    book?: string;
    practical?: string;
    embed: Embed;
    showEmbed: boolean;
    setShowEmbed: React.Dispatch<React.SetStateAction<boolean>>;
    setEmbed: React.Dispatch<React.SetStateAction<Embed>>;
}

const StudyMaterial: FC<StudyMaterialProps> = ({
    tab,
    book,
    note,
    practical,
    pyq,
    semester,
    branch,
    subject,
    embed,
    showEmbed,
    setShowEmbed,
    setEmbed,
}) => {
    const [createFav, setCreateFav] = useState<boolean>(false);
    const [favorites, setFavorites] = useLocalStorage<string[]>({
        key: "favorites",
        defaultValue: [],
    });

    const handleEmbed = (d: Drive) => {
        if (!createFav) {
            setEmbed({
                embedLink: d.webViewLink.slice(0, -17) + "preview",
                name: d.name.slice(0, -4),
            });
            setShowEmbed(true);
        }
    };

    const exitEmbed = () => {
        setShowEmbed(false);
        setEmbed({ embedLink: "", name: "" });
    };

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

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ["btech", tab, semester, branch, subject],
        queryFn: async () => {
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
        },
        staleTime: 1000 * 60 * 60 * 2,
    });

    return (
        <TabsContent value={tab}>
            {error ? (
                <>
                    <div className="mb-2 flex items-center justify-end">
                        <Button
                            size={"icon"}
                            disabled={isFetching}
                            onClick={() => refetch()}
                        >
                            <RotateCw
                                className={cn(
                                    "h-4 w-4",
                                    isFetching ? "animate-spin" : ""
                                )}
                            />
                        </Button>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-accent p-5">
                        <div className="flex items-center gap-2">
                            <div className="prose prose-neutral dark:prose-invert">
                                <h6>No Notes Found!</h6>
                            </div>
                            <Frown className="h-4 w-4" />
                        </div>
                        <a
                            href="https://forms.gle/BFTv1uy8L33ptic6A"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({ variant: "tertiary" })
                            )}
                        >
                            Fix This!
                        </a>
                    </div>
                </>
            ) : null}

            {isLoading ? (
                <div className="grid gap-5 rounded-md bg-accent p-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    <Skeleton className="h-10 w-full bg-background" />
                    <Skeleton className="h-10 w-full bg-background" />
                    <Skeleton className="h-10 w-full bg-background" />
                    <Skeleton className="h-10 w-full bg-background" />
                </div>
            ) : null}

            {showEmbed ? (
                <div className="mb-2 flex flex-col gap-2 rounded-md bg-accent p-2">
                    <div className="flex items-center justify-between">
                        <div className="prose prose-neutral dark:prose-invert">
                            <h4>{embed.name}</h4>
                        </div>
                        <Button size={"icon"} onClick={exitEmbed}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <iframe src={embed.embedLink} className="h-[75vh]"></iframe>
                </div>
            ) : null}

            {data && !error ? (
                <>
                    <div className="mb-2 flex items-center justify-end gap-2">
                        {createFav ? (
                            <Button
                                size={"icon"}
                                onClick={() => setCreateFav(false)}
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                variant={"secondary"}
                                size={"icon"}
                                onClick={() => setCreateFav(true)}
                            >
                                <Heart className="h-4 w-4" />
                            </Button>
                        )}

                        <Button
                            variant={"secondary"}
                            size={"icon"}
                            disabled={isFetching}
                            onClick={() => refetch()}
                        >
                            <RotateCw
                                className={cn(
                                    "h-4 w-4",
                                    isFetching ? "animate-spin" : ""
                                )}
                            />
                        </Button>
                    </div>
                    <div className="grid gap-5 rounded-md bg-accent p-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {data.map((d) => (
                            <div
                                key={d.id}
                                className={cn(
                                    buttonVariants({
                                        variant:
                                            embed.embedLink ===
                                            d.webViewLink.slice(0, -17) +
                                                "preview"
                                                ? "ghost"
                                                : favorites.includes(d.id)
                                                  ? "default"
                                                  : "tertiary",
                                        className:
                                            "group relative h-full cursor-pointer whitespace-normal text-center shadow-sm",
                                    })
                                )}
                                onClick={() => handleEmbed(d)}
                            >
                                {!(
                                    new Date(
                                        Date.parse(d.createdTime)
                                    ).getTime() <
                                    new Date(
                                        Date.now() - 2 * 24 * 60 * 60 * 1000
                                    ).getTime()
                                ) ? (
                                    <Badge
                                        variant={"secondary"}
                                        className="absolute -left-2 -top-2 z-10 rounded-sm bg-teal-600 hover:bg-teal-600 group-hover:animate-pulse"
                                    >
                                        New
                                    </Badge>
                                ) : null}
                                {createFav ? (
                                    <div className="absolute top-0 flex h-full w-full items-center justify-center bg-background/90">
                                        {favorites.includes(d.id) ? (
                                            <div
                                                className={cn(
                                                    buttonVariants({
                                                        variant: "ghost",
                                                        size: "icon",
                                                    })
                                                )}
                                                onClick={() =>
                                                    removeFavorite(d.id)
                                                }
                                            >
                                                <Heart className="h-4 w-4 fill-red-500 stroke-red-500" />
                                            </div>
                                        ) : (
                                            <div
                                                className={cn(
                                                    buttonVariants({
                                                        variant: "ghost",
                                                        size: "icon",
                                                    })
                                                )}
                                                onClick={() =>
                                                    addFavorite(d.id)
                                                }
                                            >
                                                <Heart className="h-4 w-4" />
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                                <div>{d.name.slice(0, -4)}</div>
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
        </TabsContent>
    );
};

export default StudyMaterial;
