"use client";

import { Sparkles } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";

interface SearchAIProps {
    selection: Selection | null;
}

const SearchAI: FC<SearchAIProps> = ({ selection }) => {
    const [selectedText, setSelectedText] = useState<string>(() =>
        selection ? "What is " + selection.toString() : ""
    );

    return (
        <Card className="p-2">
            <CardContent className="flex min-w-[20rem] max-w-sm flex-col gap-2 p-0">
                <Textarea
                    value={selectedText}
                    onChange={(e) => setSelectedText(e.target.value)}
                    placeholder="Search AI"
                />
                <Button size="sm" variant="secondary" className="w-full gap-2">
                    <Sparkles className="h-4 w-4" />
                    Search AI (Beta)
                </Button>
            </CardContent>
        </Card>
    );
};

export default SearchAI;
