'use client'

import { motion } from 'framer-motion'

export function BlogHeader() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                textAlign: 'center',
                padding: 'var(--space-2xl) 0',
            }}
        >
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                all <span className="highlight-mint">my posts</span> ✎
            </motion.h1>
        </motion.section>
    )
}
