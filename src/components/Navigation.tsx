'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Navigation() {
    return (
        <nav className="nav">
            <div className="container nav-container">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/" className="nav-logo">
                        ✿ my little blog
                    </Link>
                </motion.div>

                <motion.ul
                    className="nav-links"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <li>
                        <Link href="/" className="nav-link">home</Link>
                    </li>
                    <li>
                        <Link href="/blog" className="nav-link">posts</Link>
                    </li>
                    <li>
                        <Link href="/about" className="nav-link">about</Link>
                    </li>
                </motion.ul>
            </div>
        </nav>
    )
}
