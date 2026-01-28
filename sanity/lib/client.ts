import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    // Always use CDN for read operations (faster, cached at edge)
    useCdn: true,
    // Add stega for visual editing (only in dev)
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
