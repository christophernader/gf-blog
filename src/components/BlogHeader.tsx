'use client'

import { motion } from 'framer-motion'

interface BlogHeaderProps {
    title?: string
    subtitle?: string
}

export function BlogHeader({
    title = 'all my posts',
    subtitle
}: BlogHeaderProps) {
    const isDefaultTitle = title === 'all my posts';

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
                {isDefaultTitle ? (
                    <>all <span className="highlight-mint">my posts</span> ✎</>
                ) : (
                    <>{title} ✎</>
                )}
            </motion.h1>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        color: 'var(--ink-light)',
                        marginTop: 'var(--space-sm)',
                        fontSize: '1.2rem'
                    }}
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.section>
    )
}
