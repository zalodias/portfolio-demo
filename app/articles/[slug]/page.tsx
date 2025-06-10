import { Container } from '@/components/container';

export default async function Article() {
  // Fetch articles database
  // Get slug from page params
  // Fetch article by ID
  // Fetch page + block content

  return (
    <Container className="max-w-(--breakpoint-md) gap-20 py-20">
      <header className="flex flex-col gap-3">
        {/* Render article title, summary, and date */}
      </header>
      <article className="flex flex-col gap-2">
        {/* Render article content using NotionBlock */}
      </article>
    </Container>
  );
}
