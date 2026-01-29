import { sanityFetch } from '../../sanity/lib/client'
import { postsQuery, siteSettingsQuery } from '../../sanity/lib/queries'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'
import { BlogCard } from '@/components/BlogCard'
import { HomeHero } from '@/components/HomeHero'

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

interface SiteSettings {
    heroTitle?: string
    heroHighlight?: string
    heroSubtitle?: string
}

async function getPosts(): Promise<Post[]> {
    try {
        return await sanityFetch<Post[]>(postsQuery, {}, ['posts'])
    } catch (error) {
        console.error('Failed to fetch posts:', error)
        return []
    }
}

async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        return await sanityFetch<SiteSettings>(siteSettingsQuery, {}, ['siteSettings'])
    } catch (error) {
        console.error('Failed to fetch site settings:', error)
        return null
    }
}

export default async function HomePage() {
    const [posts, settings] = await Promise.all([getPosts(), getSiteSettings()])

    return (
        <>
            <DoodleDecorations />
            <Navigation />

            <main className="container">
                <HomeHero
                    heroTitle={settings?.heroTitle}
                    heroHighlight={settings?.heroHighlight}
                    heroSubtitle={settings?.heroSubtitle}
                />

                {/* Recent Posts */}
                <section>
                    <h2 style={{ marginBottom: 'var(--space-lg)' }}>
                        <span className="highlight-lavender">recent posts</span> ✎
                    </h2>

                    {posts.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--ink-light)', padding: 'var(--space-2xl)' }}>
                            No posts yet! Head to <a href="/studio" style={{ textDecoration: 'underline' }}>/studio</a> to write your first post ✨
                        </p>
                    ) : (
                        <div className="posts-grid">
                            {posts.slice(0, 6).map((post, index) => (
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
                                    estimatedReadTime={post.estimatedReadTime}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    )
}
