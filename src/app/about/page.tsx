import { sanityFetch } from '../../../sanity/lib/client'

export const dynamic = 'force-dynamic'

import { siteSettingsQuery } from '../../../sanity/lib/queries'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'
import { AboutContent } from '@/components/AboutContent'
import type { PortableTextBlock } from '@portabletext/types'

interface SiteSettings {
    blogName?: string
    aboutTitle?: string
    aboutEmoji?: string
    aboutContent?: PortableTextBlock[]
    socialLinks?: any[]
}

// Default content when Sanity has no data
const defaultContent = {
    aboutTitle: "hi, i'm me!",
    aboutEmoji: "🌸",
    aboutContent: null
}

async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        return await sanityFetch<SiteSettings>(siteSettingsQuery, {}, ['siteSettings'])
    } catch (error) {
        console.error('Failed to fetch site settings:', error)
        return null
    }
}

export default async function AboutPage() {
    const settings = await getSiteSettings()

    return (
        <>
            <DoodleDecorations />
            <Navigation blogName={settings?.blogName} />

            <main className="container container-narrow">
                <AboutContent
                    title={settings?.aboutTitle || defaultContent.aboutTitle}
                    emoji={settings?.aboutEmoji || defaultContent.aboutEmoji}
                    content={settings?.aboutContent}
                />
            </main>

            <Footer socialLinks={settings?.socialLinks} />
        </>
    )
}
