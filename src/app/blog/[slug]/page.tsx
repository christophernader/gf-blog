import { sanityFetch } from '../../../../sanity/lib/client'
import { postQuery, postSlugsQuery, relatedPostsQuery, siteSettingsQuery } from '../../../../sanity/lib/queries'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'
import { PostContent } from '@/components/PostContent'
import { RelatedPosts } from '@/components/RelatedPosts'
import { ReadingProgressBar } from '@/components/ReadingProgressBar'
import { notFound } from 'next/navigation'

interface Post {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    mainImage?: object
    publishedAt?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any[]
    categories?: string[]
}

interface RelatedPost {
    _id: string
    title: string
    slug: { current: string }
    mainImage?: object
    publishedAt?: string
    categories?: string[]
}

export async function generateStaticParams() {
    const slugs = await sanityFetch<string[]>(postSlugsQuery, {}, ['posts'])
    return slugs.map((slug) => ({ slug }))
}

async function getPost(slug: string): Promise<Post | null> {
    try {
        return await sanityFetch<Post | null>(postQuery, { slug }, ['posts', `post-${slug}`])
    } catch (error) {
        console.error('Failed to fetch post:', error)
        return null
    }
}

async function getRelatedPosts(currentSlug: string, categories: string[]): Promise<RelatedPost[]> {
    if (!categories || categories.length === 0) return []
    try {
        return await sanityFetch<RelatedPost[]>(
            relatedPostsQuery,
            { currentSlug, categories },
            ['posts']
        )
    } catch (error) {
        console.error('Failed to fetch related posts:', error)
        return []
    }
}

interface SiteSettings {
    blogName?: string
    socialLinks?: any[]
}

async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        return await sanityFetch<SiteSettings>(siteSettingsQuery, {}, ['siteSettings'])
    } catch (error) {
        console.error('Failed to fetch site settings:', error)
        return null
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const [post, settings] = await Promise.all([getPost(slug), getSiteSettings()])

    if (!post) {
        notFound()
    }

    const relatedPosts = await getRelatedPosts(slug, post.categories || [])

    return (
        <>
            <ReadingProgressBar />
            <DoodleDecorations />
            <Navigation blogName={settings?.blogName} socialLinks={settings?.socialLinks} />

            <main className="container container-narrow">
                <PostContent post={post} />
                <RelatedPosts posts={relatedPosts} />
            </main>

            <Footer />
        </>
    )
}
