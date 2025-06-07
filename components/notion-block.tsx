import { RichText } from '@/components/rich-text';

interface NotionBlock {
  id: string;
  type: string;
  children?: NotionBlock[];
  [key: string]: any;
}

interface NotionBlockProps {
  block: NotionBlock;
}

export function NotionBlock({ block }: NotionBlockProps) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          key={block.id}
          className="text-body-large-default text-foreground-neutral-subtle"
        >
          <RichText content={block.paragraph.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1
          key={block.id}
          className="group text-title-large text-foreground-neutral-default relative mt-10 mb-4"
        >
          <RichText content={block.heading_1.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2
          key={block.id}
          className="group text-title-medium text-foreground-neutral-default relative mt-8 mb-1"
        >
          <RichText content={block.heading_2.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3
          key={block.id}
          className="group text-title-small text-foreground-neutral-default relative mt-8 mb-1 font-semibold"
        >
          <RichText content={block.heading_3.rich_text} />
        </h3>
      );
    case 'image':
      const src =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url;
      return (
        <figure key={block.id} className="mt-6 mb-6 grid items-center gap-3">
          <img
            src={src}
            loading="lazy"
            decoding="async"
            alt={
              block.image.caption
                ? block.image.caption[0]?.text.content
                : 'Image'
            }
            className="rounded-xl"
          />
          {block.image.caption && block.image.caption[0]?.text.content && (
            <figcaption className="text-body-small-default text-foreground-neutral-subtle text-center">
              {block.image.caption[0].text.content}
            </figcaption>
          )}
        </figure>
      );
    case 'video':
      const videoSrc =
        block.video.type === 'file'
          ? block.video.file.url
          : block.video.external.url;
      return (
        <video
          key={block.id}
          controls
          className="mt-6 mb-6 rounded-xl"
          preload="none"
          autoPlay={true}
          loop={true}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      );
    case 'bulleted_list_item':
      return (
        <li
          key={block.id}
          className="text-body-large-default text-foreground-neutral-subtle ms-3 list-disc"
        >
          <RichText content={block.bulleted_list_item.rich_text} />
        </li>
      );
    case 'numbered_list_item':
      return (
        <li
          key={block.id}
          className="text-body-large-default text-foreground-neutral-subtle ms-3 list-decimal"
        >
          <RichText content={block.numbered_list_item.rich_text} />
        </li>
      );
    case 'callout':
      return (
        <div
          key={block.id}
          className="bg-background-neutral-faded my-3 flex gap-2 rounded-lg px-5 py-4"
        >
          {block.callout.icon && <span>{block.callout.icon.emoji}</span>}
          <div className="grow">
            <RichText content={block.callout.rich_text} />
          </div>
        </div>
      );
    case 'divider':
      return (
        <hr key={block.id} className="text-background-neutral-subtle my-2" />
      );
    case 'quote':
      return (
        <blockquote
          key={block.id}
          className="border-l-foreground-neutral-default text-foreground-neutral-default text-body-medium my-3 border-l-2 pl-4 font-semibold"
        >
          <RichText content={block.quote.rich_text} />
        </blockquote>
      );
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.log('Unsupported type ' + block?.value?.type);
      }
      return <div />;
  }
}
