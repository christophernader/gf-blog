'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'
import Link from 'next/link'

// Demo post content
const demoPost = {
    title: 'Welcome to my blog! ✨',
    publishedAt: new Date().toISOString(),
    categories: ['thoughts', 'welcome'],
    body: `
Hello and welcome to my cozy little corner of the internet! 

I'm so happy you're here. This blog is where I'll be sharing all sorts of things – from my daily adventures and favorite finds, to deeper thoughts and creative projects.

## Why start a blog?

I've always loved writing, but more than that, I love the idea of having a space that's truly mine. A place where I can express myself freely, document memories, and maybe even inspire someone along the way.

## What to expect

Here are some things you might find here:

- **Life updates** – The big and small moments that make up my days
- **Favorites** – Books, cafes, products, and places I'm loving
- **Creative projects** – Art, crafts, recipes, and DIY adventures  
- **Thoughts** – Reflections on life, growth, and everything in between
- **Travel** – Exploring new places and sharing the journey

## A little about me

I believe in finding magic in everyday moments. Whether it's the perfect cup of coffee, a beautiful sunset, or a cozy afternoon with a good book – these are the things that make life special.

I hope this blog feels like sitting down with a friend. Come as you are, stay a while, and let's enjoy this journey together.

With love,
xo ♡
  `.trim()
}

export default function BlogPostPage() {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const pastelColors = ['tag-pink', 'tag-lavender', 'tag-mint', 'tag-peach', 'tag-sky', 'tag-cream']

    return (
        <>
            <DoodleDecorations />
            <Navigation />

            <main className="container container-narrow">
                {/* Post Header */}
                <motion.header
                    className="post-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
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

                    <motion.h1
                        className="post-title"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {demoPost.title}
                    </motion.h1>

                    <motion.p
                        className="post-meta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {formatDate(demoPost.publishedAt)}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        style={{ marginTop: 'var(--space-md)' }}
                    >
                        {demoPost.categories.map((cat, i) => (
                            <span
                                key={cat}
                                className={`tag ${pastelColors[i % pastelColors.length]}`}
                            >
                                {cat}
                            </span>
                        ))}
                    </motion.div>
                </motion.header>

                {/* Post Content */}
                <motion.article
                    className="post-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {demoPost.body.split('\n\n').map((paragraph, index) => {
                        if (paragraph.startsWith('## ')) {
                            return (
                                <h2 key={index} style={{ marginTop: 'var(--space-2xl)' }}>
                                    <span className="highlight-peach">{paragraph.replace('## ', '')}</span>
                                </h2>
                            )
                        }
                        if (paragraph.startsWith('- ')) {
                            const items = paragraph.split('\n')
                            return (
                                <ul key={index} style={{
                                    marginBottom: 'var(--space-lg)',
                                    paddingLeft: 'var(--space-lg)'
                                }}>
                                    {items.map((item, i) => (
                                        <li key={i} style={{ marginBottom: 'var(--space-sm)' }}>
                                            {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                        return <p key={index}>{paragraph}</p>
                    })}
                </motion.article>
            </main>

            <Footer />
        </>
    )
}
