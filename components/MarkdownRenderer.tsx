import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div
      className="prose prose-invert prose-neutral max-w-none
        prose-headings:font-bold prose-headings:text-white
        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
        prose-p:text-neutral-300 prose-p:leading-relaxed
        prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white
        prose-blockquote:border-l-2 prose-blockquote:border-red-600 prose-blockquote:text-neutral-400 prose-blockquote:not-italic
        prose-code:rounded prose-code:bg-neutral-800 prose-code:px-1 prose-code:text-red-300 prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-neutral-900 prose-pre:ring-1 prose-pre:ring-neutral-800
        prose-ul:text-neutral-300 prose-ol:text-neutral-300
        prose-li:marker:text-red-500
        prose-hr:border-neutral-800
        prose-img:rounded-xl"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
