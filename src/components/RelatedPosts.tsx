'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, type Transition } from 'framer-motion'
import { urlFor } from '../../sanity/lib/client'

interface RelatedPost {
    _id: string
    title: string
    slug: { current: string }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mainImage?: any
    publishedAt?: string
    categories?: string[]
}

interface RelatedPostsProps {
    posts: RelatedPost[]
}

const springTransition: Transition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (!posts || posts.length === 0) return null

    return (
        <motion.section
            className="related-posts"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
            style={{
                marginTop: 'var(--space-3xl)',
                paddingTop: 'var(--space-2xl)',
                borderTop: '2px dashed var(--ink-lighter)'
            }}
        >
            <h2 style={{
                fontFamily: 'var(--font-handwritten)',
                fontSize: '2rem',
                textAlign: 'center',
                marginBottom: 'var(--space-xl)',
                color: 'var(--ink)'
            }}>
                you might also like ✿
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--space-lg)'
            }}>
                {posts.map((post, index) => (
                    <motion.article
                        key={post._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, ...springTransition }}
                        whileHover={{ y: -5, rotate: 1 }}
                    >
                        <Link
                            href={`/blog/${post.slug.current}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div style={{
                                background: 'var(--paper)',
                                border: '2px solid var(--ink)',
                                borderRadius: 'var(--radius-sketchy-alt)',
                                overflow: 'hidden',
                                transition: 'var(--transition-medium)'
                            }}>
                                {post.mainImage?.asset && (
                                    <div style={{
                                        aspectRatio: '16/10',
                                        overflow: 'hidden'
                                    }}>
                                        <Image
                                            src={urlFor(post.mainImage).width(400).height(250).url()}
                                            alt={post.title}
                                            width={400}
                                            height={250}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                )}
                                <div style={{ padding: 'var(--space-md)' }}>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        color: 'var(--ink)',
                                        marginBottom: 'var(--space-xs)'
                                    }}>
                                        {post.title}
                                    </h3>
                                    {post.categories && post.categories.length > 0 && (
                                        <span style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--ink-light)',
                                            fontFamily: 'var(--font-handwritten)'
                                        }}>
                                            {post.categories[0]}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    )
}
