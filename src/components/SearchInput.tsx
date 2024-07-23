"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import _ from "lodash";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";

interface SearchInputProps {
    searchList: { label: string; value: string }[];
    value: string | null;
    onSelect: (value: string) => void;
    label: string;
    search?: boolean;
}

const SearchInput = ({
    searchList,
    value,
    onSelect,
    label,
    search = false,
}: SearchInputProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSelect = (currentValue: string) => {
        onSelect(currentValue);
        setOpen(false);
    };

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={!value ? "default" : "outline"}
                        role="combobox"
                        aria-expanded={open}
                        disabled={!mounted}
                        className="justify-between"
                    >
                        {!value ? _.startCase(label) : value.toUpperCase()}
                        <ChevronsUpDown className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <SearchInput.List
                        isDesktop={isDesktop}
                        label={label}
                        onSelect={handleSelect}
                        search={search}
                        searchList={searchList}
                        value={value}
                    />
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    variant={!value ? "default" : "outline"}
                    role="combobox"
                    aria-expanded={open}
                    disabled={!mounted}
                    className="justify-between"
                >
                    {!value ? _.startCase(label) : value.toUpperCase()}
                    <ChevronsUpDown className="h-4 w-4" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="pb-5">
                <DrawerHeader>
                    <DrawerTitle>{_.startCase(label)}</DrawerTitle>
                </DrawerHeader>
                <SearchInput.List
                    isDesktop={isDesktop}
                    label={label}
                    onSelect={handleSelect}
                    search={search}
                    searchList={searchList}
                    value={value}
                />
            </DrawerContent>
        </Drawer>
    );
};

SearchInput.List = function SearchInputList({
    isDesktop = false,
    label,
    value,
    onSelect,
    search,
    searchList,
}: {
    search: boolean;
    isDesktop?: boolean;
    label: string;
    value: string | null;
    onSelect: (value: string) => void;
    searchList: { label: string; value: string }[];
}) {
    return (
        <Command>
            {search && (
                <CommandInput placeholder={`Search ${_.startCase(label)}...`} />
            )}
            <CommandEmpty>No {label} found</CommandEmpty>
            <CommandGroup>
                {isDesktop ? (
                    <ScrollArea className="h-36 pr-4">
                        {searchList.map((list) => (
                            <CommandItem
                                key={list.value}
                                value={list.label}
                                onSelect={onSelect}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === list.label
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {list.label}
                            </CommandItem>
                        ))}
                    </ScrollArea>
                ) : (
                    searchList.map((list) => (
                        <CommandItem
                            key={list.value}
                            value={list.label}
                            onSelect={onSelect}
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    value === list.label
                                        ? "opacity-100"
                                        : "opacity-0"
                                )}
                            />
                            {list.label}
                        </CommandItem>
                    ))
                )}
            </CommandGroup>
        </Command>
    );
};

export default SearchInput;
