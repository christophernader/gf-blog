import { sanityFetch } from '../../../sanity/lib/client'
import { wipProjectsQuery, siteSettingsQuery } from '../../../sanity/lib/queries'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'
import { WipCard } from '@/components/WipCard'
import { WipHeader } from '@/components/WipHeader'

export const dynamic = 'force-dynamic'

interface WipProject {
    _id: string
    title: string
    slug: { current: string }
    description?: string
    status?: string
    coverImage?: any
    categories?: string[]
    startedAt?: string
}

interface SiteSettings {
    blogName?: string
    socialLinks?: any[]
}

async function getWipProjects(): Promise<WipProject[]> {
    try {
        return await sanityFetch<WipProject[]>(wipProjectsQuery, {}, ['wipProject'])
    } catch (error) {
        console.error('Failed to fetch WIP projects:', error)
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

export default async function WipPage() {
    const [projects, settings] = await Promise.all([getWipProjects(), getSiteSettings()])

    return (
        <>
            <DoodleDecorations />
            <Navigation blogName={settings?.blogName} socialLinks={settings?.socialLinks} />

            <main className="container">
                <WipHeader />

                {projects.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--ink-light)', padding: 'var(--space-2xl)' }}>
                        No works in progress yet! Head to <a href="/studio" style={{ textDecoration: 'underline' }}>/studio</a> to add your first project ✨
                    </p>
                ) : (
                    <div className="posts-grid">
                        {projects.map((project, index) => (
                            <WipCard
                                key={project._id}
                                title={project.title}
                                slug={project.slug.current}
                                description={project.description}
                                status={project.status}
                                coverImage={project.coverImage}
                                categories={project.categories}
                                startedAt={project.startedAt}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </>
    )
}
