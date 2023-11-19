import { createClient } from 'contentful';

export const contentful = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const getHomePageData = async () => {
    const content = await contentful.getEntries({ content_type: 'homePage' });
    const items = content.items[0];
    const fields = items.fields;
    return fields;
};

export const getChanges = async () => {
    const content = await contentful.getEntries({
        content_type: 'changeLogPage',
    });
    const items = content.items;
    const sortedItems = items.sort((a, b) => {
        // @ts-expect-error
        return new Date(b.fields.releaseDate) - new Date(a.fields.releaseDate);
    });
    return sortedItems;
};

export const generateChangesPages = async () => {
    const content = await contentful.getEntries({
        content_type: 'changeLogPage',
    });
    const paths = content.items.map((item) => {
        return { id: item.sys.id };
    });
    return paths;
};

export const getChange = async (version: string) => {
    const content = await contentful.getEntry(version);
    return content;
};

export const getSyllabusxTeam = async () => {
    const content = await contentful.getEntries({
        content_type: 'syllabusxTeam',
    });
    const items = content.items;
    const sortedItems = items.sort((a, b) => {
        // @ts-expect-error
        return new Date(b.sys.createdAt) - new Date(b.sys.createdAt);
    });
    return sortedItems;
};

export const getTAndC = async () => {
    const content = await contentful.getEntries({
        content_type: 'termsConditions',
    });
    const item = content.items[0];
    return item;
};

export const getPolicy = async () => {
    const content = await contentful.getEntries({
        content_type: 'privacyPolicy',
    });
    const item = content.items[0];
    return item;
};
