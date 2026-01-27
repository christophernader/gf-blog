'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '../../sanity/lib/client'

interface BlogCardProps {
    title: string
    slug: string
    excerpt?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mainImage?: any
    publishedAt?: string
    categories?: string[]
    index?: number
}

const pastelColors = [
    'tag-pink',
    'tag-lavender',
    'tag-mint',
    'tag-peach',
    'tag-sky',
    'tag-cream',
]

export function BlogCard({
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    categories,
    index = 0
}: BlogCardProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
        >
            <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
                <div className="blog-card">
                    {mainImage && (
                        <Image
                            src={urlFor(mainImage).width(600).height(400).url()}
                            alt={title}
                            width={600}
                            height={400}
                            className="blog-card-image"
                        />
                    )}
                    <h3 className="blog-card-title">{title}</h3>
                    {excerpt && <p className="blog-card-excerpt">{excerpt}</p>}
                    <div className="blog-card-meta">
                        {publishedAt && <span>{formatDate(publishedAt)}</span>}
                    </div>
                    {categories && categories.length > 0 && (
                        <div style={{ marginTop: '0.5rem' }}>
                            {categories.map((cat, i) => (
                                <span
                                    key={cat}
                                    className={`tag ${pastelColors[i % pastelColors.length]}`}
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </Link>
        </motion.article>
    )
}
