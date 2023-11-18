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
        return new Date(a.sys.createdAt) - new Date(b.sys.createdAt);
    });
    return sortedItems;
};

export const getChange = async (version: string) => {
    const content = await contentful.getEntry(version);
    return content;
};
