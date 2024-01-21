"use client";

import { FC, useEffect, useState } from "react";
import EmbedModal from "./embed-modal";
import SubjectListModal from "./subject-list-modal";
import SubjectViewModal from "./subject-view-modal";

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
            <SubjectListModal />
            <SubjectViewModal />
        </>
    );
};

export default ModalProvider;
