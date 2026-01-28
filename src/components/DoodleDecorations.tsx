'use client'

import { motion } from 'framer-motion'

// Fun floating doodle decorations for visual interest
const doodles = [
    { emoji: '✿', top: '10%', left: '5%', delay: 0, size: '2rem' },
    { emoji: '⭐', top: '20%', right: '8%', delay: 0.5, size: '1.5rem' },
    { emoji: '♡', top: '60%', left: '3%', delay: 1, size: '1.8rem' },
    { emoji: '✧', top: '75%', right: '5%', delay: 1.5, size: '1.3rem' },
    { emoji: '☁️', top: '40%', right: '3%', delay: 0.8, size: '2rem' },
]

export function DoodleDecorations() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 1,
                overflow: 'hidden'
            }}
            aria-hidden="true"
        >
            {doodles.map((doodle, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 0.4,
                        scale: 1,
                        y: [0, -10, 0, 10, 0]
                    }}
                    transition={{
                        opacity: { delay: doodle.delay, duration: 0.5 },
                        scale: { delay: doodle.delay, duration: 0.5, type: 'spring' },
                        y: {
                            delay: doodle.delay + 0.5,
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }
                    }}
                    style={{
                        position: 'absolute',
                        top: doodle.top,
                        left: doodle.left,
                        right: doodle.right,
                        fontSize: doodle.size,
                        filter: 'url(#jitter-filter)'
                    }}
                >
                    {doodle.emoji}
                </motion.span>
            ))}
        </div>
    )
}
