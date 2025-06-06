import { Container } from '@/components/container';
import { fetchDatabaseContent, fetchPageContent } from '@/lib/notion';

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const database = await fetchDatabaseContent(
    process.env.NOTION_ARTICLES_DATABASE_ID!,
  );

  const article = database.find((article) => article.id === params.slug);

  const page = await fetchPageContent(article?.id!);

  return (
    <Container className="max-w-(--breakpoint-md) gap-20 py-20">
      <header className="flex flex-col gap-5">
        <h1 className="font-medium">
          {(page.properties.Name as any).title[0].plain_text}
        </h1>
        <p className="text-foreground-neutral-subtle">
          {(page.properties.Summary as any).rich_text[0].plain_text}
        </p>
      </header>
    </Container>
  );
}
