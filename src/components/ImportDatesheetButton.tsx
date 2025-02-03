"use client";

import { Button } from "@/components/ui/button";
import { useDatesheet } from "@/hooks/use-datesheet";
import { useToast } from "@/components/ui/use-toast";

export function ClientButton({
    dates,
}: {
    dates: Array<{ name: string; date: number }>;
}) {
    const { importDatesheet } = useDatesheet();
    const { toast } = useToast();
    const { onOpen } = useDatesheet();

    const handleImport = () => {
        importDatesheet(dates);
        onOpen();
        toast({
            title: "Datesheet imported successfully!",
            description: "Your datesheet has been updated.",
        });
    };

    return (
        <Button className="w-full" variant="default" onClick={handleImport}>
            Import Datesheet
        </Button>
    );
}
