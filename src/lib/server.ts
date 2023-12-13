import {
    Tab,
    bcaSemesterList,
    branchList,
    semesterList,
    server,
} from "@/config";
import axios, { AxiosError, AxiosResponse } from "axios";
import _ from "lodash";

export const getBtechSubjectList = async ({
    semester,
    branch,
}: {
    semester: string | null;
    branch: string | null;
}) => {
    if (
        !semesterList.some((s) => semester === s.label) ||
        !branchList.some((b) => branch === b.value)
    ) {
        throw new AxiosError("Please check semester and branch.");
    }
    const response = (await axios.get(
        `${server}btech/${semesterList.find((s) => semester === s.label)
            ?.value}/${branchList.find((b) => branch === b.label)?.value}`
    )) as AxiosResponse;
    return response.data;
};

export const getBtechSubjectDetails = async ({
    semester,
    branch,
    subject,
}: {
    semester: string | null;
    branch: string | null;
    subject: string | null;
}) => {
    if (
        !semesterList.some((s) => semester === s.label) ||
        !branchList.some((b) => branch === b.value) ||
        !subject
    ) {
        throw new AxiosError("Please check again what you searched.");
    } else if (!subject) return null;
    const response = (await axios.get(
        `${server}btech/${semesterList.find((s) => semester === s.label)
            ?.value}/${branchList.find((b) => branch === b.label)
            ?.value}/${_.startCase(_.toLower(subject))}`
    )) as AxiosResponse;
    return response.data;
};

export const getBtechStudyMaterial = async ({
    semester,
    branch,
    subject,
    tab,
    note,
    pyq,
    book,
    practical,
}: {
    semester: string | null;
    branch: string | null;
    subject: string | null;
    tab: Tab;
    note?: string;
    pyq?: string;
    book?: string;
    practical?: string;
}) => {
    if (
        !semesterList.some((s) => semester === s.label) ||
        !branchList.some((b) => branch === b.value) ||
        !subject
    ) {
        throw new AxiosError("Please check again what you searched.");
    } else if (tab === Tab.NOTES) {
        const response = (await axios.get(
            `${server}drive/notes/${note}`
        )) as AxiosResponse;
        return response.data as Drive[];
    } else if (tab === Tab.PYQ) {
        const response = (await axios.get(
            `${server}drive/pyq/${pyq}`
        )) as AxiosResponse;
        return response.data as Drive[];
    } else if (tab === Tab.BOOKS) {
        const response = (await axios.get(
            `${server}drive/books/${book}`
        )) as AxiosResponse;
        return response.data as Drive[];
    } else if (tab === Tab.FILES) {
        const response = (await axios.get(
            `${server}drive/practicalfile/${practical}`
        )) as AxiosResponse;
        return response.data as Drive[];
    }

    return null;
};

export const getBcaSubjectList = async ({
    semester,
}: {
    semester: string | null;
}) => {
    if (!bcaSemesterList.some((s) => semester === s.label)) {
        throw new AxiosError("Please check semester and branch.");
    }
    const response = (await axios.get(
        `${server}bca/${bcaSemesterList.find((s) => semester === s.label)
            ?.value}`
    )) as AxiosResponse;
    return response.data;
};

export const getBcaSubjectDetails = async ({
    semester,
    subject,
}: {
    semester: string | null;
    subject: string | null;
}) => {
    if (!bcaSemesterList.some((s) => semester === s.label) || !subject) {
        throw new AxiosError("Please check again what you searched.");
    } else if (!subject) return null;
    const response = (await axios.get(
        `${server}bca/${bcaSemesterList.find((s) => semester === s.label)
            ?.value}/${_.startCase(_.toLower(subject))}`
    )) as AxiosResponse;
    return response.data;
};

export const getBcaStudyMaterial = async ({
    semester,
    subject,
    tab,
    note,
    pyq,
    book,
    practical,
}: {
    semester: string | null;
    subject: string | null;
    tab: Tab;
    note?: string;
    pyq?: string;
    book?: string;
    practical?: string;
}) => {
    if (!bcaSemesterList.some((s) => semester === s.label) || !subject) {
        throw new AxiosError("Please check again what you searched.");
    } else if (tab === Tab.NOTES) {
        const response = (await axios.get(
            `${server}drive/notes/${note}`
        )) as AxiosResponse;
        return response.data as Drive[];
    } else if (tab === Tab.PYQ) {
        const response = (await axios.get(
            `${server}drive/pyq/${pyq}`
        )) as AxiosResponse;
        return response.data as Drive[];
    } else if (tab === Tab.BOOKS) {
        const response = (await axios.get(
            `${server}drive/books/${book}`
        )) as AxiosResponse;
        return response.data as Drive[];
    } else if (tab === Tab.FILES) {
        const response = (await axios.get(
            `${server}drive/practicalfile/${practical}`
        )) as AxiosResponse;
        return response.data as Drive[];
    }

    return null;
};
