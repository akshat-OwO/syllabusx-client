export const semesterList = [
    {
        value: "firstsemesters",
        label: "1st",
    },
    {
        value: "secondsemesters",
        label: "2nd",
    },
    {
        value: "thirdsemesters",
        label: "3rd",
    },
    {
        value: "fourthsemesters",
        label: "4th",
    },
    {
        value: "fifthsemesters",
        label: "5th",
    },
    {
        value: "sixthsemesters",
        label: "6th",
    },
    {
        value: "seventhsemesters",
        label: "7th",
    },
];

export const bcaSemesterList = [
    {
        value: "firstsemesters",
        label: "1st",
    },
    {
        value: "secondsemesters",
        label: "2nd",
    },
    {
        value: "thirdsemesters",
        label: "3rd",
    },
    {
        value: "fourthsemesters",
        label: "4th",
    },
    {
        value: "fifthsemesters",
        label: "5th",
    },
    {
        value: "sixthsemesters",
        label: "6th",
    },
];

export const branchList = [
    {
        value: "CSE",
        label: "CSE",
    },
    {
        value: "IT",
        label: "IT",
    },
    {
        value: "CST",
        label: "CST",
    },
    {
        value: "ITE",
        label: "ITE",
    },
    {
        value: "ECE",
        label: "ECE",
    },
    {
        value: "EE",
        label: "EE",
    },
    {
        value: "EEE",
        label: "EEE",
    },
    {
        value: "ICE",
        label: "ICE",
    },
    {
        value: "ME",
        label: "ME",
    },
    {
        value: "CE",
        label: "CE",
    },
    {
        value: "MAE",
        label: "MAE",
    },
];

export enum Tab {
    THEORY = "THEORY",
    LAB = "LAB",
    NOTES = "NOTES",
    PYQ = "PYQ",
    BOOKS = "BOOKS",
    FILES = "FILES",
    PDF = "PDF",
}

export enum Courses {
    BTECH = "BTECH",
    BCA = "BCA",
}

export enum Semesters {
    "1st" = "firstsemesters",
    "2nd" = "secondsemesters",
    "3rd" = "thirdsemesters",
    "4th" = "fourthsemesters",
    "5th" = "fifthsemesters",
    "6th" = "sixthsemesters",
    "7th" = "seventhsemesters",
    "8th" = "eighthsemesters",
}

export enum Departments {
    CSE = "CSE",
    IT = "IT",
    CST = "CST",
    ITE = "ITE",
    ECE = "ECE",
    EE = "EE",
    EEE = "EEE",
    ICE = "ICE",
    ME = "ME",
    CE = "CE",
    MAE = "MAE",
}

export type SubjectSearchResult = {
    id: string;
    content: {
        course: string;
        name: string;
        dept?: Departments[];
        sem: string;
        theorypapercode: string;
        labpapercode?: string;
        theorycredits: number;
        labcredits?: number;
        theory?: {
            unit: number;
            topics: string[];
        }[];
        units?: {
            unit: number;
            topics: string[];
        }[];
    };
    metadata: Record<string, unknown>;
    score: number;
};

export const server = "https://api.syllabusx.live/";
// export const server = "http://localhost:8080/";

export const STALE_TIME = 1000 * 60 * 60 * 24 * 15;
export const CACHE_TIME = 1000 * 60 * 60 * 24 * 15;
