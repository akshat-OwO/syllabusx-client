import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { ArrowBigUp, Loader } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";
import { Icons } from "./Icons";

interface ClapProps {
    material: Drive;
}

const Clap: FC<ClapProps> = ({ material }) => {
    const queryClient = useQueryClient();

    const { data, isFetching } = useQuery({
        queryKey: ["clap", material.id, material.name],
        queryFn: async () => {
            const response: AxiosResponse<{
                clapCount: number;
                hasClapped: boolean;
            }> = await axios.get(
                `/api/clap?id=${material.id}&name=${material.name}`
            );

            return response.data;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["clap", material.id, material.name],
        mutationFn: async () => {
            const response: AxiosResponse<{ clapCount: number }> =
                await axios.post("/api/clap", {
                    id: material.id,
                    name: material.name,
                });

            return response.data;
        },
        onMutate: async (newCount: {
            clapCount: number;
            hasClapped: boolean;
        }) => {
            await queryClient.cancelQueries({ queryKey: ["clap"] });

            const previousCount = queryClient.getQueryData([
                "clap",
                material.id,
                material.name,
            ]);

            if (previousCount) {
                queryClient.setQueryData(["clap", material.id, material.name], {
                    clapCount: newCount.clapCount + 1,
                    hasClapped: true,
                });
            }

            return { previousCount };
        },
        onError: (err: any, variables, context) => {
            if (context?.previousCount) {
                queryClient.setQueryData(
                    ["clap", material.id, material.name],
                    context.previousCount
                );
            }
            if (err) {
                toast.error(err.response.data.error);
            }
        },
        onSuccess: () => {
            toast.success(
                "Thanks for clapping! Your vote will be removed within 30 days!"
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["clap", material.id, material.name],
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
                    "pointer-events-none": data ? data.hasClapped : false,
                }
            )}
            onClick={(e) => {
                e.stopPropagation();
                if (data && !data.hasClapped) {
                    mutate({
                        clapCount: data.clapCount,
                        hasClapped: data.hasClapped,
                    });
                }
            }}
        >
            {isFetching || isPending ? (
                <Loader className="h-4 w-4 animate-spin" />
            ) : (
                <ArrowBigUp
                    className={cn("h-4 w-4 stroke-primary transition-colors", {
                        "fill-primary": data ? data.hasClapped : false,
                    })}
                />
            )}
            {data && data.clapCount > 0 ? data.clapCount : "Upvote"}
        </div>
    );
};

export default Clap;
