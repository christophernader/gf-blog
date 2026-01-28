'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, type Variants, type Transition } from 'framer-motion'
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

// Disney-style spring for hover
const hoverTransition: Transition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20
}

// Card entrance animation
const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15,
            mass: 0.8
        }
    }
}

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
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
                y: -8,
                rotate: 0.5,
                transition: hoverTransition
            }}
            whileTap={{ scale: 0.98 }}
        >
            <Link href={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
                <div className="blog-card">
                    {mainImage?.asset && (
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={hoverTransition}
                            style={{ overflow: 'hidden', borderRadius: 'var(--radius-sketchy-alt)' }}
                        >
                            <Image
                                src={urlFor(mainImage).width(600).height(400).url()}
                                alt={title}
                                width={600}
                                height={400}
                                className="blog-card-image"
                                style={{ transition: 'transform 0.3s ease' }}
                            />
                        </motion.div>
                    )}
                    <motion.h3
                        className="blog-card-title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {title}
                    </motion.h3>
                    {excerpt && <p className="blog-card-excerpt">{excerpt}</p>}
                    <div className="blog-card-meta">
                        {publishedAt && <span>{formatDate(publishedAt)}</span>}
                    </div>
                    {categories && categories.length > 0 && (
                        <div style={{ marginTop: '0.5rem' }}>
                            {categories.map((cat, i) => (
                                <motion.span
                                    key={cat}
                                    className={`tag ${pastelColors[i % pastelColors.length]}`}
                                    whileHover={{ scale: 1.1 }}
                                    transition={hoverTransition}
                                >
                                    {cat}
                                </motion.span>
                            ))}
                        </div>
                    )}
                </div>
            </Link>
        </motion.article>
    )
}
