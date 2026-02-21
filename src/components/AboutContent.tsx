'use client'

import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

interface AboutContentProps {
    title: string
    emoji: string
    content?: PortableTextBlock[] | null
    bio?: PortableTextBlock[] | null
    credentials?: PortableTextBlock[] | null
    background?: PortableTextBlock[] | null
}

// Custom components for Portable Text rendering
const portableTextComponents = {
    marks: {
        highlightPink: ({ children }: { children: React.ReactNode }) => (
            <span className="highlight-pink">{children}</span>
        ),
        highlightMint: ({ children }: { children: React.ReactNode }) => (
            <span className="highlight-mint">{children}</span>
        ),
        highlightLavender: ({ children }: { children: React.ReactNode }) => (
            <span className="highlight-lavender">{children}</span>
        ),
    },
    block: {
        h2: ({ children }: { children?: React.ReactNode }) => (
            <h2 style={{ marginTop: 'var(--space-2xl)' }}>{children}</h2>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h3 style={{ marginTop: 'var(--space-xl)' }}>{children}</h3>
        ),
    },
}

const hasContent = (blocks?: PortableTextBlock[] | null) =>
    blocks && blocks.length > 0

// Placeholder components for when Sanity has no data
const PlaceholderIntro = () => (
    <>
        <p style={{ color: 'var(--ink-light)', fontStyle: 'italic' }}>
            [Go to <a href="/studio" style={{ textDecoration: 'underline' }}>/studio</a> &rarr; Site Settings &rarr; <strong>About Page Content (Intro)</strong> to write your opening paragraph.]
        </p>
        <p style={{ color: 'var(--ink-lighter)', fontSize: '0.95rem' }}>
            This is your welcome message. Introduce yourself and set the tone for your platform. What draws readers to your corner of the internet?
        </p>
    </>
)

const PlaceholderBio = () => (
    <>
        <p style={{ color: 'var(--ink-light)', fontStyle: 'italic' }}>
            [Go to <a href="/studio" style={{ textDecoration: 'underline' }}>/studio</a> &rarr; Site Settings &rarr; <strong>Author Biography</strong> to write your bio.]
        </p>
        <p style={{ color: 'var(--ink-lighter)', fontSize: '0.95rem' }}>
            Write about who you are as a writer. Mention your genre (fiction, romance, fantasy, etc.) and the themes you explore in your work. This section reflects your stated author brand.
        </p>
    </>
)

const PlaceholderCredentials = () => (
    <>
        <p style={{ color: 'var(--ink-light)', fontStyle: 'italic' }}>
            [Go to <a href="/studio" style={{ textDecoration: 'underline' }}>/studio</a> &rarr; Site Settings &rarr; <strong>Professional Credentials</strong> to add your credentials.]
        </p>
        <p style={{ color: 'var(--ink-lighter)', fontSize: '0.95rem' }}>
            Share your writing experience and expertise. Include degrees, workshops, publications, or future goals such as &ldquo;currently pursuing a B.A. in English&rdquo; or &ldquo;plans to submit writing to literary journals.&rdquo;
        </p>
    </>
)

const PlaceholderBackground = () => (
    <>
        <p style={{ color: 'var(--ink-light)', fontStyle: 'italic' }}>
            [Go to <a href="/studio" style={{ textDecoration: 'underline' }}>/studio</a> &rarr; Site Settings &rarr; <strong>Personal Background</strong> to share your story.]
        </p>
        <p style={{ color: 'var(--ink-lighter)', fontSize: '0.95rem' }}>
            Reflect on personal experiences, interests, and expertise that are relevant to your writing, your genre, and your audience&apos;s interests.
        </p>
    </>
)

export function AboutContent({ title, emoji, content, bio, credentials, background }: AboutContentProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                textAlign: 'center',
                padding: 'var(--space-3xl) 0',
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                    border: '3px solid var(--ink)',
                    background: 'var(--pastel-lavender)',
                    margin: '0 auto var(--space-xl)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem'
                }}
            >
                {emoji}
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <span className="highlight-pink">{title}</span> ♡
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="post-content"
                style={{
                    textAlign: 'left',
                    marginTop: 'var(--space-2xl)'
                }}
            >
                {/* Intro Section */}
                {hasContent(content) ? (
                    <PortableText value={content!} components={portableTextComponents} />
                ) : (
                    <PlaceholderIntro />
                )}

                {/* Author Biography - Rubric I.D: Stated Brand */}
                <h2 style={{ marginTop: 'var(--space-2xl)' }}>
                    <span className="highlight-mint">about the author</span>
                </h2>
                {hasContent(bio) ? (
                    <PortableText value={bio!} components={portableTextComponents} />
                ) : (
                    <PlaceholderBio />
                )}

                {/* Professional Credentials - Rubric I.E */}
                <h2 style={{ marginTop: 'var(--space-2xl)' }}>
                    <span className="highlight-lavender">credentials &amp; experience</span>
                </h2>
                {hasContent(credentials) ? (
                    <PortableText value={credentials!} components={portableTextComponents} />
                ) : (
                    <PlaceholderCredentials />
                )}

                {/* Personal Background - Rubric I.F */}
                <h2 style={{ marginTop: 'var(--space-2xl)' }}>
                    <span className="highlight-pink">personal background</span>
                </h2>
                {hasContent(background) ? (
                    <PortableText value={background!} components={portableTextComponents} />
                ) : (
                    <PlaceholderBackground />
                )}
            </motion.div>
        </motion.section>
    )
}
