"use client";
import { useMutation } from "@tanstack/react-query";
import { TMockSchema } from "@/lib/schemas";
import { Button } from "./ui/button";
import { Download, Loader2 } from "lucide-react";
import { compress, compressToEncodedURIComponent } from "lz-string";

export const PDFDownloadButton = ({ data }: { data: TMockSchema }) => {
    const { mutate, isPending } = useMutation({
        mutationKey: ["generate", "pdf"],
        mutationFn: async () => {
            const compressedData = compressToEncodedURIComponent(
                compress(JSON.stringify(data))
            );

            const url = `/api/generate-pdf?data=${compressedData}`;

            const response = await fetch(url, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to generate PDF");
            }

            return response.blob();
        },
        onSuccess: (pdfBlob) => {
            const timestamp = new Date().toLocaleString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });

            const filename = `${data.output.examMetadata.subject}_${
                data.output.examMetadata.type
            }_${timestamp.replace(/[/: ]/g, "-")}_exam.pdf`;

            const url = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        },
        onError: (error) => {
            console.error("Error generating PDF:", error);
        },
    });

    return (
        <Button
            variant="default"
            size="icon"
            onClick={() => mutate()}
            disabled={isPending}
        >
            {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Download className="h-4 w-4" />
            )}
        </Button>
    );
};
