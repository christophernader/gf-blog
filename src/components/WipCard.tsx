'use client'

import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { urlFor } from '../../sanity/lib/client'

interface WipCardProps {
    title: string
    description?: string
    status?: string
    coverImage?: any
    body?: any[]
    categories?: string[]
    startedAt?: string
    index: number
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    'just-started': { label: '🌱 just started', color: 'var(--ink)', bg: 'var(--pastel-mint)' },
    'in-progress': { label: '🔨 in progress', color: 'var(--ink)', bg: 'var(--pastel-lavender)' },
    'almost-done': { label: '✨ almost done', color: 'var(--ink)', bg: 'var(--pastel-pink)' },
}

// Portable text components for inline body rendering
const portableTextComponents = {
    marks: {
        highlight: ({ children }: { children: React.ReactNode }) => (
            <span className="highlight-pink">{children}</span>
        ),
    },
    block: {
        h2: ({ children }: { children?: React.ReactNode }) => (
            <h3 style={{ marginTop: 'var(--space-lg)', fontSize: '1.2rem' }}>{children}</h3>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h4 style={{ marginTop: 'var(--space-md)', fontSize: '1.1rem' }}>{children}</h4>
        ),
    },
}

export function WipCard({
    title,
    description,
    status = 'just-started',
    coverImage,
    body,
    categories,
    startedAt,
    index
}: WipCardProps) {
    const statusInfo = statusConfig[status] || statusConfig['just-started']

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
            style={{
                background: 'var(--paper)',
                border: '3px solid var(--ink)',
                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                padding: 'var(--space-xl) var(--space-lg)',
                marginBottom: 'var(--space-xl)',
                boxShadow: '6px 6px 0px var(--ink-light)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Top row: status badge + date */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--space-xs)',
                marginBottom: 'var(--space-md)',
            }}>
                <motion.span
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    style={{
                        display: 'inline-block',
                        padding: '0.3rem 0.85rem',
                        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                        background: statusInfo.bg,
                        border: '2px solid var(--ink-light)',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-handwritten)',
                    }}
                >
                    {statusInfo.label}
                </motion.span>

                {startedAt && (
                    <span style={{
                        fontSize: '0.8rem',
                        color: 'var(--ink-lighter)',
                        fontFamily: 'var(--font-handwritten)',
                    }}>
                        started {new Date(startedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                )}
            </div>

            {/* Cover Image */}
            {coverImage && (
                <div style={{
                    width: '100%',
                    height: '220px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid var(--ink-light)',
                    marginBottom: 'var(--space-md)',
                }}>
                    <img
                        src={urlFor(coverImage).width(700).height(300).url()}
                        alt={coverImage.alt || title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        loading="lazy"
                    />
                </div>
            )}

            {/* Title */}
            <h2 style={{
                fontSize: '1.5rem',
                marginBottom: 'var(--space-sm)',
                lineHeight: 1.3,
            }}>
                {title}
            </h2>

            {/* Description */}
            {description && (
                <p style={{
                    color: 'var(--ink-light)',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    marginBottom: 'var(--space-md)',
                }}>
                    {description}
                </p>
            )}

            {/* Body content (PortableText) */}
            {body && body.length > 0 && (
                <div className="post-content" style={{
                    marginTop: 'var(--space-md)',
                    paddingTop: 'var(--space-md)',
                    borderTop: '1px dashed var(--ink-lightest)',
                }}>
                    <PortableText value={body} components={portableTextComponents} />
                </div>
            )}

            {/* Tags */}
            {categories && categories.length > 0 && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginTop: 'var(--space-md)',
                    paddingTop: 'var(--space-sm)',
                    borderTop: body && body.length > 0 ? 'none' : '1px dashed var(--ink-lightest)',
                }}>
                    {categories.map((cat) => (
                        <span
                            key={cat}
                            style={{
                                fontSize: '0.78rem',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                                background: 'var(--paper-dark)',
                                color: 'var(--ink-light)',
                                fontFamily: 'var(--font-handwritten)',
                            }}
                        >
                            {cat}
                        </span>
                    ))}
                </div>
            )}
        </motion.article>
    )
}
