import { groq } from 'next-sanity'

// For home page: limited to 6 posts
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...6] {
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

// For blog page: paginated
export const paginatedPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [$start...$end] {
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

// Count total posts for pagination
export const postsCountQuery = groq`
  count(*[_type == "post"])
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

// Site settings singleton (fetch most recently updated to handle potential duplicates)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"] | order(_updatedAt desc)[0] {
    heroTitle,
    heroHighlight,
    heroSubtitle,
    socialLinks,
    aboutTitle,
    aboutEmoji,
    aboutContent,
    blogPageTitle,
    blogPageSubtitle
  }
`
