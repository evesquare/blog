import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, [remarkToc, { maxDepth: 3, heading: "目次" }]],
    rehypePlugins: [rehypeSlug, rehypePrism]
  },
})

export default withMDX(nextConfig)