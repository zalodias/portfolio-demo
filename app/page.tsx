import { Container } from '@/components/container';
import { profile } from '@/data/profile';
import { fetchDatabaseContent } from '@/lib/notion';

export default async function Home() {
  const [projects, articles] = await Promise.all([
    fetchDatabaseContent(process.env.NOTION_PROJECTS_DATABASE_ID!),
    fetchDatabaseContent(process.env.NOTION_ARTICLES_DATABASE_ID!),
  ]);

  return (
    <Container className="max-w-(--breakpoint-md) gap-20 py-20">
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium">{profile.name}</h1>
          <h2>{profile.title}</h2>
        </div>
        <p className="text-foreground-neutral-subtle">{profile.description}</p>
      </section>
      <section className="flex flex-col gap-5">
        <h3>Projects</h3>
      </section>
      <section className="flex flex-col gap-5">
        <h3>Articles</h3>
      </section>
    </Container>
  );
}
