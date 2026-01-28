import { client, sanityFetch } from '../../../../sanity/lib/client'
import { postQuery, postSlugsQuery } from '../../../../sanity/lib/queries'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'
import { PostContent } from '@/components/PostContent'
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

export async function generateStaticParams() {
    const slugs: string[] = await client.fetch(postSlugsQuery)
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

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <>
            <DoodleDecorations />
            <Navigation />

            <main className="container container-narrow">
                <PostContent post={post} />
            </main>

            <Footer />
        </>
    )
}
