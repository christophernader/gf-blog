'use client'

import { motion } from 'framer-motion'

interface SocialLink {
    _key: string
    platform: string
    url: string
}

interface FooterProps {
    socialLinks?: SocialLink[]
}

export function Footer({ socialLinks }: FooterProps) {
    const year = new Date().getFullYear()
    const instagramLink = socialLinks?.find(l => l.platform === 'instagram')

    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
                delay: 0.2
            }}
        >
            <motion.p
                className="footer-text"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
            >
                made with{' '}
                <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut" as const
                    }}
                    style={{ display: 'inline-block' }}
                >
                    ♡
                </motion.span>
                {' '}• {year}
                {instagramLink && (
                    <>
                        {' '}•{' '}
                        <motion.a
                            href={instagramLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                color: 'var(--ink)',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-handwritten)',
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            instagram
                        </motion.a>
                    </>
                )}
            </motion.p>
        </motion.footer>
    )
}
