'use client'

import { motion, type Transition } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { urlFor } from '../../sanity/lib/client'

interface Post {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mainImage?: any
    publishedAt?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any[]
    categories?: string[]
}

const pastelColors = ['tag-pink', 'tag-lavender', 'tag-mint', 'tag-peach', 'tag-sky', 'tag-cream']

const springTransition: Transition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 15
}

const portableTextComponents: PortableTextComponents = {
    types: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image: ({ value }: { value: any }) => (
            <figure style={{ margin: 'var(--space-xl) 0' }}>
                <Image
                    src={urlFor(value).width(800).url()}
                    alt={value.alt || 'Blog image'}
                    width={800}
                    height={500}
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '15px 255px 15px 255px / 225px 15px 225px 15px',
                    }}
                />
                {value.caption && (
                    <figcaption style={{
                        textAlign: 'center',
                        fontFamily: 'var(--font-handwritten)',
                        fontSize: '1.1rem',
                        color: 'var(--ink-light)',
                        marginTop: 'var(--space-sm)',
                        fontStyle: 'italic'
                    }}>
                        {value.caption}
                    </figcaption>
                )}
            </figure>
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        code: ({ value }: { value: any }) => (
            <div style={{ margin: 'var(--space-lg) 0', position: 'relative' }}>
                {value.filename && (
                    <div style={{
                        background: 'var(--ink)',
                        color: 'var(--paper)',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px 20px 0 0',
                        fontFamily: "'SF Mono', 'Fira Code', monospace",
                        fontSize: '0.85rem',
                        display: 'inline-block'
                    }}>
                        {value.filename}
                    </div>
                )}
                <pre style={{
                    background: 'var(--paper-dark)',
                    border: '2px solid var(--ink)',
                    borderRadius: value.filename ? '0 8px 20px 8px' : '8px 20px 8px 20px',
                    padding: 'var(--space-lg)',
                    overflowX: 'auto',
                    margin: 0
                }}>
                    <code style={{
                        fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                        fontSize: '0.875rem',
                        lineHeight: 1.6
                    }}>
                        {value.code}
                    </code>
                </pre>
            </div>
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pullQuote: ({ value }: { value: any }) => {
            const style = value.style || 'fancy'

            if (style === 'card') {
                return (
                    <div style={{
                        background: 'var(--pastel-cream)',
                        border: '2px dashed var(--pastel-peach-dark)',
                        borderRadius: 'var(--radius-sketchy-alt)',
                        padding: 'var(--space-xl)',
                        margin: 'var(--space-2xl) 0',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.4rem',
                            color: 'var(--ink)',
                            margin: 0
                        }}>"{value.text}"</p>
                    </div>
                )
            }

            if (style === 'minimal') {
                return (
                    <div style={{
                        borderLeft: '4px solid var(--tag-sky)',
                        paddingLeft: 'var(--space-lg)',
                        margin: 'var(--space-xl) 0',
                    }}>
                        <p style={{
                            fontSize: '1.25rem',
                            fontStyle: 'italic',
                            color: 'var(--ink-light)',
                            margin: 0
                        }}>
                            {value.text}
                        </p>
                    </div>
                )
            }

            // Default: Fancy Centered
            return (
                <div style={{
                    textAlign: 'center',
                    margin: 'var(--space-3xl) 0',
                    position: 'relative',
                    padding: 'var(--space-xl)'
                }}>
                    <span style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '3rem',
                        color: 'var(--pastel-lavender-dark)',
                        opacity: 0.3,
                        fontFamily: 'var(--font-handwritten)'
                    }}>"</span>
                    <p style={{
                        fontFamily: 'var(--font-handwritten)',
                        fontSize: '1.8rem',
                        color: 'var(--ink)',
                        lineHeight: 1.4,
                        margin: 0
                    }}>
                        {value.text}
                    </p>
                    <span style={{
                        display: 'block',
                        marginTop: '1rem',
                        color: 'var(--pastel-pink-dark)',
                        fontSize: '1.5rem'
                    }}>~</span>
                </div>
            )
        },
    },
    marks: {
        highlight: ({ children }) => (
            <span className="highlight-peach">{children}</span>
        ),
        code: ({ children }) => (
            <code style={{
                background: 'var(--pastel-cream)',
                padding: '0.15em 0.4em',
                borderRadius: '4px',
                border: '1px solid var(--pastel-cream-dark)',
                fontFamily: "'SF Mono', 'Fira Code', monospace",
                fontSize: '0.9em'
            }}>
                {children}
            </code>
        ),
    },
}

export function PostContent({ post }: { post: Post }) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <>
            <motion.header
                className="post-header"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={springTransition}
            >
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, ...springTransition }}
                >
                    <Link
                        href="/blog"
                        style={{
                            fontFamily: 'var(--font-handwritten)',
                            fontSize: '1.1rem',
                            color: 'var(--ink-light)',
                            display: 'inline-block',
                            marginBottom: 'var(--space-lg)'
                        }}
                    >
                        ← back to posts
                    </Link>
                </motion.div>

                <motion.h1
                    className="post-title"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.2,
                        type: "spring" as const,
                        stiffness: 100,
                        damping: 12
                    }}
                >
                    {post.title}
                </motion.h1>

                <motion.p
                    className="post-meta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    {formatDate(post.publishedAt)}
                </motion.p>

                {post.categories && post.categories.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        style={{ marginTop: 'var(--space-md)' }}
                    >
                        {post.categories.map((cat, i) => (
                            <span
                                key={cat}
                                className={`tag ${pastelColors[i % pastelColors.length]}`}
                            >
                                {cat}
                            </span>
                        ))}
                    </motion.div>
                )}
            </motion.header>

            {post.mainImage?.asset && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, ...springTransition }}
                >
                    <Image
                        src={urlFor(post.mainImage).width(1200).height(600).url()}
                        alt={post.title}
                        width={1200}
                        height={600}
                        className="post-featured-image"
                    />
                </motion.div>
            )}

            <motion.article
                className="post-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, ...springTransition }}
            >
                {post.body && (
                    <PortableText value={post.body} components={portableTextComponents} />
                )}
            </motion.article>
        </>
    )
}
