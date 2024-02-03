"use client";

import * as SelectionPopover from "selection-popover";

import { cn } from "@/lib/utils";
import React from "react";

type SelectionElement = React.ElementRef<typeof SelectionPopover.Trigger>;

type SelectionElementProps = {
    actionElement: React.ReactNode;
};

const Selection = React.forwardRef<
    React.ElementRef<typeof SelectionPopover.Content>,
    React.ComponentPropsWithoutRef<typeof SelectionPopover.Content> &
        SelectionElementProps
>(
    (
        {
            children,
            className,
            align = "center",
            sideOffset = 16,
            actionElement,
            ...props
        },
        forwardRef
    ) => {
        return (
            <SelectionPopover.Root whileSelect>
                <SelectionPopover.Trigger ref={forwardRef} asChild>
                    {children}
                </SelectionPopover.Trigger>
                <SelectionPopover.Portal>
                    <SelectionPopover.Content
                        asChild
                        align={align}
                        sideOffset={sideOffset}
                        className={cn(
                            "min-w-[20rem] max-w-sm rounded-md border shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                            className
                        )}
                        {...props}
                    >
                        {actionElement}
                    </SelectionPopover.Content>
                </SelectionPopover.Portal>
            </SelectionPopover.Root>
        );
    }
);

Selection.displayName = "Selection";

export { Selection };
