import fs, { readFile } from "fs/promises";
import path from "path";
import { compileMDX, CompileMDXResult } from "next-mdx-remote/rsc";
import { components } from "@/components/mdx";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateStaticParams() {
  const posts = ["post1", "post2"];
  return posts.map((postId) => {
    return { postId };
  });
}

async function loadMDX(
  postId: string
): Promise<CompileMDXResult<Record<string, unknown>>> {
  const root = path.resolve();
  const mdxpath = path.join(root, "src/contents/aws", `${postId}.mdx`);
  const data = await readFile(mdxpath, { encoding: "utf-8" });
  // remark,rehypeのプラグインを指定する場合、
  // front-matterもパースする場合、ここで指定する
  return compileMDX({
    source: data,
    components: components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          [
            remarkToc,
            {
              heading: "目次", // 「### 目次」であることかつ、目次のHeadingが他に存在していないとき表示される
              maxDepth: 3,
              tight: true, // `true` にすると `li` 要素内に `p` 要素を作らないようになる
            },
          ],
        ],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode, // コードブロックのシンタックスハイライト
            {
              theme: "github-dark-default",
              // theme: {
              //   dark: "github-dark-default",
              //   light: "github-light",
              // }
              // これでできるはずなんだけどできない。
            },
          ],
        ],
      },
    },
  });
}

export default async function Post(props: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await props.params;
  const mdx = await loadMDX(postId);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <main className="lg:w-2/3">
            aa
            {mdx.content}
            <article className="prose lg:prose-xl"></article>
          </main>
        </div>
      </div>
    </div>
  );
}
