import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { Icons } from "./Icons";

interface ClapProps {
    material: Drive;
}

const Clap: FC<ClapProps> = ({ material }) => {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
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
        refetchInterval: 1000 * 60 * 60 * 8,
    });

    const { mutate } = useMutation({
        mutationKey: ["clap", material.id, material.name],
        mutationFn: async () => {
            const response: AxiosResponse<{ clapCount: number }> =
                await axios.post("/api/clap", {
                    id: material.id,
                    name: material.name,
                });

            return response.data;
        },
        onSuccess: () => {
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
                    "bg-primary text-primary-foreground hover:bg-primary/90":
                        data ? data.hasClapped : false,
                }
            )}
            onClick={() => mutate()}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
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
