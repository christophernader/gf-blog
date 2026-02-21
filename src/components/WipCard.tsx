'use client'

import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { urlFor } from '../../sanity/lib/client'

interface WipCardProps {
    title: string
    description?: string
    genre?: string
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
            <h3 style={{ marginTop: 'var(--space-xl)', fontSize: '1.4rem' }}>{children}</h3>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h4 style={{ marginTop: 'var(--space-lg)', fontSize: '1.2rem' }}>{children}</h4>
        ),
        normal: ({ children }: { children?: React.ReactNode }) => (
            <p style={{ lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>{children}</p>
        ),
    },
    list: {
        bullet: ({ children }: { children?: React.ReactNode }) => (
            <ul style={{ paddingLeft: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>{children}</ul>
        ),
    },
}

export function WipCard({
    title,
    description,
    genre,
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
                duration: 0.6
            }}
            style={{
                marginBottom: 'var(--space-3xl)',
                position: 'relative',
            }}
        >
            {/* Header Section: Title & Meta */}
            <header style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '2.2rem',
                    marginBottom: 'var(--space-sm)',
                    lineHeight: 1.2,
                }}>
                    <span className="highlight-mint">{title}</span>
                </h2>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-md)',
                    color: 'var(--ink-light)',
                    fontFamily: 'var(--font-handwritten)',
                    fontSize: '1rem',
                }}>
                    <span style={{
                        background: statusInfo.bg,
                        padding: '0.1rem 0.6rem',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        color: 'var(--ink)',
                        border: '1px solid var(--ink-lightest)'
                    }}>
                        {statusInfo.label}
                    </span>
                    {genre && (
                        <span style={{
                            background: 'var(--pastel-peach)',
                            padding: '0.1rem 0.6rem',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            color: 'var(--ink)',
                            border: '1px solid var(--ink-lightest)'
                        }}>
                            {genre}
                        </span>
                    )}
                    {startedAt && (
                        <span>
                            • started {new Date(startedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric'
                            })} •
                        </span>
                    )}
                </div>
            </header>

            {/* Cover Image */}
            {coverImage && (
                <div style={{
                    width: '100%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid var(--ink)',
                    marginBottom: 'var(--space-xl)',
                    boxShadow: '4px 4px 0px var(--pastel-lavender)'
                }}>
                    <img
                        src={urlFor(coverImage).width(800).height(450).url()}
                        alt={coverImage.alt || title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                        }}
                        loading="lazy"
                    />
                </div>
            )}

            {/* Description (Intro) */}
            {description && (
                <p style={{
                    fontSize: '1.15rem',
                    lineHeight: 1.6,
                    marginBottom: 'var(--space-lg)',
                    fontStyle: 'italic',
                    color: 'var(--ink-light)',
                    borderLeft: '3px solid var(--pastel-pink)',
                    paddingLeft: 'var(--space-md)',
                }}>
                    {description}
                </p>
            )}

            {/* Main Body Content */}
            {body && body.length > 0 && (
                <div className="post-content">
                    <PortableText value={body} components={portableTextComponents} />
                </div>
            )}

            {/* Footer: Tags */}
            {categories && categories.length > 0 && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginTop: 'var(--space-xl)',
                    justifyContent: 'center'
                }}>
                    {categories.map((cat) => (
                        <span
                            key={cat}
                            style={{
                                fontSize: '0.85rem',
                                padding: '0.2rem 0.8rem',
                                borderRadius: '20px',
                                background: 'var(--paper-dark)',
                                color: 'var(--ink-light)',
                                fontFamily: 'var(--font-handwritten)',
                            }}
                        >
                            #{cat}
                        </span>
                    ))}
                </div>
            )}

            {/* Separator (Wavy Line) */}
            <div style={{
                marginTop: 'var(--space-3xl)',
                display: 'flex',
                justifyContent: 'center',
                opacity: 0.3
            }}>
                <svg width="100" height="15" viewBox="0 0 100 15" fill="none" stroke="currentColor">
                    <path d="M0 7.5c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 5-2.5 7.5 0 5 2.5 7.5 0 5-2.5 7.5 0 5 2.5 7.5 0 5-2.5 7.5 0 5 2.5 7.5 0 5-2.5 7.5 0 5 2.5 7.5 0 5-2.5 7.5 0 5 2.5 7.5 0 5-2.5 7.5 0 5 2.5 7.5 0 5-2.5 7.5 0 5 2.5 7.5 0 5-2.5 7.5 0" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
        </motion.article>
    )
}
