import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

interface SortConfig {
  property: string;
  direction: 'ascending' | 'descending';
}

interface FilterConfig {
  property: string;
  status: {
    equals: string;
  };
}

function isPageObjectResponse(response: any): response is PageObjectResponse {
  return !!response.properties;
}

export async function fetchDatabaseContent(
  id: string,
  options?: { sorts: SortConfig[]; filter: FilterConfig },
) {
  const data = await notion.databases.query({
    database_id: id,
    sorts: options?.sorts?.map((sort) => ({
      property: sort.property,
      direction: sort.direction,
    })),
    filter: options?.filter && {
      property: options.filter.property,
      status: options.filter.status,
    },
  });

  return data.results.filter(isPageObjectResponse);
}

export async function fetchPageContent(id: string) {
  const data = await notion.pages.retrieve({ page_id: id });

  if (!isPageObjectResponse(data)) {
    throw new Error('Data is not a valid PageObjectResponse');
  }

  return data;
}

export async function fetchBlockContent(id: string) {
  const data = await notion.blocks.children.list({
    block_id: id,
  });

  return data.results;
}
