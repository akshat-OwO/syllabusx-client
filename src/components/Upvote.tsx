import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { ArrowBigUp, Loader } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

interface VoteProps {
    material: Drive;
}

const Upvote: FC<VoteProps> = ({ material }) => {
    const queryClient = useQueryClient();

    const { data, isFetching } = useQuery({
        queryKey: ["vote", material.id, material.name],
        queryFn: async () => {
            const response: AxiosResponse<{
                voteCount: number;
                hasVoted: boolean;
            }> = await axios.get(
                `/api/vote?id=${material.id}&name=${material.name}`
            );

            return response.data;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });

    const { mutate } = useMutation({
        mutationKey: ["vote", material.id, material.name],
        mutationFn: async () => {
            const response: AxiosResponse<{ voteCount: number }> =
                await axios.post("/api/vote", {
                    id: material.id,
                    name: material.name,
                });

            return response.data;
        },
        onMutate: async (newCount: {
            voteCount: number;
            hasVoted: boolean;
        }) => {
            await queryClient.cancelQueries({ queryKey: ["vote"] });

            const previousCount = queryClient.getQueryData([
                "vote",
                material.id,
                material.name,
            ]);

            if (previousCount) {
                queryClient.setQueryData(["vote", material.id, material.name], {
                    voteCount: newCount.voteCount + 1,
                    hasVoted: true,
                });
            }

            return { previousCount };
        },
        onError: (err: any, variables, context) => {
            if (context?.previousCount) {
                queryClient.setQueryData(
                    ["vote", material.id, material.name],
                    context.previousCount
                );
            }
            if (err) {
                toast.error(err.response.data.error);
            }
        },
        onSuccess: () => {
            toast.success(
                "Thanks for voting! Your vote will be removed within 30 days!"
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["vote", material.id, material.name],
            });
        },
    });

    return (
        <div
            role="button"
            title={`Vote ${material.name}`}
            className={cn(
                "flex flex-1 items-center gap-2 rounded-md border border-border bg-secondary/30 px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary/20",
                {
                    "pointer-events-none": data ? data.hasVoted : false,
                }
            )}
            onClick={(e) => {
                e.stopPropagation();
                if (data && !data.hasVoted) {
                    mutate({
                        voteCount: data.voteCount,
                        hasVoted: data.hasVoted,
                    });
                }
            }}
        >
            <ArrowBigUp
                className={cn("h-4 w-4 stroke-primary transition-colors", {
                    "fill-primary": data ? data.hasVoted : false,
                })}
            />
            {data &&
                (isFetching ? (
                    <Loader className="h-4 w-4 animate-spin" />
                ) : data.voteCount > 0 ? (
                    data.voteCount
                ) : (
                    "Upvote"
                ))}
        </div>
    );
};

export default Upvote;
