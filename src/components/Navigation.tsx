'use client'

import Link from 'next/link'
import { motion, type Transition } from 'framer-motion'

const springTransition: Transition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20
}

export function Navigation() {
    const navLinks = [
        { href: '/', label: 'home' },
        { href: '/blog', label: 'posts' },
        { href: '/about', label: 'about' },
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
                <motion.div
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    transition={springTransition}
                >
                    <Link href="/" className="nav-logo">
                        ✿ my little blog
                    </Link>
                </motion.div>

                <ul className="nav-links">
                    {navLinks.map((link, index) => (
                        <motion.li
                            key={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.2 + index * 0.1,
                                type: "spring" as const,
                                stiffness: 200,
                                damping: 15
                            }}
                        >
                            <motion.div
                                whileHover={{ y: -2 }}
                                transition={springTransition}
                            >
                                <Link href={link.href} className="nav-link">
                                    {link.label}
                                </Link>
                            </motion.div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    )
}
