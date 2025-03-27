"use client";

import { Courses, Tab } from "@/config";
import { useAi } from "@/hooks/use-ai";
import useStore from "@/hooks/use-store";
import { useEmbed } from "@/hooks/use-embed";
import { useFeedback } from "@/hooks/use-feedback";
import { getBcaStudyMaterial, getBtechStudyMaterial } from "@/lib/server";
import { cn } from "@/lib/utils";
import {
    QueryKey,
    QueryObserverResult,
    RefetchOptions,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    AlertCircle,
    Download,
    NotepadTextDashed,
    RotateCw,
} from "lucide-react";
import Upvote from "./Upvote";
import AccessibleToolTip from "./ui/accessible-tooltip";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { TabsContent } from "./ui/tabs";
import axios, { AxiosResponse } from "axios";
// import { useStore } from "zustand";

interface StudyMaterialProps {
    tab: Tab;
    course: Courses;
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
    const embed = useEmbed();

    const downloadFile = (fileId: string) => {
        window.open(
            `https://drive.google.com/uc?export=download&id=${fileId}`,
            "_blank"
        );
    };

    const generateQueryKey = (): QueryKey => {
        if (course === Courses.BTECH) {
            return [course, tab, semester, branch, subject];
        } else if (course === Courses.BCA) {
            return [course, tab, semester, subject];
        }
        return [];
    };

    const generateUpvoteQueryKey = (): QueryKey => {
        if (course === Courses.BTECH) {
            return ["votes", course, tab, semester, branch, subject];
        } else if (course === Courses.BCA) {
            return ["votes", course, tab, semester, subject];
        }
        return [];
    };

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: generateQueryKey(),
        queryFn: async () => {
            if (course === Courses.BTECH) {
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
            } else if (course === Courses.BCA) {
                return await getBcaStudyMaterial({
                    semester,
                    subject,
                    tab,
                    book,
                    note,
                    practical,
                    pyq,
                });
            }
            return null;
        },
    });

    const { data: votes, isLoading: isVoteLoading } = useQuery({
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: generateUpvoteQueryKey(),
        enabled: Array.isArray(data) && data.length > 0,
        queryFn: async () => {
            const files = data!.map((d) => ({ id: d.id, name: d.name }));

            const response: AxiosResponse<
                {
                    id: string;
                    name: string;
                    voteCount: number;
                    hasVoted: boolean;
                }[]
            > = await axios.post(`/api/vote?action=getVotes`, files);

            return response.data;
        },
    });

    return (
        <TabsContent value={tab}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    justifyContent: "flex-end",
                }}
            >
                <StudyMaterial.Header
                    isFetching={isFetching}
                    refetch={refetch}
                />
            </div>
            {error ? <StudyMaterial.Error /> : null}

            {isLoading ? <StudyMaterial.Skeleton /> : null}

            {data && !error && (
                <div className="grid grid-cols-2 gap-4 rounded-md bg-accent p-1.5 md:grid-cols-3 xl:grid-cols-4">
                    {data.map((d) => (
                        <div
                            key={d.id}
                            className={cn(
                                "relative flex flex-col justify-center rounded-md bg-background text-foreground hover:bg-background/90"
                            )}
                            onClick={() =>
                                embed.onOpen({
                                    embedLink:
                                        d.webViewLink.slice(0, -17) + "preview",
                                    name: d.name.slice(0, -4),
                                    embedId: d.id,
                                })
                            }
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
                                className="h-10 truncate rounded-t-md px-4 py-2 text-center text-sm font-semibold"
                            >
                                {d.name.slice(0, -4)}
                            </span>
                            <div className="flex w-full items-center justify-start gap-2 px-2 pb-2">
                                <Upvote
                                    material={d}
                                    isLoading={isVoteLoading}
                                    vote={votes?.find(
                                        (vote) => vote.id === d.id
                                    )}
                                />
                                <div
                                    role="button"
                                    title={`Download ${d.name}`}
                                    className="flex items-center rounded-md border border-border bg-secondary/30 p-1.5 font-semibold text-foreground hover:bg-secondary/20"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        downloadFile(d.id);
                                    }}
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
    const queryClient = useQueryClient();

    const ai = useStore(useAi, (state) => state);

    return (
        <div className="mb-2 flex items-center justify-end gap-2">
            <AccessibleToolTip label="Generate mock test">
                <Button
                    variant={"secondary"}
                    size={"icon"}
                    onClick={() => {
                        ai?.mock.onOpen();
                    }}
                >
                    <NotepadTextDashed className="h-5 w-5" />
                </Button>
            </AccessibleToolTip>

            <Button
                variant={"secondary"}
                size={"icon"}
                disabled={isFetching}
                onClick={() => {
                    queryClient.invalidateQueries({ queryKey: ["votes"] });
                    refetch();
                }}
            >
                <RotateCw
                    className={cn("h-4 w-4", isFetching ? "animate-spin" : "")}
                />
            </Button>
        </div>
    );
};

export default StudyMaterial;
