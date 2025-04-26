"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDatesheet } from "@/hooks/use-datesheet";
import { useToast } from "./ui/use-toast";

export function ShareDatesheetDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [authorName, setAuthorName] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { dates } = useDatesheet();
    const { toast } = useToast();

    const handleShare = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/shared-datesheets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, authorName, dates }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(
                    errorData.message || "Failed to share datesheet"
                );
            }

            const { url } = await res.json();
            await navigator.clipboard.writeText(url);

            toast({
                title: "Share link copied!",
                description: "You can now share this datesheet with others.",
            });
            onOpenChange(false);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error sharing datesheet",
                description:
                    "Please try again later.You can share only 1 datesheet in 24hrs.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share Datesheet</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Your Name</label>
                        <Input
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            placeholder="Enter your name..."
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">
                            Datesheet Title
                        </label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a title..."
                        />
                    </div>
                    <Button
                        onClick={handleShare}
                        disabled={!authorName || !title || isLoading}
                        className="w-full"
                    >
                        {isLoading ? "Sharing..." : "Share Datesheet"}
                    </Button>
                </div>

                <div className="mt-4 text-sm text-muted-foreground">
                    <p>
                        Note: This datesheet will expire after{" "}
                        <strong>1 day</strong>. If someone imports it, the
                        expiration will be extended by <strong>24 hours</strong>
                        .
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
