import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

if (!projectId) {
    console.error('⚠️ Sanity Project ID is missing from environment variables!')
}

export const client = createClient({
    projectId: projectId || 'missing-id', // Prevent crash on init
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
    stega: {
        enabled: false,
    },
})

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    return builder.image(source)
}

// Helper for fetching with better error handling
export async function sanityFetch<T>(
    query: string,
    params: Record<string, unknown> = {},
    tags: string[] = []
): Promise<T> {
    return client.fetch<T>(query, params, {
        next: {
            revalidate: 60, // Cache for 60 seconds
            tags: tags.length > 0 ? tags : ['sanity'],
        },
    })
}
