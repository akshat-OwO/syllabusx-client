import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Loader } from "lucide-react";
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
                "flex flex-1 items-center gap-2 rounded-bl-md bg-background/75 px-2 py-1 font-semibold text-secondary-foreground transition-colors hover:bg-background/60",
                {
                    "pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90":
                        data ? data.hasClapped : false,
                }
            )}
            onClick={() => {
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
                <Icons.clap
                    className={cn("h-4 w-4 fill-primary transition-colors", {
                        "fill-secondary": data ? data.hasClapped : false,
                    })}
                />
            )}
            {data ? data.clapCount : 0}
        </div>
    );
};

export default Clap;
