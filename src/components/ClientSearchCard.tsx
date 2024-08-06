"use client";
import { useParams } from "next/navigation";
import SearchCard from "@/components/SearchCard";

export default function ClientSearchCard({
    title,
    description,
    semesterList,
    branchList,
    hasBranches = true,
}: {
    title: string;
    description: string;
    semesterList: { label: string; value: string }[];
    branchList?: { label: string; value: string }[];
    hasBranches?: boolean;
}) {
    const params = useParams<{ slug: string[] }>();

    return (
        <SearchCard
            title={title}
            description={description}
            semesterList={semesterList}
            branchList={branchList}
            hasBranches={hasBranches}
            key={params.slug ? params.slug.join("-") : "default"}
        />
    );
}
