import {
    Courses,
    Departments,
    Semesters,
    Tab,
    bcaSemesterList,
    branchList,
    semesterList,
    server,
} from "@/config";
import axios, { AxiosError, AxiosResponse } from "axios";
import _ from "lodash";

export async function getSubjects({
    branch = "",
    course,
    semester,
}: {
    branch?: string;
    course: Courses;
    semester: string;
}) {
    if (course === Courses.BTECH) {
        try {
            const response = await fetch(
                `${server}btech/${semesterList.find((s) => s.label === semester)?.value}/${branchList.find((b) => b.label === branch.toUpperCase())?.value}`
            );

            const subjects = await response.json();

            return subjects;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    if (course === Courses.BCA) {
        try {
            const response = await fetch(
                `${server}bca/${bcaSemesterList.find((s) => s.label === semester)?.value}`
            );

            const subjects = await response.json();

            return subjects;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    return [];
}

export type SubjectDetail = {
    _id: string;
    subject: string;
    dept: string[];
    theorypapercode: string;
    labpapercode?: string | null;
    theorycredits: number;
    labcredits?: number | null;
    theory?: {
        unit: number;
        topics: string[];
    }[];
    units?: {
        unit: number;
        topics: string[];
    }[];
    lab?: {
        experiment: number;
        aim: {
            objective: string;
            steps: string[];
        };
    }[];
    coursecategory?: string | null;
    camel?: string | null;
    pYq?: string | null;
    book?: string | null;
    practical?: string | null;
};

export async function getSubjectDetails({
    course,
    semester,
    branch = "",
    subject,
}: {
    course: Courses;
    semester: string;
    branch?: string;
    subject: string;
}) {
    if (course === Courses.BTECH) {
        try {
            const response = await fetch(
                `${server}btech/${semesterList.find((s) => s.label === semester)?.value}/${branchList.find((b) => b.label === branch.toUpperCase())?.value}/${_.startCase(subject.split("-").join(" "))}`
            );

            const subjectDetail: SubjectDetail[] = await response.json();

            return subjectDetail[0];
        } catch (error) {
            console.error(error);

            // placeholder value
            return {
                _id: "",
                subject: "",
                dept: [],
                theorypapercode: "",
                theorycredits: 0,
            } satisfies SubjectDetail;
        }
    }

    if (course === Courses.BCA) {
        try {
            const response = await fetch(
                `${server}bca/${semesterList.find((s) => s.label === semester)?.value}/${_.startCase(subject.split("-").join(" "))}`
            );

            const subjectDetail: SubjectDetail[] = await response.json();

            return subjectDetail[0];
        } catch (error) {
            console.error(error);

            // placeholder value
            return {
                _id: "",
                subject: "",
                dept: [],
                theorypapercode: "",
                theorycredits: 0,
            } satisfies SubjectDetail;
        }
    }

    // placeholder value
    return {
        _id: "",
        subject: "",
        dept: [],
        theorypapercode: "",
        theorycredits: 0,
        theory: [],
    } satisfies SubjectDetail;
}

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
        !branchList.some((b) => branch === b.value.toLowerCase()) ||
        !subject
    ) {
        throw new AxiosError("Please check again what you searched.");
    } else if (tab === Tab.NOTES) {
        try {
            const response = (await axios.get(
                `${server}drive/notes/${note}`
            )) as AxiosResponse;
            return response.data as Drive[];
        } catch (error) {
            throw new Error("Something went wrong! Please try again later.");
        }
    } else if (tab === Tab.PYQ) {
        try {
            const response = (await axios.get(
                `${server}drive/pyq/${pyq}`
            )) as AxiosResponse;
            return response.data as Drive[];
        } catch (error) {
            throw new Error("Something went wrong! Please try again later.");
        }
    } else if (tab === Tab.BOOKS) {
        try {
            const response = (await axios.get(
                `${server}drive/books/${book}`
            )) as AxiosResponse;
            return response.data as Drive[];
        } catch (error) {
            throw new Error("Something went wrong! Please try again later.");
        }
    } else if (tab === Tab.FILES) {
        try {
            const response = (await axios.get(
                `${server}drive/practicalfile/${practical}`
            )) as AxiosResponse;
            return response.data as Drive[];
        } catch (error) {
            throw new Error("Something went wrong! Please try again later.");
        }
    }

    return null;
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
        try {
            const response = (await axios.get(
                `${server}drive/notes/${note}`
            )) as AxiosResponse;
            return response.data as Drive[];
        } catch (error) {
            throw new Error("Something went wrong! Please try again later.");
        }
    } else if (tab === Tab.PYQ) {
        try {
            const response = (await axios.get(
                `${server}drive/pyq/${pyq}`
            )) as AxiosResponse;
            return response.data as Drive[];
        } catch (error) {
            throw new Error("Something went wrong! Please try again later.");
        }
    } else if (tab === Tab.BOOKS) {
        try {
            const response = (await axios.get(
                `${server}drive/books/${book}`
            )) as AxiosResponse;
            return response.data as Drive[];
        } catch (error) {
            throw new Error("Something went wrong! Please try again later.");
        }
    } else if (tab === Tab.FILES) {
        try {
            const response = (await axios.get(
                `${server}drive/practicalfile/${practical}`
            )) as AxiosResponse;
            return response.data as Drive[];
        } catch (error) {
            throw new Error("Something went wrong! Please try again later.");
        }
    }

    return null;
};

export async function search({
    query,
    type = "all",
    course,
    sem,
    dept,
}: {
    query: string;
    type?: "subject" | "theory" | "lab" | "all";
    course?: Courses;
    sem?: Semesters;
    dept?: Departments;
}) {
    try {
        const response: AxiosResponse<
            {
                subject: string;
                camelCase: string;
                semester: Semesters;
                department: Departments[] | null;
                course: Courses;
                theoryCode: string | null;
                labCode: string | null;
                theoryCredits: number | null;
                labCredits: number | null;
                matches: {
                    field: string;
                    snippet: string;
                }[];
            }[],
            { error: string }
        > = await axios.get(
            `${server}search?q=${query}${type ? `&type=${type}` : ""}${course ? `&course=${course}` : ""}${sem ? `&sem=${sem}` : ""}${dept ? `&dept=${dept}` : ""}`
        );
        return response.data;
    } catch (error) {
        let res;
        if (error instanceof AxiosError) {
            res = { error: error?.response?.data as string };
        } else {
            res = { error: "Something went wrong" };
        }
        throw new Error(res.error);
    }
}
