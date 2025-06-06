import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

interface SortConfig {
  property: string;
  direction: 'ascending' | 'descending';
}

function isPageObjectResponse(response: any): response is PageObjectResponse {
  return !!response.properties;
}

export async function fetchDatabaseContent(
  id: string,
  options?: { sorts: SortConfig[] },
) {
  const data = await notion.databases.query({
    database_id: id,
    sorts: options?.sorts?.map((sort) => ({
      property: sort.property,
      direction: sort.direction,
    })),
  });

  return data.results.filter(isPageObjectResponse);
}

export async function fetchPageContent(id: string) {
  const data = await notion.pages.retrieve({ page_id: id });

  return data;
}

export async function fetchBlockContent(id: string) {
  const { results } = await notion.blocks.children.list({
    block_id: id,
  });

  const blocks: any[] = await Promise.all(
    results.map(async (block: any) => {
      if (block.has_children) {
        const children = await fetchBlockContent(block.id);
        return { ...block, children };
      }
      return block;
    }),
  );

  return blocks;
}
