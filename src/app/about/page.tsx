'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { DoodleDecorations } from '@/components/DoodleDecorations'

export default function AboutPage() {
    return (
        <>
            <DoodleDecorations />
            <Navigation />

            <main className="container container-narrow">
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
                        🌸
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <span className="highlight-pink">hi, i&apos;m me!</span> ♡
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
                        <p>
                            Welcome to my little corner of the internet! This is where I share my thoughts,
                            adventures, and all the small moments that make life beautiful.
                        </p>

                        <h2 style={{ marginTop: 'var(--space-2xl)' }}>
                            <span className="highlight-mint">a few things about me</span>
                        </h2>

                        <ul style={{ paddingLeft: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
                            <li>☕ I run on coffee and good vibes</li>
                            <li>📚 Always reading something new</li>
                            <li>🌿 Plant mom in training</li>
                            <li>✨ Believer in everyday magic</li>
                            <li>🎨 Creative soul at heart</li>
                        </ul>

                        <h2 style={{ marginTop: 'var(--space-2xl)' }}>
                            <span className="highlight-lavender">why this blog?</span>
                        </h2>

                        <p>
                            I started this space as a way to document my journey, share things I love,
                            and connect with kindred spirits. Whether you&apos;re here for the recipes,
                            the book recs, or just some cozy vibes – I&apos;m so glad you stopped by!
                        </p>

                        <p>
                            Feel free to say hi anytime. I&apos;d love to hear from you! 💌
                        </p>
                    </motion.div>
                </motion.section>
            </main>

            <Footer />
        </>
    )
}
