'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, type Transition } from 'framer-motion'

const springTransition: Transition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20
}

// Pastel colors for nav pills
const pillColors = [
    { bg: 'var(--pastel-pink)', border: 'var(--pastel-pink-dark)' },
    { bg: 'var(--pastel-lavender)', border: 'var(--pastel-lavender-dark)' },
    { bg: 'var(--pastel-mint)', border: 'var(--pastel-mint-dark)' },
]

export function Navigation() {
    const pathname = usePathname()

    const navLinks = [
        { href: '/', label: 'home', icon: '🏠' },
        { href: '/blog', label: 'posts', icon: '✏️' },
        { href: '/about', label: 'about', icon: '💭' },
    ]

    return (
        <motion.nav
            className="nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
                delay: 0.1
            }}
        >
            <div className="container nav-container">
                {/* Logo with sketchy border */}
                <motion.div
                    whileHover={{ scale: 1.03, rotate: -1.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={springTransition}
                >
                    <Link href="/" className="nav-logo-box">
                        <span className="nav-logo-flower">✿</span>
                        <span className="nav-logo-text">my little blog</span>
                    </Link>
                </motion.div>

                {/* Nav links as playful pills */}
                <ul className="nav-links">
                    {navLinks.map((link, index) => {
                        const isActive = pathname === link.href ||
                            (link.href === '/blog' && pathname.startsWith('/blog/'))
                        const colors = pillColors[index % pillColors.length]

                        return (
                            <motion.li
                                key={link.href}
                                initial={{ opacity: 0, y: -10, rotate: -5 }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                transition={{
                                    delay: 0.2 + index * 0.08,
                                    type: "spring" as const,
                                    stiffness: 200,
                                    damping: 15
                                }}
                            >
                                <motion.div
                                    whileHover={{ y: -4, rotate: 2, scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={springTransition}
                                >
                                    <Link
                                        href={link.href}
                                        className={`nav-pill ${isActive ? 'nav-pill-active' : ''}`}
                                        style={{
                                            '--pill-bg': colors.bg,
                                            '--pill-border': colors.border,
                                        } as React.CSSProperties}
                                    >
                                        <span className="nav-pill-icon">{link.icon}</span>
                                        <span>{link.label}</span>
                                    </Link>
                                </motion.div>
                            </motion.li>
                        )
                    })}
                </ul>
            </div>

            {/* Decorative squiggle under nav */}
            <div className="nav-squiggle" />
        </motion.nav>
    )
}
