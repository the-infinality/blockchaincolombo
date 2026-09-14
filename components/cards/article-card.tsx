import Image from "next/image";

export type Article = {
  title: string;
  meta: string;
  desc: string;
  image?: string;
};

// Shared card shape for news.php's editor-content items and blog.php's
// blog-listing items — same visual structure in the source, different section.
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border">
      {article.image && (
        <div className="relative aspect-video">
          <Image
            src={article.image}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold">
          {article.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{article.meta}</p>
        <p className="mt-3 text-sm text-muted-foreground">{article.desc}</p>
      </div>
    </article>
  );
}
