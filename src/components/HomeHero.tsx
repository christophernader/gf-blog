'use client'

import { motion, type Variants, type Transition } from 'framer-motion'

interface HomeHeroProps {
    heroTitle?: string
    heroHighlight?: string
    heroSubtitle?: string
    socialLinks?: any[]
}

// Disney-style spring animation config
const springTransition: Transition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 12,
    mass: 0.8
}

// Stagger container
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
}

// Individual item animations
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: springTransition
    }
}

// Default content (fallback if Sanity has no data)
const defaults = {
    heroTitle: 'welcome to my',
    heroHighlight: 'little corner',
    heroSubtitle: 'a cozy space for thoughts, stories, and all the little things that make life beautiful'
}

export function HomeHero({
    heroTitle = defaults.heroTitle,
    heroHighlight = defaults.heroHighlight,
    heroSubtitle = defaults.heroSubtitle,
    socialLinks
}: HomeHeroProps) {
    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
                textAlign: 'center',
                padding: 'var(--space-3xl) 0',
                position: 'relative',
                overflow: 'visible'
            }}
        >
            {/* Floating decorative elements */}
            <motion.span
                animate={{
                    y: [-5, 5, -5],
                    rotate: [-2, 2, -2]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut" as const
                }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '15%',
                    fontSize: '2rem',
                    opacity: 0.6,
                    pointerEvents: 'none'
                }}
            >
                ✿
            </motion.span>

            <motion.span
                animate={{
                    y: [5, -5, 5],
                    rotate: [2, -2, 2]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                    delay: 1
                }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '12%',
                    fontSize: '1.5rem',
                    opacity: 0.5,
                    pointerEvents: 'none'
                }}
            >
                ♡
            </motion.span>

            <motion.span
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut" as const
                }}
                style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '20%',
                    fontSize: '1.2rem',
                    pointerEvents: 'none'
                }}
            >
                ✦
            </motion.span>

            {/* Main title with bouncy entrance */}
            <motion.h1
                variants={itemVariants}
                className="jitter-headline"
                style={{ position: 'relative' }}
            >
                {heroTitle} <span className="highlight-pink">{heroHighlight}</span>{' '}
                <motion.span
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut" as const
                    }}
                    style={{ display: 'inline-block' }}
                >
                    ✿
                </motion.span>
            </motion.h1>

            {/* Full Instagram link below title */}
            {socialLinks && (() => {
                const igLink = socialLinks.find((l: any) => l.platform === 'instagram')
                if (!igLink) return null
                return (
                    <motion.div variants={itemVariants} style={{ marginTop: 'var(--space-sm)' }}>
                        <motion.a
                            href={igLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                fontFamily: 'var(--font-body)',
                                fontSize: '1rem',
                                color: 'var(--ink-light)',
                                textDecoration: 'none',
                                padding: '0.3rem 0.8rem',
                                background: 'var(--pastel-pink)',
                                borderRadius: '20px',
                                border: '1.5px solid var(--pastel-pink-dark)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            {igLink.url}
                        </motion.a>
                    </motion.div>
                )
            })()}

            {/* Subtitle with fade-in */}
            <motion.p
                variants={itemVariants}
                style={{
                    fontSize: '1.25rem',
                    color: 'var(--ink-light)',
                    marginTop: 'var(--space-md)',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    lineHeight: 1.7
                }}
            >
                {heroSubtitle}{' '}
                <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.8,
                        type: "spring" as const,
                        stiffness: 200,
                        damping: 10
                    }}
                    style={{ display: 'inline-block' }}
                >
                    ♡
                </motion.span>
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                style={{
                    marginTop: 'var(--space-2xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                <motion.span
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut" as const
                    }}
                    style={{
                        fontFamily: 'var(--font-handwritten)',
                        fontSize: '1.1rem',
                        color: 'var(--ink-lighter)',
                        opacity: 0.7
                    }}
                >
                    scroll down ↓
                </motion.span>
            </motion.div>
        </motion.section>
    )
}
