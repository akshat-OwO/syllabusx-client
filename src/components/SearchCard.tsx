"use client";
import React, { FC, useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import SearchInput from "@/components/SearchInput";
import { useParams, usePathname, useRouter } from "next/navigation";

interface SearchCardProps {
    title: string;
    description: string;
    semesterList: { label: string; value: string }[];
    branchList?: { label: string; value: string }[];
    hasBranches?: boolean;
}

const SearchCard: FC<SearchCardProps> = ({
    description,
    title,
    semesterList,
    branchList,
    hasBranches = true,
}) => {
    const router = useRouter();
    const params = useParams<{ slug: string[] }>();
    const pathname = usePathname();

    const [semester, setSemester] = useState<string | null>(null);
    const [branch, setBranch] = useState<string | null>(null);

    useEffect(() => {
        if (params && params.slug) {
            setSemester(params.slug[0] || null);
            setBranch(hasBranches ? params.slug[1] || null : null);
        }
    }, [params, hasBranches]);

    const handleSemesterChange = (value: string) => {
        setSemester(value);
        updateURL(value, branch);
    };

    const handleBranchChange = (value: string) => {
        setBranch(value);
        updateURL(semester, value);
    };

    const updateURL = (sem: string | null, br: string | null) => {
        if (sem && (br || !hasBranches)) {
            const newPath = hasBranches
                ? `/courses/btech/${sem}/${br}`
                : `/courses/bca/${sem}`;
            if (newPath !== pathname) {
                router.push(newPath, { scroll: false });
            }
        }
    };

    return (
        <Card className="col-span-3 h-fit shadow-2xl lg:col-span-1">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <SearchInput
                    label="semester"
                    searchList={semesterList}
                    value={semester}
                    onSelect={handleSemesterChange}
                />
                {hasBranches && (
                    <SearchInput
                        label="branch"
                        searchList={branchList || []}
                        value={branch}
                        onSelect={handleBranchChange}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default SearchCard;
