'use client'

import { motion } from 'framer-motion'

export function WipHeader() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                textAlign: 'center',
                padding: 'var(--space-3xl) 0 var(--space-xl)',
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
                    background: 'var(--pastel-mint)',
                    margin: '0 auto var(--space-xl)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem'
                }}
            >
                🔨
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <span className="highlight-mint">work in progress</span> ✿
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                    color: 'var(--ink-light)',
                    marginTop: 'var(--space-sm)',
                    fontSize: '1.15rem',
                }}
            >
                things i&apos;m currently working on
            </motion.p>
        </motion.section>
    )
}
