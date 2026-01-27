'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'
import { BlogCard } from '@/components/BlogCard'

// Demo posts (will be replaced by Sanity data)
const demoPosts = [
    {
        _id: '1',
        title: 'Welcome to my blog! ✨',
        slug: { current: 'welcome' },
        excerpt: 'Hello there! This is where I\'ll share my thoughts, adventures, and little moments that make life special.',
        publishedAt: new Date().toISOString(),
        categories: ['thoughts', 'welcome'],
    },
    {
        _id: '2',
        title: 'My favorite coffee spots ☕',
        slug: { current: 'coffee-spots' },
        excerpt: 'Let me take you on a tour of the coziest cafes I\'ve discovered this year...',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        categories: ['lifestyle', 'food'],
    },
    {
        _id: '3',
        title: 'Spring adventures 🌸',
        slug: { current: 'spring-adventures' },
        excerpt: 'The flowers are blooming and I couldn\'t be happier! Here\'s what I\'ve been up to...',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        categories: ['travel', 'nature'],
    },
    {
        _id: '4',
        title: 'Cozy reading nook 📚',
        slug: { current: 'reading-nook' },
        excerpt: 'Finally created my dream reading corner at home! Here\'s how it turned out...',
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        categories: ['home', 'books'],
    },
    {
        _id: '5',
        title: 'Sunday baking session 🧁',
        slug: { current: 'sunday-baking' },
        excerpt: 'Spent the afternoon making the fluffiest cupcakes ever! Recipe inside...',
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        categories: ['food', 'recipes'],
    },
    {
        _id: '6',
        title: 'Finding joy in little things 🌿',
        slug: { current: 'little-things' },
        excerpt: 'A reminder to slow down and appreciate the small moments...',
        publishedAt: new Date(Date.now() - 432000000).toISOString(),
        categories: ['thoughts', 'mindfulness'],
    },
]

export default function BlogPage() {
    return (
        <>
            <DoodleDecorations />
            <Navigation />

            <main className="container">
                {/* Header */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        textAlign: 'center',
                        padding: 'var(--space-2xl) 0',
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        all <span className="highlight-mint">my posts</span> ✎
                    </motion.h1>
                </motion.section>

                {/* Posts Grid */}
                <div className="posts-grid">
                    {demoPosts.map((post, index) => (
                        <BlogCard
                            key={post._id}
                            title={post.title}
                            slug={post.slug.current}
                            excerpt={post.excerpt}
                            publishedAt={post.publishedAt}
                            categories={post.categories}
                            index={index}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </>
    )
}
