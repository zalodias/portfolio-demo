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
        <h3 className="text-body-medium text-foreground-neutral-faded font-medium">
          Projects
        </h3>
        {projects.map((project) => (
          <a
            key={project.id}
            href={(project.properties.Link as any).url}
            className="flex items-center gap-5"
          >
            <img
              src="https://picsum.photos/400/300"
              alt="Project Image"
              className="aspect-[4/3] w-20 rounded-md"
            />
            <div className="grid gap-1">
              <h4 className="font-medium">
                {(project.properties.Name as any).title[0].plain_text}
              </h4>
              <p className="text-foreground-neutral-subtle">
                {
                  (project.properties.Description as any).rich_text[0]
                    .plain_text
                }
              </p>
              <ul className="flex gap-2">
                {(project.properties.Tags as any).multi_select.map(
                  (tag: { id: string; name: string }) => (
                    <li
                      key={tag.id}
                      className="text-foreground-neutral-faded text-body-small font-mono font-medium uppercase"
                    >
                      {tag.name}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </a>
        ))}
      </section>
      <section className="flex flex-col gap-5">
        <h3 className="text-body-medium text-foreground-neutral-faded font-medium">
          Articles
        </h3>
        {articles.map((article) => (
          <Link key={article.id} href={article.id} className="grid gap-1">
            <h4 className="font-medium">
              {(article.properties.Name as any).title[0].plain_text}
            </h4>
            <p className="text-foreground-neutral-subtle">
              {(article.properties.Summary as any).rich_text[0].plain_text}
            </p>
            <span className="text-foreground-neutral-faded text-body-small font-mono font-medium uppercase">
              {formatDate((article.properties.Date as any).date.start, {
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </Link>
        ))}
      </section>
    </Container>
  );
}
