import { Container } from '@/components/container';
import { profile } from '@/data/profile';
import { fetchDatabaseContent } from '@/lib/notion';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function Home() {
  const [projects, articles] = await Promise.all([
    fetchDatabaseContent(process.env.NOTION_PROJECTS_DATABASE_ID!),
    fetchDatabaseContent(process.env.NOTION_ARTICLES_DATABASE_ID!, {
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
      filter: {
        property: 'Status',
        status: {
          equals: 'Live',
        },
      },
    }),
  ]);

  return (
    <Container className="max-w-(--breakpoint-md) gap-20 py-20">
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium">{profile.name}</h1>
          <h2>{profile.title}</h2>
        </div>
        <p className="text-foreground-neutral-subtle">{profile.description}</p>
        <a
          className="bg-background-neutral-default border-border-neutral-subtle text-body-medium text-foreground-neutral-subtle hover:bg-background-neutral-faded hover:text-foreground-neutral-default inline-flex w-fit gap-2 rounded-md border px-4 py-2 font-medium transition"
          href="https://github.com/zalodias/portfolio-demo"
          target="_blank"
        >
          <svg
            width={16}
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
              transform="scale(64)"
              fill="currentColor"
            />
          </svg>
          Source code
        </a>
      </section>
      <section className="flex flex-col gap-5">
        <h3 className="text-body-medium text-foreground-neutral-faded font-medium">
          Projects
        </h3>
        {projects.map((project) => (
          <a
            key={project.id}
            href={(project.properties.Link as any).url}
            target="_blank"
            className="flex items-center gap-5"
          >
            <img
              src={(project.properties.Image as any).files[0].file.url}
              alt={(project.properties.Name as any).title[0].plain_text}
              className="bg-background-neutral-subtle aspect-[4/3] w-20 rounded-md object-cover"
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
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="grid gap-1"
          >
            <h4 className="font-medium">
              {(article.properties.Name as any).title[0].plain_text}
            </h4>
            <p className="text-foreground-neutral-subtle">
              {(article.properties.Summary as any).rich_text[0].plain_text}
            </p>
            <span className="text-foreground-neutral-faded text-body-small font-mono font-medium uppercase">
              {formatDate((article.properties.Date as any).date.start, {
                year: 'numeric',
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
