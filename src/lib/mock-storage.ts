import { TMockSchema } from "./schemas";

const mockStorage = new Map<string, TMockSchema>();

export const storeMockData = (id: string, data: TMockSchema) => {
    mockStorage.set(id, data);
};

export const getMockData = (id: string) => {
    return mockStorage.get(id);
};
