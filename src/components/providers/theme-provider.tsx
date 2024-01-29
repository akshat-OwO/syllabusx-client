"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { ThemeWrapper } from "../theme/theme-wrapper";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <ThemeWrapper>{children}</ThemeWrapper>
        </NextThemesProvider>
    );
}
