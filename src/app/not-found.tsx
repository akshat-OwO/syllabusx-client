"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import LayoutWrapper from "@/layouts/LayoutWrapper";
import { useQueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const metadata: Metadata = {
    title: "Oops! Page Not Found",
    description:
        "Oops! It seems like you've wandered into uncharted territory. Our SyllabusX compass couldn't locate the page you're looking for. Don't worry, let's guide you back to the main path of academic resources",
};

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}) => {
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
                        Oops! Page Not{" "}
                        <span className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 bg-clip-text text-transparent">
                            Found
                        </span>
                    </h1>
                </div>
                <div className="prose prose-sm prose-neutral dark:prose-invert">
                    <p className="text-center">
                        It seems you&apos;ve ventured into uncharted territory.
                        The page you are looking for might have taken a detour
                        or never existed in the first place.
                    </p>
                    <p className="text-center">
                        You can return to the <Link href="/">Homepage</Link> or
                        try searching for what you&apos;re looking for.
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

export default NotFound;
