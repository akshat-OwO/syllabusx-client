"use client";

import { useConfig } from "@/hooks/use-config";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { CheckIcon, MoonIcon, Palette, SunIcon, Undo, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Skeleton } from "../ui/skeleton";

const ThemeCustomizer = () => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div className="flex items-center space-x-2">
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Palette className="h-4 w-4" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[85%] px-6">
                    <Customizer />
                </DrawerContent>
            </Drawer>
            <div className="hidden md:flex">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" disabled={!mounted} size="icon">
                            <Palette className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        isCloseTriggerVisible={false}
                        className="z-50"
                    >
                        {mounted ? <Customizer closeTriggerHidden /> : null}
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

interface CustomizerProps {
    closeTriggerHidden?: boolean;
}

function Customizer({ closeTriggerHidden = false }: CustomizerProps) {
    const [mounted, setMounted] = useState(false);
    const { setTheme: setMode, resolvedTheme: mode } = useTheme();
    const [config, setConfig] = useConfig();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex flex-col space-y-4 md:space-y-6">
            <div className="flex items-start justify-between pt-6 md:pt-0">
                <div className="space-y-1">
                    <div className="font-semibold leading-none tracking-tight">
                        Customize SyllabusX
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Tweak it, twist it, make it funky!
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto rounded-[0.5rem]"
                        onClick={() => {
                            setConfig({
                                ...config,
                                theme: "neutral",
                                radius: 0.5,
                            });
                            setMode("dark");
                        }}
                    >
                        <Undo />
                        <span className="sr-only">Reset</span>
                    </Button>
                    {closeTriggerHidden && (
                        <SheetClose asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-auto rounded-[0.5rem]"
                            >
                                <X />
                                <span className="sr-only">Close</span>
                            </Button>
                        </SheetClose>
                    )}
                </div>
            </div>
            <ScrollArea className="h-screen pb-32">
                <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
                    <div className="space-y-1.5">
                        <Label className="text-xs">Color</Label>
                        <div className="flex flex-wrap items-center gap-2">
                            {themes.map((theme) => {
                                const isActive = config.theme === theme.name;
                                return mounted ? (
                                    <Button
                                        variant={"outline"}
                                        size="sm"
                                        key={theme.name}
                                        onClick={() => {
                                            setConfig({
                                                ...config,
                                                theme: theme.name,
                                            });
                                        }}
                                        className={cn(
                                            "flex-1 justify-start",
                                            isActive &&
                                                "border-2 border-primary"
                                        )}
                                        style={
                                            {
                                                "--theme-primary": `hsl(${
                                                    theme?.activeColor[
                                                        mode === "dark"
                                                            ? "dark"
                                                            : "light"
                                                    ]
                                                })`,
                                            } as React.CSSProperties
                                        }
                                    >
                                        <span
                                            className={cn(
                                                "mr-1 flex h-4 w-4 shrink-0 -translate-x-1 items-center justify-center rounded bg-[--theme-primary]"
                                            )}
                                        >
                                            {isActive && (
                                                <CheckIcon className="h-3 w-3 text-white" />
                                            )}
                                        </span>
                                        {theme.label}
                                    </Button>
                                ) : (
                                    <Skeleton
                                        className="h-8 w-full"
                                        key={theme.name}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs">Radius</Label>
                        <div className="grid grid-cols-5 gap-2">
                            {["0", "0.3", "0.5", "0.75", "1.0"].map((value) => {
                                return (
                                    <Button
                                        variant={"outline"}
                                        size="sm"
                                        key={value}
                                        onClick={() => {
                                            setConfig({
                                                ...config,
                                                radius: Number.parseFloat(
                                                    value
                                                ),
                                            });
                                        }}
                                        className={cn(
                                            config.radius ===
                                                Number.parseFloat(value) &&
                                                "border-2 border-primary"
                                        )}
                                    >
                                        {value}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs">Mode</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {mounted ? (
                                <>
                                    <Button
                                        variant={"outline"}
                                        size="sm"
                                        onClick={() => setMode("light")}
                                        className={cn(
                                            "gap-2",
                                            mode === "light" &&
                                                "border-2 border-primary"
                                        )}
                                    >
                                        <SunIcon className="size-4" />
                                        Light
                                    </Button>
                                    <Button
                                        variant={"outline"}
                                        size="sm"
                                        onClick={() => setMode("dark")}
                                        className={cn(
                                            "gap-2",
                                            mode === "dark" &&
                                                "border-2 border-primary"
                                        )}
                                    >
                                        <MoonIcon className="size-4" />
                                        Dark
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Skeleton className="h-8 w-full" />
                                    <Skeleton className="h-8 w-full" />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}

export default ThemeCustomizer;
