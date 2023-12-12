import { branchList, semesterList } from "@/config";
import { FC } from "react";
import SearchInput from "./SearchInput";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

interface BtechCardProps {}

const BtechCard: FC<BtechCardProps> = ({}) => {
    return (
        <Card className="col-span-3 lg:col-span-1 h-fit shadow-2xl">
            <CardHeader>
                <CardTitle>B.TECH</CardTitle>
                <CardDescription>
                    Who needs sleep when you can engineer dreams?
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <SearchInput label="semester" searchList={semesterList} />
                <SearchInput label="branch" searchList={branchList} />
            </CardContent>
        </Card>
    );
};

export default BtechCard;
