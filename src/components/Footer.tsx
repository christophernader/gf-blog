'use client'

import { motion } from 'framer-motion'

export function Footer() {
    const year = new Date().getFullYear()

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
            </motion.p>
        </motion.footer>
    )
}
