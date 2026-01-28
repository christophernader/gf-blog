'use client'

import { motion } from 'framer-motion'

// Skeleton loading state for blog page
export default function BlogLoading() {
    return (
        <main className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
            {/* Header skeleton */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
                <motion.div
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                        width: '200px',
                        height: '48px',
                        background: 'var(--paper-alt)',
                        borderRadius: 'var(--radius-sketchy)',
                        margin: '0 auto var(--space-md)'
                    }}
                />
                <motion.div
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    style={{
                        width: '300px',
                        height: '24px',
                        background: 'var(--paper-alt)',
                        borderRadius: 'var(--radius-sketchy)',
                        margin: '0 auto'
                    }}
                />
            </div>

            {/* Cards skeleton grid */}
            <div className="posts-grid">
                {[...Array(6)].map((_, i) => (
                    <motion.article
                        key={i}
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="blog-card"
                        style={{ minHeight: '300px' }}
                    >
                        {/* Image placeholder */}
                        <div style={{
                            width: '100%',
                            height: '180px',
                            background: 'var(--paper-alt)',
                            borderRadius: 'var(--radius-sketchy)'
                        }} />

                        {/* Title placeholder */}
                        <div style={{
                            width: '80%',
                            height: '24px',
                            background: 'var(--paper-alt)',
                            borderRadius: 'var(--radius-sketchy)',
                            marginTop: 'var(--space-md)'
                        }} />

                        {/* Excerpt placeholder */}
                        <div style={{
                            width: '100%',
                            height: '16px',
                            background: 'var(--paper-alt)',
                            borderRadius: 'var(--radius-sketchy)',
                            marginTop: 'var(--space-sm)'
                        }} />
                        <div style={{
                            width: '60%',
                            height: '16px',
                            background: 'var(--paper-alt)',
                            borderRadius: 'var(--radius-sketchy)',
                            marginTop: 'var(--space-xs)'
                        }} />
                    </motion.article>
                ))}
            </div>
        </main>
    )
}
