import { Container } from '@/components/container';
import { profile } from '@/data/profile';

export default async function Home() {
  // Fetch projects and articles

  // console.log(JSON.stringify(projects, null, 2));
  // console.log(JSON.stringify(articles, null, 2));

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
        {/* Render projects */}
      </section>
      <section className="flex flex-col gap-5">
        <h3 className="text-body-medium text-foreground-neutral-faded font-medium">
          Articles
        </h3>
        {/* Render articles */}
      </section>
    </Container>
  );
}
