import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { ArrowBigUp } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

interface VoteProps {
    material: Drive;
    vote:
        | {
              voteCount: number;
              hasVoted: boolean;
              id: string;
              name: string;
          }
        | undefined;
    isLoading: boolean;
}

const Upvote: FC<VoteProps> = ({ material, vote, isLoading }) => {
    const [clientVote, setClientVote] = useState<number>(vote?.voteCount ?? 0);
    const [clientHasVoted, setClientHasVoted] = useState<boolean>(
        vote?.hasVoted ?? false
    );

    const queryClient = useQueryClient();

    useEffect(() => {
        if (vote) {
            setClientVote(vote.voteCount);
            setClientHasVoted(vote.hasVoted);
        }
    }, [vote]);

    const { mutate, isPending } = useMutation({
        mutationKey: ["vote", material.id, material.name],
        mutationFn: async () => {
            const response: AxiosResponse<{ voteCount: number }> =
                await axios.post("/api/vote", {
                    id: material.id,
                    name: material.name,
                });

            return response.data;
        },
        onMutate: async () => {
            setClientVote((prev) => prev + 1);
            setClientHasVoted(true);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
            if (err) {
                setClientVote((prev) => prev - 1);
                setClientHasVoted(false);
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
                queryKey: ["votes"],
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
                    "pointer-events-none": clientHasVoted,
                }
            )}
            onClick={(e) => {
                e.stopPropagation();
                if (!clientHasVoted) {
                    mutate();
                }
            }}
        >
            <ArrowBigUp
                className={cn("h-4 w-4 stroke-primary transition-colors", {
                    "fill-primary": clientHasVoted,
                })}
            />
            <span
                className={cn({
                    "animate-pulse": isLoading || isPending,
                })}
            >
                {clientVote > 0 ? clientVote : "Upvote"}
            </span>
        </div>
    );
};

export default Upvote;
