"use client";

import { useConfig } from "@/hooks/use-config";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { CheckIcon, MoonIcon, Palette, SunIcon, Undo } from "lucide-react";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { Drawer } from "vaul";
import { Button } from "../ui/button";
import { DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";
import { ThemeWrapper } from "./theme-wrapper";

interface ThemeCustomizerProps {}

const ThemeCustomizer: FC<ThemeCustomizerProps> = ({}) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div className="flex items-center space-x-2">
            <Drawer.Root>
                <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Palette className="h-4 w-4" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[85%] p-6 pt-10">
                    <Customizer />
                </DrawerContent>
            </Drawer.Root>
            <div className="hidden md:flex">
                {mounted ? (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Palette className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            align="end"
                            className="z-50 w-[340px] rounded-[0.5rem] p-6"
                        >
                            <Customizer />
                        </PopoverContent>
                    </Popover>
                ) : null}
            </div>
        </div>
    );
};

function Customizer() {
    const [mounted, setMounted] = useState(false);
    const { setTheme: setMode, resolvedTheme: mode } = useTheme();
    const [config, setConfig] = useConfig();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex flex-col space-y-4 md:space-y-6">
            <div className="flex items-start">
                <div className="space-y-1 pr-2">
                    <div className="font-semibold leading-none tracking-tight">
                        Customize (Beta)
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Pick a style and color.
                    </div>
                </div>
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
                    }}
                >
                    <Undo />
                    <span className="sr-only">Reset</span>
                </Button>
            </div>
            <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
                <div className="space-y-1.5">
                    <Label className="text-xs">Color</Label>
                    <div className="grid grid-cols-3 gap-2">
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
                                        "justify-start",
                                        isActive && "border-2 border-primary"
                                    )}
                                    style={
                                        {
                                            "--theme-primary": `hsl(${theme
                                                ?.activeColor[
                                                mode === "dark"
                                                    ? "dark"
                                                    : "light"
                                            ]})`,
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
                                            radius: parseFloat(value),
                                        });
                                    }}
                                    className={cn(
                                        config.radius === parseFloat(value) &&
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
                    <div className="grid grid-cols-3 gap-2">
                        {mounted ? (
                            <>
                                <Button
                                    variant={"outline"}
                                    size="sm"
                                    onClick={() => setMode("light")}
                                    className={cn(
                                        mode === "light" &&
                                            "border-2 border-primary"
                                    )}
                                >
                                    <SunIcon className="mr-1 -translate-x-1" />
                                    Light
                                </Button>
                                <Button
                                    variant={"outline"}
                                    size="sm"
                                    onClick={() => setMode("dark")}
                                    className={cn(
                                        mode === "dark" &&
                                            "border-2 border-primary"
                                    )}
                                >
                                    <MoonIcon className="mr-1 -translate-x-1" />
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
        </div>
    );
}

export default ThemeCustomizer;
