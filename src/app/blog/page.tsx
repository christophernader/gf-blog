import { client } from '../../../sanity/lib/client'
import { postsQuery } from '../../../sanity/lib/queries'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'
import { BlogCard } from '@/components/BlogCard'
import { BlogHeader } from '@/components/BlogHeader'

interface Post {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    mainImage?: object
    publishedAt?: string
    categories?: string[]
}

export const revalidate = 60

async function getPosts(): Promise<Post[]> {
    return await client.fetch(postsQuery)
}

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <>
            <DoodleDecorations />
            <Navigation />

            <main className="container">
                <BlogHeader />

                {posts.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--ink-light)', padding: 'var(--space-2xl)' }}>
                        No posts yet! Head to <a href="/studio" style={{ textDecoration: 'underline' }}>/studio</a> to write your first post ✨
                    </p>
                ) : (
                    <div className="posts-grid">
                        {posts.map((post, index) => (
                            <BlogCard
                                key={post._id}
                                title={post.title}
                                slug={post.slug.current}
                                excerpt={post.excerpt}
                                mainImage={post.mainImage}
                                publishedAt={post.publishedAt}
                                categories={post.categories}
                                index={index}
                                isNewest={index === 0}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </>
    )
}
