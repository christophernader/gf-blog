import { groq } from 'next-sanity'

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    categories,
    "estimatedReadTime": round(length(pt::text(body)) / 5 / 200)
  }
`

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    categories
  }
`

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $currentSlug && count(categories[@in $categories]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    categories
  }
`
