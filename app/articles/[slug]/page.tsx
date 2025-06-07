import { Container } from '@/components/container';
import { NotionBlock } from '@/components/notion-block';
import {
  fetchBlockContent,
  fetchDatabaseContent,
  fetchPageContent,
} from '@/lib/notion';
import { formatDate } from '@/lib/utils';

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const database = await fetchDatabaseContent(
    process.env.NOTION_ARTICLES_DATABASE_ID!,
  );

  const { slug } = await params;

  const article = database.find((article) => article.id === slug);

  const page = await fetchPageContent(article?.id!);
  const blocks = await fetchBlockContent(page.id);

  return (
    <Container className="max-w-(--breakpoint-md) gap-20 py-20">
      <header className="flex flex-col gap-3">
        <h1 className="font-medium">
          {(page.properties.Name as any).title[0].plain_text}
        </h1>
        <p className="text-foreground-neutral-subtle">
          {(page.properties.Summary as any).rich_text[0].plain_text}
        </p>
        <span className="text-foreground-neutral-faded text-body-small font-mono font-medium uppercase">
          {formatDate((page.properties.Date as any).date.start, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </header>
      <article className="flex flex-col gap-2">
        {blocks.map((block: any) => (
          <NotionBlock key={block.id} block={block} />
        ))}
      </article>
    </Container>
  );
}
