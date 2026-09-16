import Link from "next/link";
import { formatDateKo, type PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative rounded-xl border border-ink-200 bg-white p-5 shadow-sm transition hover:border-accent/40 hover:shadow-md sm:p-6">
      <time
        dateTime={post.date}
        className="text-xs font-medium uppercase tracking-wide text-ink-700/60"
      >
        {formatDateKo(post.date)}
      </time>
      <h2 className="mt-2 font-serif text-xl font-semibold text-ink-900 group-hover:text-accent sm:text-2xl">
        <Link href={`/posts/${post.slug}`} className="focus:outline-none">
          <span className="absolute inset-0 rounded-xl" aria-hidden />
          {post.title}
        </Link>
      </h2>
      {post.description ? (
        <p className="relative mt-2 line-clamp-2 text-sm leading-relaxed text-ink-700 sm:text-base">
          {post.description}
        </p>
      ) : null}
      {post.tags.length > 0 ? (
        <ul className="relative mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs text-accent"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
