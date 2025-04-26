"use client";

import { useEffect, useState } from "react";
import ConfigureAI from "../ai/ConfigureAI";
import SearchAI from "../ai/SearchAI";
import EmbedModal from "../modals/embed-modal";
import FeedbackModal from "../modals/feedback-modal";
import DatesheetModal from "../modals/datesheet-modal";
import SummarizeAI from "../ai/SummarizeAI";
import GenerateMock from "../ai/GenerateMock";
import SearchModal from "../modals/search-modal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <SearchModal />
            <EmbedModal />
            <ConfigureAI.Mobile />
            <SearchAI />
            <SummarizeAI />
            <GenerateMock />
            <DatesheetModal />
            <FeedbackModal />
        </>
    );
};

export default ModalProvider;
