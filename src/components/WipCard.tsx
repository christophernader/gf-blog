'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { urlFor } from '../../sanity/lib/client'

interface WipCardProps {
    title: string
    slug: string
    description?: string
    status?: string
    coverImage?: any
    categories?: string[]
    startedAt?: string
    index: number
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    'just-started': { label: '🌱 just started', color: 'var(--ink)', bg: 'var(--pastel-mint)' },
    'in-progress': { label: '🔨 in progress', color: 'var(--ink)', bg: 'var(--pastel-lavender)' },
    'almost-done': { label: '✨ almost done', color: 'var(--ink)', bg: 'var(--pastel-pink)' },
}

export function WipCard({
    title,
    slug,
    description,
    status = 'just-started',
    coverImage,
    categories,
    startedAt,
    index
}: WipCardProps) {
    const statusInfo = statusConfig[status] || statusConfig['just-started']

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
        >
            <Link href={`/wip/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                    className="blog-card"
                    whileHover={{ y: -6, rotate: 0.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {/* Status Badge */}
                    <div style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                        background: statusInfo.bg,
                        border: '2px solid var(--ink-light)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-handwritten)',
                        marginBottom: 'var(--space-sm)',
                    }}>
                        {statusInfo.label}
                    </div>

                    {/* Cover Image */}
                    {coverImage && (
                        <div style={{
                            width: '100%',
                            height: '180px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '2px solid var(--ink-lightest)',
                            marginBottom: 'var(--space-sm)',
                        }}>
                            <img
                                src={urlFor(coverImage).width(400).height(200).url()}
                                alt={coverImage.alt || title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    )}

                    {/* Title */}
                    <h3 style={{
                        fontSize: '1.3rem',
                        marginBottom: 'var(--space-xs)',
                        lineHeight: 1.3,
                    }}>
                        {title}
                    </h3>

                    {/* Description */}
                    {description && (
                        <p style={{
                            color: 'var(--ink-light)',
                            fontSize: '0.95rem',
                            lineHeight: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}>
                            {description}
                        </p>
                    )}

                    {/* Tags */}
                    {categories && categories.length > 0 && (
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.4rem',
                            marginTop: 'var(--space-sm)',
                        }}>
                            {categories.map((cat) => (
                                <span
                                    key={cat}
                                    style={{
                                        fontSize: '0.75rem',
                                        padding: '0.15rem 0.5rem',
                                        borderRadius: '4px',
                                        background: 'var(--paper-dark)',
                                        color: 'var(--ink-light)',
                                    }}
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Started date */}
                    {startedAt && (
                        <p style={{
                            fontSize: '0.8rem',
                            color: 'var(--ink-lighter)',
                            marginTop: 'var(--space-sm)',
                            fontFamily: 'var(--font-handwritten)',
                        }}>
                            started {new Date(startedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    )}
                </motion.div>
            </Link>
        </motion.article>
    )
}
