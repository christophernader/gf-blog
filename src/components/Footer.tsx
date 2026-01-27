'use client'

import { motion } from 'framer-motion'

export function Footer() {
    const year = new Date().getFullYear()

    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <p className="footer-text">
                made with ♡ • {year}
            </p>
        </motion.footer>
    )
}
