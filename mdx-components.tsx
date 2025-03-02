import type { MDXComponents } from "mdx/types"

// This is a server component file, so we can't use client-side hooks here
// The actual MDX components with styling are in src/components/mdx/StyledMDXContent.tsx

export function useMDXComponents(components: MDXComponents): MDXComponents {
  // Just return the components as-is for server rendering
  // The actual styled components will be used in the client component
  return {
    ...components,
  }
}
