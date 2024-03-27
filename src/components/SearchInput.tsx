"use client";

import { cn } from "@/lib/utils";
import _ from "lodash";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import AccessibleToolTip from "./ui/accessible-tooltip";
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
    search?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({
    label,
    searchList,
    search = true,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()!;

    const param = searchParams.get(label);

    const validateQuery = useCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.delete(label);
        return params.toString();
    }, [searchParams, label]);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);
            params.delete("subject");
            return params.toString();
        },
        [searchParams]
    );

    if (param && !searchList.some((value) => param === value.label)) {
        const validQuery = validateQuery();
        router.push(pathname + "?" + validQuery, { scroll: false });
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <AccessibleToolTip label={`Choose your ${_.startCase(label)}`}>
                <PopoverTrigger asChild>
                    <Button
                        variant={!param ? "default" : "outline"}
                        role="combobox"
                        aria-expanded={open}
                        disabled={!mounted}
                        className="justify-between"
                    >
                        {!param ? _.startCase(label) : param}
                        <ChevronsUpDown className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
            </AccessibleToolTip>
            <PopoverContent>
                {mounted ? (
                    <Command>
                        {search ? (
                            <CommandInput
                                placeholder={`Search ${_.startCase(label)}...`}
                            />
                        ) : null}
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
                                                        ),
                                                    { scroll: false }
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
                ) : null}
            </PopoverContent>
        </Popover>
    );
};

export default SearchInput;
