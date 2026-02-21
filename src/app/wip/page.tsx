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
    genre?: string
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

            <main className="container container-narrow">
                <WipHeader />

                {projects.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--ink-light)', padding: 'var(--space-2xl)' }}>
                        <p>
                            No works in progress yet! Head to <a href="/studio" style={{ textDecoration: 'underline' }}>/studio</a> to add your first project.
                        </p>
                        <div style={{
                            textAlign: 'left',
                            maxWidth: '500px',
                            margin: 'var(--space-xl) auto 0',
                            fontSize: '0.95rem',
                            color: 'var(--ink-lighter)',
                            lineHeight: 1.7
                        }}>
                            <p style={{ fontStyle: 'italic', marginBottom: 'var(--space-sm)' }}>For each WIP entry, fill in:</p>
                            <ul style={{ paddingLeft: 'var(--space-lg)' }}>
                                <li><strong>Title</strong> &mdash; Working title for your piece</li>
                                <li><strong>Genre</strong> &mdash; e.g., Romance, Fantasy, Literary Fiction</li>
                                <li><strong>Short Description</strong> &mdash; Brief summary of the narrative, drive, and structure</li>
                                <li><strong>Tags</strong> &mdash; Themes that align with your author brand</li>
                                <li><strong>Status</strong> &mdash; Where you are in the process</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <section>
                        {projects.map((project, index) => (
                            <WipCard
                                key={project._id}
                                title={project.title}
                                description={project.description}
                                genre={project.genre}
                                status={project.status}
                                coverImage={project.coverImage}
                                body={project.body}
                                categories={project.categories}
                                startedAt={project.startedAt}
                                index={index}
                            />
                        ))}
                    </section>
                )}
            </main>

            <Footer />
        </>
    )
}
