'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, type Transition } from 'framer-motion'
import { Interfaces } from 'doodle-icons'
import { ThemeToggle } from './ThemeToggle'

const { Home, Pencil, Heart } = Interfaces

// Custom wrench/gear icon for WIP
const WrenchIcon = ({ width = 18, height = 18 }: { width?: number; height?: number }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
)

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
    { bg: 'var(--pastel-yellow, #fff3cd)', border: 'var(--pastel-yellow-dark, #e0c97a)' },
]

interface NavigationProps {
    blogName?: string
}

export function Navigation({ blogName = 'my little blog' }: NavigationProps) {
    const pathname = usePathname()

    const navLinks = [
        { href: '/', label: 'home', icon: Home },
        { href: '/blog', label: 'posts', icon: Pencil },
        { href: '/wip', label: 'wip', icon: WrenchIcon },
        { href: '/about', label: 'about', icon: Heart },
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
                        <span className="nav-logo-text">{blogName}</span>
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
                                        <span className="nav-pill-icon">
                                            <link.icon height={18} width={18} />
                                        </span>
                                        <span>{link.label}</span>
                                    </Link>
                                </motion.div>
                            </motion.li>
                        )
                    })}
                </ul>

                {/* Theme toggle */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
                >
                    <ThemeToggle />
                </motion.div>
            </div>

            {/* Decorative squiggle under nav */}
            <div className="nav-squiggle" />
        </motion.nav>
    )
}
