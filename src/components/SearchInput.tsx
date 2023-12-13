"use client";

import { cn } from "@/lib/utils";
import _ from "lodash";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { Button } from "./ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

type SearchList = {
    value: string;
    label: string;
};

interface SearchInputProps {
    label: string;
    searchList: SearchList[];
}

const SearchInput: FC<SearchInputProps> = ({ label, searchList }) => {
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()!;

    const param = searchParams.get(label);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={!param ? "default" : "outline"}
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {!param ? _.startCase(label) : param}
                    <ChevronsUpDown className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandInput
                        placeholder={`Search ${_.startCase(label)}...`}
                    />
                    <CommandEmpty>No {label} found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-36 pr-4">
                            {searchList.map((list) => (
                                <CommandItem
                                    key={list.value}
                                    value={list.label}
                                    onSelect={(currentValue) => {
                                        if (currentValue !== param) {
                                            router.push(
                                                pathname +
                                                    "?" +
                                                    createQueryString(
                                                        label,
                                                        list.label
                                                    )
                                            );
                                        }
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            param === list.label
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {list.label}
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default SearchInput;
