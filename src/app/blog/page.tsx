import { sanityFetch } from '../../../sanity/lib/client'
import { paginatedPostsQuery, postsCountQuery } from '../../../sanity/lib/queries'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'
import { BlogCard } from '@/components/BlogCard'
import { BlogHeader } from '@/components/BlogHeader'
import Link from 'next/link'

const POSTS_PER_PAGE = 12

interface Post {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    mainImage?: object
    publishedAt?: string
    categories?: string[]
    estimatedReadTime?: number
}

async function getPaginatedPosts(page: number): Promise<{ posts: Post[], totalCount: number }> {
    const start = (page - 1) * POSTS_PER_PAGE
    const end = start + POSTS_PER_PAGE

    try {
        const [posts, totalCount] = await Promise.all([
            sanityFetch<Post[]>(paginatedPostsQuery, { start, end }, ['posts']),
            sanityFetch<number>(postsCountQuery, {}, ['posts'])
        ])
        return { posts, totalCount }
    } catch (error) {
        console.error('Failed to fetch posts:', error)
        return { posts: [], totalCount: 0 }
    }
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>
}) {
    const { page: pageParam } = await searchParams
    const currentPage = Math.max(1, parseInt(pageParam || '1', 10))
    const { posts, totalCount } = await getPaginatedPosts(currentPage)
    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

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
                    <>
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
                                    isNewest={currentPage === 1 && index === 0}
                                    estimatedReadTime={post.estimatedReadTime}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <nav
                                aria-label="Blog pagination"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 'var(--space-md)',
                                    marginTop: 'var(--space-2xl)',
                                    marginBottom: 'var(--space-xl)'
                                }}
                            >
                                {currentPage > 1 && (
                                    <Link
                                        href={`/blog?page=${currentPage - 1}`}
                                        className="btn-sketchy"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        ← prev
                                    </Link>
                                )}

                                <span style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.1rem' }}>
                                    page {currentPage} of {totalPages}
                                </span>

                                {currentPage < totalPages && (
                                    <Link
                                        href={`/blog?page=${currentPage + 1}`}
                                        className="btn-sketchy"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        next →
                                    </Link>
                                )}
                            </nav>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </>
    )
}
