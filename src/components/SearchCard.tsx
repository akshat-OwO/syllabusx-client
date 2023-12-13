import React, { FC } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

interface SearchCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const SearchCard: FC<SearchCardProps> = ({ children, description, title }) => {
    return (
        <Card className="col-span-3 h-fit shadow-2xl lg:col-span-1">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {children}
            </CardContent>
        </Card>
    );
};

export default SearchCard;
