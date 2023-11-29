type Theory = {
    unit: number;
    topics: string[];
};

type Lab = {
    experiment: number;
    aim: {
        objective: string;
        steps: string[];
        externalLinks?: string;
    };
};

type Drive = {
    webViewLink: string;
    id: string;
    name: string;
    description?: string;
    createdTime: string;
}

type Embed = {
    embedLink: string;
    name: string;
}