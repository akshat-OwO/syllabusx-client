import { bcaSemesterList } from "@/config";
import { FC } from "react";
import SearchInput from "./SearchInput";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

interface BcaCardProps {}

const BcaCard: FC<BcaCardProps> = ({}) => {
    return (
        <Card className="col-span-3 lg:col-span-1 h-fit shadow-2xl">
            <CardHeader>
                <CardTitle>BCA</CardTitle>
                <CardDescription>
                    The degree that turns caffeine into code.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <SearchInput label="semester" searchList={bcaSemesterList} />
            </CardContent>
        </Card>
    );
};

export default BcaCard;
