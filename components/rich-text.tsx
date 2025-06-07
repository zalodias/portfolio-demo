import React from 'react';

export function RichText({
  content,
}: {
  content: any[];
}): React.ReactElement[] {
  return content.map(({ annotations, text }: any, index: number) => {
    const { bold, italic, strikethrough, underline, code } = annotations;

    const annotationClassNames = [
      bold ? 'font-semibold' : null,
      italic ? 'italic' : null,
      strikethrough ? 'line-through' : null,
      underline ? 'underline' : null,
      code
        ? 'font-mono text-body-medium-default text-foreground-brand-default bg-background-neutral-faded px-2 py-1 rounded-md'
        : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <React.Fragment key={`${text.content}-${index}`}>
        {text.link ? (
          <a
            href={text.link.url}
            className="text-body-large-subtle text-foreground-brand-default hover:underline hover:underline-offset-2"
            target="_blank"
          >
            {text.content}
          </a>
        ) : (
          <span className={annotationClassNames || undefined}>
            {text.content}
          </span>
        )}
      </React.Fragment>
    );
  });
}
