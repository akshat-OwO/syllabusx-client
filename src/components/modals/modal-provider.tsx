"use client";

import { FC, useEffect, useState } from "react";
import EmbedModal from "./embed-modal";

interface ModalProviderProps {}

const ModalProvider: FC<ModalProviderProps> = ({}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <EmbedModal />
        </>
    );
};

export default ModalProvider;
