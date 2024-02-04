"use client";

import {
    autoUpdate,
    flip,
    inline,
    shift,
    useDismiss,
    useFloating,
    useInteractions,
} from "@floating-ui/react";
import { useEffect, useState } from "react";

interface SelectionProps {
    children: React.ReactNode;
    actionElement: React.ReactNode;
}

const Selection: React.FC<SelectionProps> = ({ children, actionElement }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        placement: "top",
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [inline(), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const dismiss = useDismiss(context);

    const { getFloatingProps } = useInteractions([dismiss]);

    useEffect(() => {
        function handleMouseUp(event: MouseEvent) {
            if (
                refs.floating.current?.contains(event.target as Element | null)
            ) {
                return;
            }

            setTimeout(() => {
                const selection = window.getSelection();
                const range =
                    typeof selection?.rangeCount === "number" &&
                    selection.rangeCount > 0
                        ? selection.getRangeAt(0)
                        : null;

                if (selection?.isCollapsed) {
                    setIsOpen(false);
                    return;
                }

                if (range) {
                    refs.setReference({
                        getBoundingClientRect: () =>
                            range.getBoundingClientRect(),
                        getClientRects: () => range.getClientRects(),
                    });
                    setIsOpen(true);
                }
            });
        }

        function handleMouseDown(event: MouseEvent) {
            if (
                refs.floating.current?.contains(event.target as Element | null)
            ) {
                return;
            }

            if (window.getSelection()?.isCollapsed) {
                setIsOpen(false);
            }
        }

        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousedown", handleMouseDown);

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousedown", handleMouseDown);
        };
    }, [refs]);

    return (
        <>
            {children}
            {isOpen && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                >
                    {actionElement}
                </div>
            )}
        </>
    );
};

export { Selection };
