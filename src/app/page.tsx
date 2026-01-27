'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'
import { BlogCard } from '@/components/BlogCard'

// Demo posts for initial display (will be replaced by Sanity data)
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
]

export default function HomePage() {
  return (
    <>
      <DoodleDecorations />
      <Navigation />

      <main className="container">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            padding: 'var(--space-3xl) 0',
            position: 'relative'
          }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            welcome to my <span className="highlight-pink">little corner</span> ✿
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              fontSize: '1.25rem',
              color: 'var(--ink-light)',
              marginTop: 'var(--space-lg)',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            a cozy space for thoughts, stories, and all the little things that make life beautiful ♡
          </motion.p>
        </motion.section>

        {/* Recent Posts */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginBottom: 'var(--space-lg)' }}
          >
            <span className="highlight-lavender">recent posts</span> ✎
          </motion.h2>

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
        </section>
      </main>

      <Footer />
    </>
  )
}
