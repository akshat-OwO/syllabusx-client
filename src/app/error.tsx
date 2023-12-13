"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import LayoutWrapper from "@/layouts/LayoutWrapper";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface errorProps {}

const Error: FC<errorProps> = ({}) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { toast } = useToast();

    const clearCache = () => {
        queryClient.clear();
        toast({
            title: "Cache Cleared!",
            variant: "destructive",
        });
        router.push("/");
    };

    return (
        <LayoutWrapper className="min-h-[calc(100vh-7rem)] py-20">
            <div className="flex flex-col items-center gap-y-2">
                <div className="prose prose-sm prose-neutral dark:prose-invert md:prose-base">
                    <h1 className="text-center">
                        Uh-oh! Something Went{" "}
                        <span className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 bg-clip-text text-transparent">
                            Wrong
                        </span>
                    </h1>
                </div>
                <div className="prose prose-sm prose-neutral dark:prose-invert">
                    <p className="text-center">
                        Looks like there&apos;s a glitch in the matrix.
                        Meanwhile, you can try refreshing the page, checking
                        your internet connection, or returning to the{" "}
                        <Link href="/">Homepage</Link>.
                    </p>
                    <p className="text-center">
                        If the problem persists, feel free to{" "}
                        <a
                            href="https://forms.gle/BFTv1uy8L33ptic6A"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            contact us
                        </a>{" "}
                        for assistance. We appreciate your patience!
                    </p>
                    <p className="text-center text-xs">
                        P.S. You can clear cache using this{" "}
                        <Button
                            variant={"destructive"}
                            size={"sm"}
                            className="h-fit p-2 text-xs"
                            onClick={clearCache}
                        >
                            scary button
                        </Button>
                    </p>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Error;
