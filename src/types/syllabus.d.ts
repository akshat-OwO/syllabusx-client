type Theory = {
    unit: number;
    topics: string[];
};

type Lab = {
    experiment: number;
    aim: {
        objective: string;
        steps: string[];
    };
};
