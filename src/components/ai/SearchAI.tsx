"use client";

import { useSelectionAI } from "@/hooks/use-selection-ai";
import { Sparkles } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";

interface SearchAIProps {
    selection: Selection | null;
}

const SearchAI: FC<SearchAIProps> = ({ selection }) => {
    const selectionAI = useSelectionAI();

    const [selectedText, setSelectedText] = useState<string>(() => {
        const initialText = selection ? "What is " + selection.toString() : "";
        selectionAI.setSearchedText(initialText);
        return initialText;
    });

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSelectedText(e.target.value);
        selectionAI.setSearchedText(e.target.value);
    };

    const onClick = () => {
        selectionAI.onOpen();
    };

    return (
        <Card className="p-2">
            <CardContent className="flex min-w-[20rem] max-w-sm flex-col gap-2 p-0">
                <Textarea
                    maxRows={5}
                    value={selectedText}
                    onChange={onChange}
                    placeholder="Search AI"
                />
                <Button
                    onClick={onClick}
                    size="sm"
                    variant="secondary"
                    className="w-full gap-2"
                >
                    <Sparkles className="h-4 w-4" />
                    Search AI (Beta)
                </Button>
            </CardContent>
        </Card>
    );
};

export default SearchAI;
