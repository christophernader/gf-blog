import { sanityFetch } from '../../../../sanity/lib/client'
import { wipProjectQuery, wipProjectSlugsQuery, siteSettingsQuery } from '../../../../sanity/lib/queries'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'
import { PostContent } from '@/components/PostContent'
import { ReadingProgressBar } from '@/components/ReadingProgressBar'
import { notFound } from 'next/navigation'

interface WipProject {
    _id: string
    title: string
    slug: { current: string }
    description?: string
    status?: string
    coverImage?: any
    body?: any[]
    categories?: string[]
    startedAt?: string
}

interface SiteSettings {
    blogName?: string
    socialLinks?: any[]
}

export async function generateStaticParams() {
    const slugs = await sanityFetch<string[]>(wipProjectSlugsQuery, {}, ['wipProject'])
    return slugs.map((slug) => ({ slug }))
}

async function getWipProject(slug: string): Promise<WipProject | null> {
    try {
        return await sanityFetch<WipProject | null>(wipProjectQuery, { slug }, ['wipProject', `wip-${slug}`])
    } catch (error) {
        console.error('Failed to fetch WIP project:', error)
        return null
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

const statusLabels: Record<string, string> = {
    'just-started': '🌱 Just Started',
    'in-progress': '🔨 In Progress',
    'almost-done': '✨ Almost Done',
}

export default async function WipProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const [project, settings] = await Promise.all([getWipProject(slug), getSiteSettings()])

    if (!project) {
        notFound()
    }

    // Transform WIP project data to look like a post for PostContent
    const postLike = {
        _id: project._id,
        title: project.title,
        slug: project.slug,
        excerpt: project.description,
        mainImage: project.coverImage,
        publishedAt: project.startedAt,
        body: project.body,
        categories: project.categories,
    }

    return (
        <>
            <ReadingProgressBar />
            <DoodleDecorations />
            <Navigation blogName={settings?.blogName} />

            <main className="container container-narrow">
                {/* Status banner */}
                {project.status && (
                    <div style={{
                        textAlign: 'center',
                        marginBottom: 'var(--space-md)',
                        marginTop: 'var(--space-lg)',
                    }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.35rem 1rem',
                            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                            background: project.status === 'just-started' ? 'var(--pastel-mint)' :
                                project.status === 'in-progress' ? 'var(--pastel-lavender)' :
                                    'var(--pastel-pink)',
                            border: '2px solid var(--ink-light)',
                            fontFamily: 'var(--font-handwritten)',
                            fontSize: '0.9rem',
                        }}>
                            {statusLabels[project.status] || project.status}
                        </span>
                    </div>
                )}

                <PostContent post={postLike} />
            </main>

            <Footer socialLinks={settings?.socialLinks} />
        </>
    )
}
